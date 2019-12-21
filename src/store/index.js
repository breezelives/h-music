import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songId: '',
    playing: false,

    miniPlayer: {
      el: null,
      visible: false,
      play_url: '',
      img: '',
      album_name: '',
      author_name: ''
    },
  },
  mutations: {
    getAudio(state, el) {
      state.miniPlayer.el = el
    },
    play(state, data) {
      state.miniPlayer = Object.assign(state.miniPlayer, data)
      state.miniPlayer.visible = true
    },
    setSongId(state, data) {
      state.songId = data
    },
    playing(state, data) {
      state.playing = data
    },
  },
  actions: {
  },
  modules: {
  }
})
