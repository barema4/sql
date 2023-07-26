<template>
  <div class="query">
    <div class="query-area">
      <div>
        <textarea v-model="query" rows="6" cols="50" id="area" placeholder="Enter your sql query here"></textarea>
        <div v-if="!isQueryValid && pagedEmployees.length <= 0" class="error">Sql query  is required in the textarea</div>
      </div>
      <button @click="handleRunQuery" :disabled="!isQueryValid">Run Query</button>
    </div>

    <div v-if="employees.length > 0">
      <h2>Employees Table</h2>
      <ReusableTable :columns="tableColumns" :items="pagedEmployees" />
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          Next
        </button>
      </div>
    </div>
    <div v-else>Run the query to view the answer</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ReusableTable from './ReusableTable.vue'

export default {
  components:{
    ReusableTable
  },
  data() {
    return {
      ageFilter: 'all',
      itemsPerPage: 5,
      currentPage: 1,
      query: '',
      isSubmitted: false,
      tableColumns: [
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' },
        { key: 'placeOfBirth', label: 'Place of Birth' },
        { key: 'salary', label: 'Salary' },
      ]
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
    },
    isQueryValid() {
      return this.query.trim() !== '';
    },

  },
  methods: {
    ...mapActions(['fetchEmployees']),
    handleRunQuery() {
      if (this.isQueryValid) {
        this.runQuery();
      }
    },
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
.query-area {
  border-right: 1px solid red;
  height: 60vh;
  margin-right: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
}

#area {
  height: 40vh;
  margin-top: 42px;
}
.pagination {
  margin-top: 3rem;
}

span {
  padding: 10px;
}

button {
  padding: 10px;
  background: #ffa501;
  border-radius: 18px;
  font-size: 15px;
  font-family: monospace;
  border-color: #ffa501;
}

h2 {
  margin-bottom: 24px;
  font-weight: 500;
  color: green;
  font-size: 22px;
  font-family: monospace;
  background: #ffa501;
  text-align: center
}
.error{
  color: red;
}
</style>
