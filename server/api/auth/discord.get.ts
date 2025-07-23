import { db } from "~~/db/db";
import { accounts, users } from "~~/db/schema";
import { eq, and } from "drizzle-orm";
import type { AppUser } from "~~/types/auth";

export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user, tokens }) {
    const session = await setUserSession(event, {
      user: {
        discordId: user.id,
        name: user.username,
        login: user.global_name,
        avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      },
      provider: "discord",
    });

    const sessionUser: AppUser = session.user as AppUser;

    const existingAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.provider, "discord"),
        eq(accounts.providerAccountId, sessionUser.discordId!.toString())
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
        provider: "discord",
        providerAccountId: sessionUser.discordId!.toString(),
        userId: newUserId,
      });
    }

    return sendRedirect(event, "/");
  },
});
