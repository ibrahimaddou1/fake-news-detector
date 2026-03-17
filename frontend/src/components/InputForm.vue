<template>
  <div class="bg-white p-6 rounded-lg border border-gray-200">
    <form @submit.prevent="submit">
      <label for="text-input" class="block text-sm font-medium text-gray-600 mb-2">
        Vérifier une URL ou un texte
      </label>
      <textarea
        id="text-input"
        v-model="inputValue"
        placeholder="Collez votre contenu ici..."
        class="w-full p-3 rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 transition h-28"
      ></textarea>
      <div class="mt-4 text-right">
        <button 
          type="submit"
          class="bg-emerald-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          Analyser
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// ... Le script reste le même
import { ref } from 'vue';

const emit = defineEmits(['analyze']);
const inputValue = ref('');

const isUrl = (text) => {
  try {
    const urlPattern = new RegExp('^(https?|ftp)://');
    return urlPattern.test(text);
  } catch (_) {
    return false;
  }
};

const submit = () => {
  if (!inputValue.value.trim()) return;
  emit('analyze', {
    input: inputValue.value,
    isUrl: isUrl(inputValue.value)
  });
};
</script>
