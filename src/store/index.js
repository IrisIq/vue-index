/*
 * @Author: IrisIq
 * @Date: 2022-07-02 20:59:08
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-14 16:23:16
 * @Description: content
 */
import { createStore } from 'vuex'

// 保存vuex
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    form: {
      name: '',
      sex: '',
      weight: 0,
      tall: 0
    },
    count: 1
  },
  getters: {
    getBmi: state => {
      const bmi = state.form.weight / ((state.form.tall * state.form.tall) / 100 / 100)
      return Math.floor(bmi * 100) / 100
    },
    muscleMini: state => {
      const base = state.form.weight
      const eatMore = {
        fat: base,
        protein: 1.5 * base,
        carbohydrate: 3.5 * base
      }
      return eatMore
    },
    musclePlus: state => {
      const base = state.form.weight
      const eatMore = {
        fat: base,
        protein: 1.5 * base,
        carbohydrate: 4 * base
      }
      return eatMore
    }
  },
  mutations: {
    setForm: (state, date) => {
      state.form = date
    },
    addOne(state) {
      state.count++
    },
    restForm: state => {
      state.form.name = ''
      state.form.sex = ''
      state.form.weight = 0
      state.form.tall = 0
    }
  },
  actions: {
    asyAdd: contex => {
      setTimeout(() => {
        contex.commit('addOne')
      }, 1)
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
