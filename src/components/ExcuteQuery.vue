<template>
  <div class="query">
    <div class="query-area">
      <textarea v-model="query" rows="6" cols="50" id="area" placeholder="Enter your sql query here"></textarea>
      <button @click="runQuery" id="query-button">Run Query</button>
    </div>

    <div v-if="employees.length > 0">
      <h2>Employees Table</h2>
      <table>
        <thead>
          <tr>
            <th class="header">Name</th>
            <th class="header">Age</th>
            <th class="header">Place of Birth</th>
            <th class="header">Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in pagedEmployees" :key="employee.id">
            <td class="header">{{ employee.name }}</td>
            <td class="header">{{ employee.age }}</td>
            <td class="header">{{ employee.placeOfBirth }}</td>
            <td class="header">{{ employee.salary }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          Next
        </button>
      </div>
    </div>
    <div v-else>Please select any option to view data</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      ageFilter: 'all',
      itemsPerPage: 5, 
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['employees']),
    totalPages() {
      return Math.ceil(this.employees.length / this.itemsPerPage)
    },
    pagedEmployees() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.employees.slice(startIndex, endIndex)
    }
  },
  methods: {
    ...mapActions(['fetchEmployees']),
    runQuery() {
      this.$store.dispatch('fetchEmployees')
      this.currentPage = 1 
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    }
  }
}
</script>

<style scoped>
.query {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 2rem; */
}
#query-button {
    padding: 10px;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
    background: #ffa501;
    border-radius: 20px;
    border-color: #ffa501;
}
.query-area{
  border-right: 1px solid red;
    height: 60vh;
    margin-right: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
}
#area{
  height: 40vh;
  margin-top: 42px;
}
.pagination{
  margin-top: 3rem;
}
span{
  padding: 10px;
}

button{
    padding: 10px;
    background: #ffa501;
    border-radius: 18px;
    font-size: 15px;
    font-family: monospace;
    border-color: #ffa501;
}
h2{
    margin-bottom: 24px;
    font-weight: 500;
    color: green;
    font-size: 22px;
    font-family: monospace;
    background: #ffa501;
    text-align: center
}
.header{
  padding-right: 2rem;
}
</style>
