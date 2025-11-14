<!-- src/components/PosterViewer.vue -->
<template>
  <div class="text-center my-6">
    <v-btn
      :loading="isGeneratingPosters"
      @click="generatePosters"
      color="primary"
      class="mt-4"
    >
      Generate & Download Posters
    </v-btn>

    <model-viewer
      ref="viewer"
      id="poster-viewer"
      camera-controls
      style="width: 100%; height: 300px"
    />

    <v-snackbar
      v-model="showSnackbar"
      timeout="4000"
      color="success"
      location="top"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import '@google/model-viewer'
import { usePosterGenerator } from '../../composables/usePosterGenerator'

const props = defineProps({
  tools: {
    type: Array,
    required: true
  }
})

const viewer = ref(null)
const {
  generatePosters,
  isGeneratingPosters,
  showSnackbar,
  snackbarText,
  generatedPosters
} = usePosterGenerator(props.tools, viewer)

onMounted(() => {
  const savedPosters = localStorage.getItem('generatedPosters')
  if (savedPosters) {
    generatedPosters.value = JSON.parse(savedPosters)
  }
})

watchEffect(() => {
  if (generatedPosters.value.length === props.tools.length) {
    props.tools.forEach((tool, i) => {
      props.tools.splice(i, 1, { ...tool, poster: generatedPosters.value[i] })
    })
    localStorage.setItem('generatedPosters', JSON.stringify(generatedPosters.value))
  }
})
</script>
