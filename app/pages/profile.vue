<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center"
    >
      <div class="mb-6">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 shadow-md"
        />
        <h2 class="text-2xl font-semibold mt-4 text-gray-800 dark:text-white">
          {{ login }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">{{ email }}</p>
      </div>

      <div class="space-y-4">
        <UButton
          class="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          to="/profile/edit"
        >
          Modifier le profil
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { user } = useUserSession();

const { email, login, avatarUrl } = user.value || {};
</script>
