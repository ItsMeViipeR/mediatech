import type { AppUser } from "~~/types/auth";
import { prisma } from "~~/server/lib/prisma";

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
    //const sessionUser: AppUser = session.user as AppUser;

    return sendRedirect(event, "/");
  },
});
