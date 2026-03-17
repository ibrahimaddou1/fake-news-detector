<template>
  <div class="space-y-6">
    <!-- Verdict -->
    <div class="p-4 rounded-lg" :class="verdictContainerClass">
      <h3 class="text-sm font-bold uppercase tracking-wider" :class="verdictTitleClass">Verdict</h3>
      <p class="text-2xl font-bold" :class="verdictTextClass">{{ result.verdict }}</p>
    </div>

    <!-- Justification -->
    <div class="bg-white p-5 rounded-lg border border-gray-200">
      <h3 class="font-bold text-gray-800 mb-2">Justification</h3>
      <p class="text-gray-600 leading-relaxed">{{ result.justification }}</p>
    </div>

    <!-- Score & Sensationnalisme -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-5 rounded-lg border border-gray-200">
        <h4 class="font-bold text-gray-800 mb-2">Indice de Confiance</h4>
        <p class="text-3xl font-bold text-emerald-600">{{ result.confidence_score }}%</p>
      </div>
      <div class="bg-white p-5 rounded-lg border border-gray-200">
        <h4 class="font-bold text-gray-800 mb-2">Analyse du Ton</h4>
        <p class="text-sm text-gray-600">{{ result.sensationnalisme }}</p>
      </div>
    </div>

    <!-- Sources & Limites -->
    <div v-if="result.sources && result.sources.length > 0" class="bg-white p-5 rounded-lg border border-gray-200">
      <h3 class="font-bold text-gray-800 mb-2">Sources identifiées</h3>
      <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
        <li v-for="(source, index) in result.sources" :key="index">{{ source }}</li>
      </ul>
    </div>
    <div class="bg-gray-100 p-5 rounded-lg border border-gray-200">
      <h4 class="font-bold text-gray-800 mb-2">Limites de l'analyse</h4>
      <p class="text-sm text-gray-600">{{ result.limites_analyse }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  result: { type: Object, required: true }
});

const verdictContainerClass = computed(() => {
  switch (props.result.verdict) {
    case 'Fiable': return 'bg-emerald-50 border-l-4 border-emerald-500';
    case 'Douteux': return 'bg-amber-50 border-l-4 border-amber-500';
    case 'Non fiable': return 'bg-red-50 border-l-4 border-red-500';
    default: return 'bg-gray-50 border-l-4 border-gray-500';
  }
});

const verdictTitleClass = computed(() => {
  switch (props.result.verdict) {
    case 'Fiable': return 'text-emerald-700';
    case 'Douteux': return 'text-amber-700';
    case 'Non fiable': return 'text-red-700';
    default: return 'text-gray-700';
  }
});

const verdictTextClass = computed(() => {
  switch (props.result.verdict) {
    case 'Fiable': return 'text-emerald-800';
    case 'Douteux': return 'text-amber-800';
    case 'Non fiable': return 'text-red-800';
    default: return 'text-gray-800';
  }
});
</script>
