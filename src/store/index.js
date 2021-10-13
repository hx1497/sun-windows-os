
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    routelist: [],
    hasGetRoute: false,
    questList: [],
    isOpen: false,
    show: true,
    temp: null,
    showStart: false,
    isMenuShow: false,
    MenuX: undefined,
    MenuY: undefined,
  },
  mutations: {
    SET_TOKEN(state) {
      state.token = window.localStorage.getItem('token')
    },

    SET_ROUTE(state, source) {
      let result = []
      function modify(source) {
        for(let i=0;i<source.length;i++) {
          if(source[i].children) {
            modify(source[i].children)
          }else if(source[i].path !== '/login') {
            result.push(source[i])
          }
        }
        return result
      }
      state.routelist = modify(source)
      state.hasGetRoute = true
      return state.routelist
    },

    SET_START(state) {
      state.showStart = !state.showStart
    },

    OPEN_APP(state) {
      state.isOpen = true
    },

    CLOSE_APP(state) {
      state.isOpen = false
    },

    CHANGE_SHOW(state) {
      state.show = !state.show
    },

    SET_TEMP(state,data) {
      state.temp = data
    },

    ADD_QUEST(state,data) {
      let flag = true
      for(let i=0; i<state.questList.length; i++){
        if(state.questList[i] !== data) {
          flag = true
        }else {
          flag = false
          return
        }
      }

      if(flag) {
        state.questList.push(data)
      }
    },
    
    DELETE_QUEST(state,data) {
 
      for(let i=0; i<state.questList.length; i++) {
        if( state.questList[i].path === data.path ) {
          state.questList.splice(i,1)
        }
      }
    },

    SHOW_MENU(state) {
      state.isMenuShow = true
    },

    CLOSE_MENU(state) {
      state.isMenuShow = false
    },

    SET_MENUX(state, data) {
      state.MenuX = data
    },

    SET_MENUY(state, data) {
      state.MenuY = data
    }
  },
  actions: {
  },
  getters: {}
})