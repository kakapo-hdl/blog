import { createStore } from 'vuex'

export const store = createStore({
  state: {
    sideMenu: false
  },
  mutations: {
    changeSideMenu (state,payload: any) {
      state.sideMenu = payload.isActive;
    }
  }
})