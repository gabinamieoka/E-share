<template>
  <li>
    <label>
      <input
        type="checkbox"
        v-model="node.visible"
        @change="toggleVisibility(node)"
      />
      {{ node.name }}
    </label>
    <ul v-if="node.children && node.children.length">
      <TreeNode
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :toggle-fn="toggleFn"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import TreeNode from './TreeNode.vue'
// Importa a nossa nova definição de tipo
import type { TreeNode as TreeNodeType } from '../../models/type'

const props = defineProps<{
  node: TreeNodeType,
  toggleFn: (node: TreeNodeType) => void
}>()

// A tipagem do parâmetro 'node' agora é inferida a partir de 'toggleFn'
function toggleVisibility(node: TreeNodeType) {
  props.toggleFn(node)
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
}
li {
  margin-top: 5px;
}
</style>