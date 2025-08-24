<template>
  <v-app>
  <v-main>
  <v-container fluid class="pa-4">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="mx-auto" style="width: 100%">
          <v-list lines="two" density="comfortable" style="width: 100%">
            <v-list-subheader>Tools</v-list-subheader>

            <v-list-item
              v-for="tool in tools"
              :key="tool.src"
              @click="openDialog(tool)"
              class="tool-list-item"
            >
              <!-- Image of poster -->
              <template #prepend>
                <div class="futuristic-avatar">
                  <v-avatar
                    v-if="tool.poster"
                    size="96"
                    class="me-3"
                    rounded="0"
                  >
                    <v-img :src="tool.poster" alt="Poster" cover />
                  </v-avatar>
                  <v-avatar v-else color="blue-grey-lighten-4" size="96">
                    <v-icon color="primary">mdi-cube</v-icon>
                  </v-avatar>
                </div>
              </template>

              <!-- Title and Description -->
              <template #title>
                <v-list-item-title class="text-h6">{{ tool.name }}</v-list-item-title>
              </template>
              <template #subtitle>
                <v-list-item-subtitle class="text-body-2 text-grey-darken-1">
                  {{ tool.description || 'No description available' }}
                </v-list-item-subtitle>
              </template>

              <!-- Download Button -->
              <template #append>
                <v-tooltip text="Download Poster">
                  <template #activator="{ props }">
                    <v-btn
                      size="small"
                      icon
                      variant="tonal"
                      color="primary"
                      v-bind="props"
                      @click.stop="downloadPoster(tool)"
                    >
                      <font-awesome-icon :icon="['fas', 'download']" />
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
  </v-app>
</template>


<script setup>
defineProps({
  tools: Array,
  showMeasurements: Object,
  openDialog: Function,
  toggleMeasurement: Function,
})

function downloadPoster(tool) {
  const link = document.createElement('a')
  link.href = tool.poster
  link.download = `${tool.name}_poster.jpg`
  link.click()
}
</script>

<style scoped>
.v-avatar img {
  object-fit: cover;
}

.futuristic-avatar {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(200, 200, 200, 0.15);
  box-shadow: 0 0 6px rgba(0, 255, 255, 0.1);
  padding: 4px;
}

.tool-list-item {
  min-height: 120px;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #eee;
}

.tool-list-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

@media (max-width: 600px) {
  .v-avatar {
    width: 72px !important;
    height: 72px !important;
  }
  .tool-list-item {
    min-height: 100px;
  }
}
</style>


