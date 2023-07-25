<template>
  <div class="">
    <div class="predefined">
      <label for="ageFilter">Filter Employees by Age:</label>
      <select v-model="ageFilter" id="ageFilter">
        <option value="all">All</option>
        <option value="above25">Above 25</option>
      </select>

      <label for="salaryFilter">Filter Employees by Salary:</label>
      <select v-model="salaryFilter" id="salaryFilter">
        <option value="all">All</option>
        <option value="above54805">Above 54805</option>
      </select>
    </div>
    <div class="fetch-button" v-if="paginatedEmployees.length <= 0">
      <button @click="fetchEmployees">Fetch Employees</button>
    </div>

    <div class="table">
      <table v-if="paginatedEmployees.length > 0">
        <thead>
          <tr class="table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Place of Birth</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in paginatedEmployees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.age }}</td>
            <td>{{ employee.placeOfBirth }}</td>
            <td>{{ employee.salary }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>Please select any option to view data</div>
    </div>
    <div v-if="showPagination" class="paginated">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
      <span class="pages">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      ageFilter: 'all',
      salaryFilter: 'all',
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapState(['employees']),
    filteredEmployees() {
      if (this.ageFilter === 'above25' && this.salaryFilter === 'above54805') {
        return this.employees.filter((employee) => employee.age > 25 && employee.salary > 54805)
      } else if (this.ageFilter === 'above25') {
        return this.employees.filter((employee) => employee.age > 25)
      } else if (this.salaryFilter === 'above54805') {
        return this.employees.filter((employee) => employee.salary > 54805)
      } else {
        return this.employees
      }
    },
    paginatedEmployees() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredEmployees.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.pageSize)
    },
    showPagination() {
      return this.filteredEmployees.length > this.pageSize
    }
  },
  methods: {
    ...mapActions(['fetchEmployees']),
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber
      }
    }
  }
}
</script>
<style scoped>
.predefined {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
}
.table {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-header {
  font-size: 20px;
  color: royalblue;
}
.fetch-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

button {
  padding: 10px;
  background: #ffa501;
  border-radius: 18px;
  font-size: 15px;
  font-family: monospace;
  border-color: #ffa501;
}

#ageFilter {
  padding: 10px;
}

#salaryFilter {
  padding: 10px;
}
.paginated {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
}
.pages {
  padding: 31px;
}
</style>
