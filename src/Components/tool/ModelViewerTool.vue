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
    <!-- Hotspots from JSON -->
    <button
      v-for="spot in config.hotspots"
      :key="spot.name"
      :slot="spot.name"
      :class="spot.type"
    ></button>

    <!-- SVG for dimension lines -->
    <svg
      v-show="showMeasurements"
      id="dimLines"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      class="dimensionLineContainer"
    >
      <line
        v-for="(line, i) in config.lines"
        :key="i"
        class="dimensionLine"
      />
    </svg>
  </model-viewer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '@google/model-viewer'
import config from '../../../eShare/examples/dimensions.json'

const props = defineProps({
  src: String,
  alt: String,
  showMeasurements: Boolean
})

const modelViewer = ref<any>(null)

function drawLine(svgLine: SVGLineElement, dot1: any, dot2: any, dimHotspot: any = null) {
  if (!dot1 || !dot2) return
  svgLine.setAttribute('x1', dot1.canvasPosition.x)
  svgLine.setAttribute('y1', dot1.canvasPosition.y)
  svgLine.setAttribute('x2', dot2.canvasPosition.x)
  svgLine.setAttribute('y2', dot2.canvasPosition.y)
  if (dimHotspot?.facingCamera === false) svgLine.classList.add('hide')
  else svgLine.classList.remove('hide')
}

function renderSVG(viewer: any) {
  const dimLines = viewer.querySelectorAll('line')
  config.lines.forEach((line, i) => {
    const from = viewer.queryHotspot(line.from)
    const to = viewer.queryHotspot(line.to)
    const dimHotspot = line.dim ? viewer.queryHotspot(line.dim) : null
    drawLine(dimLines[i], from, to, dimHotspot)
  })
}

onMounted(() => {
  const viewer = modelViewer.value
  viewer.addEventListener('load', () => {
    const center = viewer.getBoundingBoxCenter()
    const size = viewer.getDimensions()
    const [x2, y2, z2] = [size.x / 2, size.y / 2, size.z / 2]

    // Position hotspots dynamically
    const setHotspot = (name: string, x: number, y: number, z: number, label?: string, value?: number) => {
      viewer.updateHotspot({ name, position: `${x} ${y} ${z}` })
      if (label && value) {
        const el = viewer.querySelector(`button[slot="${label}"]`)
        if (el) el.textContent = `${(value * 100).toFixed(0)} cm`
      }
    }

    setHotspot('hotspot-dot+X-Y+Z', center.x + x2, center.y - y2, center.z + z2)
    setHotspot('hotspot-dim+X-Y',   center.x + x2 * 1.2, center.y - y2 * 1.1, center.z, 'hotspot-dim+X-Y', size.z)
    setHotspot('hotspot-dot+X-Y-Z', center.x + x2, center.y - y2, center.z - z2)
    setHotspot('hotspot-dim+X-Z',   center.x + x2 * 1.2, center.y, center.z - z2 * 1.2, 'hotspot-dim+X-Z', size.y)
    setHotspot('hotspot-dot+X+Y-Z', center.x + x2, center.y + y2, center.z - z2)
    setHotspot('hotspot-dim+Y-Z',   center.x, center.y + y2 * 1.1, center.z - z2 * 1.1, 'hotspot-dim+Y-Z', size.x)
    setHotspot('hotspot-dot-X+Y-Z', center.x - x2, center.y + y2, center.z - z2)
    setHotspot('hotspot-dim-X-Z',   center.x - x2 * 1.2, center.y, center.z - z2 * 1.2, 'hotspot-dim-X-Z', size.y)
    setHotspot('hotspot-dot-X-Y-Z', center.x - x2, center.y - y2, center.z - z2)
    setHotspot('hotspot-dim-X-Y',   center.x - x2 * 1.2, center.y - y2 * 1.1, center.z, 'hotspot-dim-X-Y', size.z)
    setHotspot('hotspot-dot-X-Y+Z', center.x - x2, center.y - y2, center.z + z2)

    renderSVG(viewer)
    viewer.addEventListener('camera-change', () => renderSVG(viewer))
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
