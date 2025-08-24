// src/models/Tool.ts


// Structure for a tool model
export interface Tool {
  name: string
  description?: string
  src: string
  poster?: string
}

// base data for tools
export const toolsData: Tool[] = [
  {
    name: 'Grid empty',
    description: '',
    src: new URL ('../assets/Grid_empty.gltf',import.meta.url).href,
    poster: ''
  },
  {
    name: 'Container',
    description: '',
    src: new URL ('../assets/SMM_Container_short_wo_pipes.gltf', import.meta.url).href,
    poster: ''
  },
  {
    name: 'Container',
    description: '',
    src: new URL ('../assets/SMM_Container_short.glb', import.meta.url).href,
    poster: ''
  },
  {
    name: 'Strebenbefestigung',
    description: '',
    src: new URL('../assets/Strebenbefestigung-160399.glb', import.meta.url).href,  
    poster: ''
  },
  {
    name: 'Sektionsumgebung',
    description: '',
    src: new URL('../assets/Sektionsumgebung_BspTUHH.glb', import.meta.url).href,
    poster: ''
  },
  {
    name: 'SKSTOP 2C60191252',
    description: '',
    src:new URL ('../assets/SKS_TOP_2C_60_191252.glb',import.meta.url).href,
    poster: ''
  },
  {
    name: 'Stabil_D-3G_SILIKON_89_115805',
    description: '',
    src: new URL ('../assets/Stabil_D-3G_SILIKON_89_115805.glb',import.meta.url).href,  
    poster: ''
  }
]
