import { createStore } from 'vuex'

const store = createStore({
  state: {
    employees: []
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees
    }
  },
  actions: {
    fetchEmployees({ commit }) {
      fetch('https://modern-plum-dolphin.cyclic.app/employees')
        .then((response) => response.json())
        .then((data) => {
          commit('setEmployees', data)
        })
        .catch((error) => console.error('Error fetching employees:', error))
    }
  }
})

export default store
