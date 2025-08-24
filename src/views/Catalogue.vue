<template>
  <v-app>
    <!-- AppBar -->
    <v-app-bar color="primary" dark flat>
      <v-toolbar-title class="d-flex align-center">
        <font-awesome-icon icon="wrench" class="me-2" />
        Catalogue
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        class="ma-2"
        color="white"
        @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
      >
        <font-awesome-icon :icon="viewMode === 'grid' ? ['fas', 'list'] : ['fas', 'th']" />
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
       

        <!-- Grid View -->
        <template v-if="viewMode === 'grid'">
          <v-row justify="center" align="start" class="pa-4">
            <v-col
              v-for="tool in tools"
              :key="tool.src"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="d-flex justify-center mb-4"
            >
              <v-card
                elevation="2"
                rounded="xl"
                class="pa-2 hover-card"
                style="max-width: 300px; width: 100%; cursor: pointer"
                @click="openDialog(tool)"
              >
                <!-- Poster + Tool Info -->
                <ToolCard
                  :tool="tool"
                  :showMeasurements="showMeasurements.active[tool.src]"
                  :large="false"
                  :showTitle="false"
                />
                <!-- Toggle Measurements -->
                <v-card-actions class="justify-end">
                  <v-btn
                    variant="tonal"
                    size="small"
                    color="primary"
                    class="mt-2"
                    @click.stop="toggleSingleMeasurement(tool.src)"
                    style="font-weight: 500"
                  >
                    <font-awesome-icon
                      :icon="showMeasurements.active[tool.src] ? ['fas', 'eye-slash'] : ['fas', 'ruler']"
                      class="me-1"
                    />
                    {{ showMeasurements.active[tool.src] ? 'Hide' : 'Show' }} Measurements
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!-- List View -->
        <template v-else>
          <ToolListView
            :tools="tools"
            :showMeasurements="showMeasurements"
            :openDialog="openDialog"
            :toggleMeasurement="toggleTool"
          />
        </template>
      </v-container>

      <!-- Tool Modal -->
      <v-dialog v-model="selectedToolDialog" max-width="800px" persistent>
        <v-card>
          <v-card-title>
            {{ selectedTool?.name }}
            <v-spacer />
            <v-btn
              variant="tonal"
              color="primary"
              size="small"
              icon
              @click="closeDialog"
              class="hover-checkbox"
            >
              <font-awesome-icon icon="circle-xmark" size="lg" />
            </v-btn>
          </v-card-title>

          <v-card-text>
            <ToolCard
              :tool="selectedTool"
              :showMeasurements="showMeasurements.active[selectedTool?.src]"
              large
            />
            <v-btn
              variant="tonal"
              color="primary"
              size="small"
              @click="toggleSingleMeasurement(selectedTool?.src)"
              class="mt-4"
            >
              <font-awesome-icon
                :icon="showMeasurements.active[selectedTool?.src] ? ['fas', 'eye-slash'] : ['fas', 'ruler']"
                class="me-2"
              />
              {{ showMeasurements.active[selectedTool?.src] ? 'Hide' : 'Show' }} Measurements
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
       <!-- Poster Generator Viewer -->
        <PosterViewer :tools="tools" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ToolCard from '../Components/tool/ToolCard.vue'
import ToolListView from '../Components/tool/ToolListView.vue'
import PosterViewer from '../Components/tool/PosterViewer.vue'

import { toolsData } from '../models/Tool'

// Principal State 
const tools = reactive(toolsData)
const viewMode = ref('grid')
const selectedTool = ref(null)
const selectedToolDialog = ref(false)

//  Measurements State
const showMeasurements = reactive({ active: {} })
tools.forEach(tool => {
  showMeasurements.active[tool.src] = true
})

// Actions
function toggleSingleMeasurement(src) {
  if (src) showMeasurements.active[src] = !showMeasurements.active[src]
}
function openDialog(tool) {
  selectedTool.value = tool
  selectedToolDialog.value = true
}
function closeDialog() {
  selectedToolDialog.value = false
}
</script>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}
.v-card {
  border: none;
  padding: 16px;
}
.v-card-actions {
  padding-top: 8px;
}
.v-dialog .v-card {
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.v-main,
.v-app {
  background: #fff !important;
}
body {
  font-size: 14px;
  color: #333;
}
.v-btn {
  font-size: 0.8rem;
}
.viewer-frame {
  background: #fff !important;
}
</style>
