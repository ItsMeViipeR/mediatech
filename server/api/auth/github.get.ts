export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
        avatarUrl: user.avatar_url,
        name: user.name,
        login: user.login,
      },
      provider: "github",
    });
    return sendRedirect(event, "/");
  },
});
