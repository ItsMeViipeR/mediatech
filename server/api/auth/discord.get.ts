export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        discordId: user.id,
        name: user.username,
        login: user.global_name,
        avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      },
      provider: "discord",
    });
    return sendRedirect(event, "/");
  },
});
