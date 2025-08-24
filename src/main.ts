import { createApp } from 'vue'
import App from './App.vue'
import '@google/model-viewer'

import vuetify from './plugins/vuetify'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleXmark, faRuler, faList, faTh , faDownload} from '@fortawesome/free-solid-svg-icons'

library.add(faCircleXmark, faRuler, faList, faTh, faDownload)

const app = createApp(App)

app
  .component('font-awesome-icon', FontAwesomeIcon) // registra o componente globalmente
  .use(vuetify)
  .mount('#app')