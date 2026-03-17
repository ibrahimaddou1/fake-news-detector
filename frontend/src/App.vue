<template>
  <div id="app" class="bg-white min-h-screen font-sans text-gray-800">
    <header class="bg-emerald-600 text-white shadow-md">
      <div class="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h1 class="text-2xl font-bold">Analyseur de Fiabilité</h1>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-10">
      <InputForm @analyze="handleAnalysis" />
      
      <Loader v-if="isLoading" class="mt-8" />
      
      <DashboardResults v-if="analysisResult" :result="analysisResult" class="mt-8" />

      <div v-if="error" class="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
        <strong>Erreur :</strong> {{ error }}
      </div>
    </main>
  </div>
</template>

<script setup>
// ... Le script reste le même
import { ref } from 'vue';
import axios from 'axios';
import InputForm from './components/InputForm.vue';
import Loader from './components/Loader.vue';
import DashboardResults from './components/DashboardResults.vue';

const isLoading = ref(false);
const analysisResult = ref(null);
const error = ref('');

const handleAnalysis = async ({ input, isUrl }) => {
  isLoading.value = true;
  analysisResult.value = null;
  error.value = '';

  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/analyze`;
    const response = await axios.post(apiUrl, { input, isUrl });
    analysisResult.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.error || 'Une erreur de communication avec le serveur est survenue.';
  } finally {
    isLoading.value = false;
  }
};
</script>
