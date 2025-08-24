<template>
  <model-viewer
    ref="modelViewer"
    :src="src"
    camera-orbit="0deg 75deg 10m"
    camera-controls
    shadow-intensity="1"
    class="viewer-frame"
    touch-action="pan-y"
    :alt="alt"
  >
    <button slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
    <button v-show="showMeasurements" slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
    <button slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
    <button v-show="showMeasurements" slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
    <button slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
    <button v-show="showMeasurements" slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
    <button slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
    <button v-show="showMeasurements" slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
    <button slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
    <button v-show="showMeasurements" slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
    <button slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>

    <svg v-show="showMeasurements" id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dimensionLineContainer">
      <line class="dimensionLine" />
      <line class="dimensionLine" />
      <line class="dimensionLine" />
      <line class="dimensionLine" />
      <line class="dimensionLine" />
    </svg>
  </model-viewer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@google/model-viewer'

const props = defineProps({
  src: String,
  alt: String,
  showMeasurements: Boolean
})

const modelViewer = ref(null)

function drawLine(svgLine, dot1, dot2, dimHotspot = null) {
  if (!dot1 || !dot2) return
  svgLine.setAttribute('x1', dot1.canvasPosition.x)
  svgLine.setAttribute('y1', dot1.canvasPosition.y)
  svgLine.setAttribute('x2', dot2.canvasPosition.x)
  svgLine.setAttribute('y2', dot2.canvasPosition.y)
  if (dimHotspot?.facingCamera === false) svgLine.classList.add('hide')
  else svgLine.classList.remove('hide')
}

function renderSVG() {
  const viewer = modelViewer.value
  const dimLines = viewer.querySelectorAll('line')
  drawLine(dimLines[0], viewer.queryHotspot('hotspot-dot+X-Y+Z'), viewer.queryHotspot('hotspot-dot+X-Y-Z'), viewer.queryHotspot('hotspot-dim+X-Y'))
  drawLine(dimLines[1], viewer.queryHotspot('hotspot-dot+X-Y-Z'), viewer.queryHotspot('hotspot-dot+X+Y-Z'), viewer.queryHotspot('hotspot-dim+X-Z'))
  drawLine(dimLines[2], viewer.queryHotspot('hotspot-dot+X+Y-Z'), viewer.queryHotspot('hotspot-dot-X+Y-Z'))
  drawLine(dimLines[3], viewer.queryHotspot('hotspot-dot-X+Y-Z'), viewer.queryHotspot('hotspot-dot-X-Y-Z'), viewer.queryHotspot('hotspot-dim-X-Z'))
  drawLine(dimLines[4], viewer.queryHotspot('hotspot-dot-X-Y-Z'), viewer.queryHotspot('hotspot-dot-X-Y+Z'), viewer.queryHotspot('hotspot-dim-X-Y'))
}

onMounted(() => {
  const viewer = modelViewer.value
  viewer.addEventListener('load', () => {
    const center = viewer.getBoundingBoxCenter()
    const size = viewer.getDimensions()
    const [x2, y2, z2] = [size.x / 2, size.y / 2, size.z / 2]

    const setHotspot = (name, x, y, z, label = null, value = null) => {
      viewer.updateHotspot({ name, position: `${x} ${y} ${z}` })
      if (label && value) {
        const el = viewer.querySelector(`button[slot="${label}"]`)
        if (el) el.textContent = `${(value * 100).toFixed(0)} cm`
      }
    }

    setHotspot('hotspot-dot+X-Y+Z', center.x + x2, center.y - y2, center.z + z2)
    setHotspot('hotspot-dim+X-Y', center.x + x2 * 1.2, center.y - y2 * 1.1, center.z, 'hotspot-dim+X-Y', size.z)
    setHotspot('hotspot-dot+X-Y-Z', center.x + x2, center.y - y2, center.z - z2)
    setHotspot('hotspot-dim+X-Z', center.x + x2 * 1.2, center.y, center.z - z2 * 1.2, 'hotspot-dim+X-Z', size.y)
    setHotspot('hotspot-dot+X+Y-Z', center.x + x2, center.y + y2, center.z - z2)
    setHotspot('hotspot-dim+Y-Z', center.x, center.y + y2 * 1.1, center.z - z2 * 1.1, 'hotspot-dim+Y-Z', size.x)
    setHotspot('hotspot-dot-X+Y-Z', center.x - x2, center.y + y2, center.z - z2)
    setHotspot('hotspot-dim-X-Z', center.x - x2 * 1.2, center.y, center.z - z2 * 1.2, 'hotspot-dim-X-Z', size.y)
    setHotspot('hotspot-dot-X-Y-Z', center.x - x2, center.y - y2, center.z - z2)
    setHotspot('hotspot-dim-X-Y', center.x - x2 * 1.2, center.y - y2 * 1.1, center.z, 'hotspot-dim-X-Y', size.z)
    setHotspot('hotspot-dot-X-Y+Z', center.x - x2, center.y - y2, center.z + z2)

    renderSVG()
    viewer.addEventListener('camera-change', renderSVG)
  })
})
</script>

<style scoped>
.dot,
.dim {
  background: transparent !important;
  border: none;
  color: #43d6cf;
  box-shadow: none;
  outline: none;
}

.dimensionLineContainer {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}

.dimensionLine {
  stroke: #3eddd5;
  stroke-width: 2;
  stroke-dasharray: 2;
}
</style>
