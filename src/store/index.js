import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
    goodsList: []
  },
  getters: {
    hasGoodList (state) {
      return state.goodsList.length
    },
    findGoodCount (state) {
      return function (rule) {
        let array = state.goodsList
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          if (element.name === rule.name && element.price === rule.price) {
            return element.count
          }
        }
      }
    },
    // findGoodCount: (state) => (rule) => {
    //   let array = state.goodsList
    //   for (let index = 0; index < array.length; index++) {
    //     const element = array[index]
    //     if (element.name === rule.name && element.price === rule.price) {
    //       return element.count
    //     }
    //   }
    // },
    totalPrice (state) {
      var num = 0
      state.goodsList.forEach(element => {
        num += element.price * element.count
      })
      return num
    },
    totalCount (state) {
      var num = 0
      state.goodsList.forEach(element => {
        num += element.count
      })
      return num
    }
  },
  mutations: {
    initData (state, data) {
      state.data = data
    },
    push (state, data) {
      for (let index = 0; index < state.goodsList.length; index++) {
        const element = state.goodsList[index]
        if (element.name === data.name && element.price === data.price) {
          state.goodsList[index].count++
          return
        }
      }
      data.count = 1
      state.goodsList.push(data)
    },
    pop (state, data) {
      for (let index = 0; index < state.goodsList.length; index++) {
        const element = state.goodsList[index]
        if (element.name === data.name && element.price === data.price) {
          if (element.count > 1) {
            state.goodsList[index].count--
          } else {
            state.goodsList.splice(index, 1)
          }
          return
        }
      }
    },
    empty (state) {
      state.goodsList = []
    }
  }
})
