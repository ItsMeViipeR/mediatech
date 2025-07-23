import { db } from "~~/db/db";
import { accounts, users } from "~~/db/schema";
import { eq, and } from "drizzle-orm";
import type { AppUser } from "~~/types/auth";

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    const session = await setUserSession(event, {
      user: {
        githubId: user.id,
        avatarUrl: user.avatar_url,
        name: user.name,
        login: user.login,
      },
      provider: "github",
    });

    const sessionUser: AppUser = session.user as AppUser;

    const existingAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.provider, "github"),
        eq(accounts.providerAccountId, sessionUser.githubId!.toString())
      ),
      with: {
        user: true,
      },
    });

    if (!existingAccount) {
      const insertedUser = await db
        .insert(users)
        .values({
          email: sessionUser.email!,
          name: sessionUser.login,
          avatarUrl: sessionUser.avatarUrl,
        })
        .returning();

      const newUserId = insertedUser[0].id;

      await db.insert(accounts).values({
        provider: "github",
        providerAccountId: sessionUser.githubId!.toString(),
        userId: newUserId,
      });
    }

    return sendRedirect(event, "/");
  },
});
