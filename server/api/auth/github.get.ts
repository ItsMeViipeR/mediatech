import { PrismaClient } from "~/generated/prisma";
import { AppUser } from "~~/types/auth";

const prisma = new PrismaClient();

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

    const existingAccount = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: sessionUser.githubId!.toString(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!existingAccount) {
      await prisma.user.create({
        data: {
          email: sessionUser.email,
          name: sessionUser.login,
          avatarUrl: sessionUser.avatarUrl,
          account: {
            create: {
              provider: "github",
              providerAccountId: sessionUser.githubId!.toString(),
            },
          },
        },
      });
    }

    return sendRedirect(event, "/");
  },
});
