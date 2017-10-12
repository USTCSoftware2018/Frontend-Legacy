// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import authController from '@/utils/authController'
import websocket from '@/utils/websocket'
window.$ = $
window.router = router

// eslint-disable-next-line no-extend-native
Promise.prototype.always = function (callback) {
  return this.then(callback, function (reason) {
    callback(reason)
    throw reason
  })
}

Vue.config.productionTip = false

Vue.directive('scroll', {
  bind: function (el, binding) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop + window.innerHeight >= el.clientHeight) {
        binding.value()
      }
    })
  }
})
var mixin = {
  created () {
    if (this.user === null) {
      authController.init(this.$root)
    }
  }
}

/* eslint-disable no-new */
let biohub = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    user: null
  },
  mixins: [mixin]
})

websocket.init()
authController.init(biohub)
