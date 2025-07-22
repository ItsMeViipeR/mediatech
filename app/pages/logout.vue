<script setup lang="ts">
const { clear } = useUserSession();
await clear();

const returnToHome = () => {
  const router = useRouter();
  router.replace("/");
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Vous êtes déconnecté</h1>
      <p class="mb-4">Merci d'avoir utilisé notre service.</p>
      <button
        @click="returnToHome"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>
