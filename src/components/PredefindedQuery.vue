<template>
    <div class="parent">
        <div class="left-side">
            <div class="predefined">
                <div class="location-label">
                    <label for="locationFilter">Filter Employees by Location:</label>
                    <select v-model="locationFilter" id="locationFilter">
                        <option value="all">All</option>
                        <option value="New York">New York</option>
                        <option value="Houston">Houston</option>
                        <option value="Miami">Miami</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                    </select>
                </div>
                <div class="salary-label">
                    <label for="salaryFilter">Filter Employees by Salary:</label>
                    <select v-model="salaryFilter" id="salaryFilter">
                        <option value="all">All</option>
                        <option value="above54805">Above 54805</option>
                        <option value="below54805">Below 54805</option>
                    </select>
                </div>
            </div>
            <div class="fetch-button" v-if="paginatedEmployees.length <= 0">
                <button @click="fetchEmployees">Fetch Employees</button>
            </div>
        </div>

        <div class="table">
            <table v-if="paginatedEmployees.length > 0">
                <thead>
                    <tr class="table-header">
                        <th>Name</th>
                        <th>Age</th>
                        <th>Place of Birth</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in paginatedEmployees" :key="employee.id" class="data">
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.age }}</td>
                        <td>{{ employee.placeOfBirth }}</td>
                        <td class="salary">{{ employee.salary }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-else>No data</div>
            <div v-if="showPagination && paginatedEmployees.length > 0" class="paginated">
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
                <span class="pages">Page {{ currentPage }} of {{ totalPages }}</span>
                <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            salaryFilter: 'all',
            locationFilter: 'all',
            currentPage: 1,
            pageSize: 5
        }
    },
    created() {
        this.fetchEmployees()
    },
    computed: {
        ...mapState(['employees']),
        filteredEmployees() {
            if (this.salaryFilter === 'above54805' && this.locationFilter !== 'all') {
                return this.employees.filter(
                    (employee) => employee.salary > 54805 && employee.placeOfBirth === this.locationFilter
                )
            } else if (this.salaryFilter === 'above54805') {
                return this.employees.filter((employee) => employee.salary > 54805)
            } else if (this.salaryFilter === 'below54805' && this.locationFilter !== 'all') {
                return this.employees.filter(
                    (employee) => employee.salary < 54805 && employee.placeOfBirth === this.locationFilter
                )
            } else if (this.locationFilter !== 'all') {
                return this.employees.filter((employee) => employee.placeOfBirth === this.locationFilter)
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
.parent {
    display: flex;
    justify-content: center;
    align-items: baseline;
}

.left-side {
    border-right: 1px solid red;
    height: 20rem;
    margin-right: 3rem;
}

.predefined {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    margin-right: 3rem;
}

.table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
}

.table-header {
    font-size: 13px;
    color: royalblue;
    display: grid;
    grid-template-columns: 2fr 2fr 5fr 2fr;
    grid-gap: 3rem;
}

.data {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr;

    column-gap: 1rem;
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


#salaryFilter {
    padding: 1rem;
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
.salary {
    margin-left: 2rem;
}
.location-label{
  display: grid;
  padding-right: 2rem;
}
.salary-label{
    display: grid;
}
#locationFilter{
    padding: 1rem;
}
</style>
