// src/components/tool/types.ts
import type { Object3D } from 'three';

// Define a estrutura de um nó da nossa árvore hierárquica
export interface TreeNode {
  name: string;
  visible: boolean;
  original: Object3D; // A referência ao objeto 3D original
  children: TreeNode[];
}