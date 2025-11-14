<template>
  <div class="tool-card" :class="{ large }">
    <ModelViewer
      :src="tool.src"
      :alt="tool.name"
      :show-measurements="showMeasurements"
      class="viewer-frame"
    />

    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
  </div>
</template>

<script setup>
import ModelViewer from './ModelViewerTool.vue'

const props = defineProps({
  tool: Object,
  large: Boolean,
  showMeasurements: Boolean
})
</script>

<style scoped>
.tool-card {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(250, 250, 250, 0.899);
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  min-width: 220px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  position: relative;
}

.tool-card.large {
  max-width: 700px;
  width: 100%;
}

@media (max-width: 768px) {
  .tool-card.large {
    width: 95vw;
  }
  .tool-card.large .viewer-frame {
    height: 300px;
  }
}

.viewer-frame {
  width: 100%;
  height: 180px;
  border-radius: 1rem;
  overflow: hidden;
}

.tool-card.large .viewer-frame {
  height: 400px;
}

.tool-card h3 {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.tool-card p {
  font-size: 0.9rem;
  text-align: center;
  color: #666;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
}
</style>
