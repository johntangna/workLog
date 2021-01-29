import Vue from 'vue'
import App from './App'

import store from './store'
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'
const db = uniCloud.database()
Vue.prototype.$db = db
import VueXss from 'vue-xss'
Vue.prototype.$xss = VueXss
import {validateSpecialChar} from '@/common/util'
Vue.prototype.$validateSpecialChar = validateSpecialChar
const app = new Vue({
	store,
	...App
})
app.$mount()
