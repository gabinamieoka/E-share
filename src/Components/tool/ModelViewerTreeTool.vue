<template>
  <div class="viewer-wrapper">
    <model-viewer
      ref="modelViewer"
      :src="src"
      camera-controls
      shadow-intensity="1"
      style="width: 70%; height: 600px; border: 1px solid #ccc;"
    >
    </model-viewer>

    <div class="tree-panel">
      <h3>Model Parts</h3>
      <ul v-if="tree.length">
        <TreeNode
          v-for="node in tree"
          :key="node.name"
          :node="node"
          :toggle-fn="toggleVisibility"
        />
      </ul>
      <p v-else>Loading model hierarchy...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '@google/model-viewer'
import type { Object3D } from 'three' // Importa o tipo do Three.js
import TreeNode from './TreeNode.vue'
import type { TreeNode as TreeNodeType } from '../../models/type' // Importa nosso tipo

// Define as props de forma tipada, o que também resolve o aviso de 'props' não lido
defineProps<{
  src: string
}>()

const modelViewer = ref<any>(null)
// O Ref agora sabe que é um array de TreeNodes
const tree = ref<TreeNodeType[]>([])

// Adiciona tipos para os parâmetros e para o retorno da função
function buildTree(object3d: Object3D): TreeNodeType {
  const nodeData: TreeNodeType = {
    name: object3d.name || `Unnamed Node (${object3d.type})`,
    visible: object3d.visible,
    original: object3d,
    children: []
  }

  if (object3d.children && object3d.children.length > 0) {
    nodeData.children = object3d.children.map((child: Object3D) => buildTree(child))
  }

  return nodeData
}

// Adiciona tipos para os parâmetros
function setChildrenVisibility(node: TreeNodeType, visible: boolean) {
  node.original.visible = visible
  node.visible = visible
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: TreeNodeType) => setChildrenVisibility(child, visible))
  }
}

// Adiciona tipo para o parâmetro
function toggleVisibility(node: TreeNodeType) {
  setChildrenVisibility(node, node.visible)
  console.log(`👁 Toggled ${node.name} and its children to ${node.visible ? 'visible' : 'hidden'}`)
}

onMounted(() => {
  const viewer = modelViewer.value
  if (!viewer) return

  viewer.addEventListener('load', () => {
    const scene = viewer.model?.object as Object3D | undefined
    if (!scene) {
      console.error("Scene object not found in model-viewer.")
      return
    }

    tree.value = scene.children.map((child: Object3D) => buildTree(child))
    console.log('✅ Hierarchy tree built:', tree.value)
  })
})
</script>

<style scoped>
.viewer-wrapper {
  display: flex;
  gap: 20px;
}
.tree-panel {
  width: 30%;
  height: 600px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fafafa;
  overflow-y: auto;
}
ul {
  padding-left: 0;
  list-style-type: none;
}
</style>