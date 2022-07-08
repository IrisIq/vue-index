import { createStore } from 'vuex'

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
      const bmi =
        state.form.weight / ((state.form.tall * state.form.tall) / 100 / 100)
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
      // state.form.name = date.name
      // state.form.sex = date.sex
      // state.form.weight = date.weight
      state.form = date
    },
    addOne(state) {
      state.count++
    }
  },
  actions: {
    asyAdd: contex => {
      setTimeout(() => {
        contex.commit('addOne')
      }, 1)
    }
  },
  modules: {}
})
