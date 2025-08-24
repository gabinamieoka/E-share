import { ref, watch, nextTick, type Ref } from 'vue'

export function usePosterGenerator(tools: any[], viewer: Ref<any>) {
  const postersZip = ref<any | null>(null)
  const isGeneratingPosters = ref(false)
  const currentIndex = ref(0)
  const showSnackbar = ref(false)
  const snackbarText = ref('')
  const generatedPosters = ref<string[]>([])  // New base64 array to store generated posters

  // Force the viewer to update when the currentIndex changes
  watch(currentIndex, (newIndex) => {
    if (newIndex < tools.length) {
      viewer.value?.setAttribute('src', tools[newIndex].src)
    }
  })

  
const generatePosters = async () => {
  // Prevents generating again if it's already in progress
  if (isGeneratingPosters.value) return

  // Set flag to indicate generation is ongoing
  isGeneratingPosters.value = true
  currentIndex.value = 0
  generatedPosters.value = []
  // Dynamically import JSZip library for zipping the posters
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  // Set the first model as the source in <model-viewer>
  viewer.value?.setAttribute('src', tools[0].src)
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 2000)) // Wait to ensure it loads

  // Loop through all tools to generate posters
  for (let i = 0; i < tools.length; i++) {
    currentIndex.value = i

    // Wait for the DOM to update the new src in the viewer
    await nextTick()
    await nextTick()

    // Wait extra time to ensure the canvas is fully rendered
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Access the rendered canvas from <model-viewer>'s shadow DOM
    const canvas = viewer.value?.shadowRoot?.querySelector('canvas')
    if (!canvas) continue

    // Convert the canvas to a base64 image (data URL)
    const dataUrl = canvas.toDataURL()

    // Store the image in the reactive posters list
    generatedPosters.value.push(dataUrl)

    // Save the posters in localStorage so they persist on reload
    localStorage.setItem('generatedPosters', JSON.stringify(generatedPosters.value))

    // Convert the data URL into a blob for file export
    const blob = await (await fetch(dataUrl)).blob()

    // Clean the filename by removing spaces and special characters
    const safeName = tools[i].name?.replace(/\s+/g, '_').replace(/[^\w\-]/g, '') || 'model'

    // Add the blob as a PNG file into the zip
    zip.file(`poster_${safeName}_${i + 1}.png`, blob)
  }
    postersZip.value = await zip.generateAsync({ type: 'blob' })

    // Auto-download the zip file
    const a = document.createElement('a')
    a.href = URL.createObjectURL(postersZip.value)
    a.download = 'posters.zip'
    a.click()

    snackbarText.value = 'All posters generated and downloaded successfully!'
    showSnackbar.value = true
    isGeneratingPosters.value = false
  }

  return {
    generatePosters,
    isGeneratingPosters,
    currentIndex,
    showSnackbar,
    snackbarText,
    generatedPosters
  }
}
