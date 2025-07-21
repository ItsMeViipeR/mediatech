<template>
  <div
    class="fixed top-0 left-0 w-full z-50 flex flex-row items-center justify-between p-4 bg-(--ui-bg) text-white border-b-2 border-primary"
  >
    <div class="text-lg font-bold">Mediatech</div>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="/" class="hover:underline">Home</a></li>
        <li><a href="/projects" class="hover:underline">Posts</a></li>
        <li><a href="/contact" class="hover:underline">Authors</a></li>
        <li v-if="!loggedIn">
          <a href="/login" class="hover:underline">Login</a>
        </li>
        <UDropdownMenu v-else :items="items" :ui="{ content: 'w-48' }">
          <UAvatar :src="sessionUser?.avatarUrl" />
        </UDropdownMenu>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import type { AppUser } from "~~/types/auth";

const { loggedIn, user } = useUserSession();
const sessionUser = user.value as AppUser;

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
]);
</script>

<style></style>
