<template>
  <div>
    <textarea v-model="query" rows="6" cols="50"></textarea>
    <button @click="runQuery">Run Query</button>
    <div v-if="employees.length > 0">
      <h2>Employees</h2>
      <ul>
        <li v-for="employee in employees" :key="employee.id">
          {{ employee.name }} - Age: {{ employee.age }} - Place of Birth:
          {{ employee.placeOfBirth }} - Salary: {{ employee.salary }}
        </li>
      </ul>
    </div>
    <div v-else>Please select any option to view data</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      ageFilter: 'all'
    }
  },
  computed: {
    ...mapState(['employees']),
    employees() {
      return this.$store.state.employees
    }
  },
  methods: {
    ...mapActions(['fetchEmployees']),
    runQuery() {
      this.$store.dispatch('fetchEmployees')
    }
  }
}
</script>
