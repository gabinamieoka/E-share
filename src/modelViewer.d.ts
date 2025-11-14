// src/model-viewer.d.ts

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': any;
  }
}

interface HTMLModelViewerElement extends HTMLElement {
  src: string;
  getBoundingBoxCenter(): { x: number; y: number; z: number };
  getDimensions(): { x: number; y: number; z: number };
  updateHotspot(config: { name: string; position: string }): void;
  queryHotspot(name: string): any;
}
