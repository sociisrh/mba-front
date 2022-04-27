import preset from '@/@core/preset/preset'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
  },
})
