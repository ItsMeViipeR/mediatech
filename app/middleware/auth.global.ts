export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (from.path === "/login" && loggedIn.value) {
    return navigateTo("/");
  } else if (!loggedIn.value && to.path !== "/login" && to.path !== "/") {
    return navigateTo("/login");
  }
});
