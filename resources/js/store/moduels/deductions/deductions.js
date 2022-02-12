import store from '../../index'
import authentication from '../authentication/authentication'

export default {
    namespaced: true,

    modules: {},

    state: {
        deductions: [],
        employees: [],

        // filter employees

        filter: {
            status: true,
            gender: '',
            based_at: '',
            employee_type: '',
            position: ''
        },
        // filter employees

        // filter the expenses using the employee name
        employee: {
            first_name: '',
            id: ''
        },

        defaultEmployee: {
            first_name: '',
            id: ''
        },

        // filter the expenses using the employee name

        // delete section
        deleteSnackbar: false,
        deleteIndex: -1
        //  delete section
    },

    getters: {
        filteredDeductions: (state, getters) => {
            let conditions = []

            if (state.employee.id) {
                conditions.push(getters.filterEmployeee)
            }

            if (conditions.length > 0) {
                return state.deductions.filter(deduction => {
                    return conditions.every(condition => {
                        return condition(deduction)
                    })
                })
            }

            return state.deductions
        },

        filterEmployeee: state => item => {
            return item.employee_id + '' == parseInt(state.employee.id)
        },

        getTotalDeductions: (state, getters) => {
            let sub = 0

            getters.filteredDeductions.forEach(deduction => {
                sub += parseInt(deduction.total)
            })

            return sub
        },

        filteredEmployees: (state, getters) => {
            let conditions = []

            if (state.filter.employee_type) {
                conditions.push(getters.filterEmployeeType)
            }

            if (state.filter.gender) {
                conditions.push(getters.filterGender)
            }

            if (state.filter.based_at) {
                conditions.push(getters.filterBasedAt)
            }

            if (state.filter.position) {
                conditions.push(getters.filterPosition)
            }

            if (conditions.length > 0) {
                return state.employees.filter(employee => {
                    return conditions.every(condition => {
                        return condition(employee)
                    })
                })
            }

            return state.employees
        },


        filterEmployeeType: state => item => {
            if (item.employee_type) {
                return item.employee_type
                    .toLowerCase()
                    .includes(state.filter.employee_type.toLowerCase())
            } else {
                return false
            }
        },

        filterGender: state => item => {
            if (item.gender) {
                return item.gender
                    .toLowerCase()
                    .includes(state.filter.gender.toLowerCase())
            } else {
                return false
            }
        },

        filterBasedAt: state => item => {
            if (item.based_at) {
                return item.based_at
                    .toLowerCase()
                    .includes(state.filter.based_at.toLowerCase())
            } else {
                return false
            }
        },

        filterPosition: state => item => {
            if (item.position) {
                return item.position
                    .toLowerCase()
                    .includes(state.filter.position.toLowerCase())
            } else {
                return false
            }
        }
    },

    mutations: {
        showDeleteSnackbar: (state, item) => {
            state.deleteIndex = item.id
            state.deleteSnackbar = true
        },

        resetEmployee: state => {
            state.employee = Object.assign({}, state.defaultEmployee)
        },

        assignApiData: (state, payload) => {
            state.deductions = payload.deductions
        },

        downloadAllExcel: state => {
            window.location.assign(
                `/api/deductions/exportExcel/${state.employee.id}`
            )
        },

        assignEmployeesFromEmployeesPage: (state, payload) => {
            state.employees = payload.employees
        }
    },

    actions: {
        fetch ({ state, commit, payload, dispatch }) {
            axios
                .get('/api/deductions')
                .then(response => {
                    let payload = {
                        deductions: response.data.deductions
                    }

                    commit('assignApiData', payload)

                    console.log(state.deductions) ;


                })
                .catch(error => {
                    store.commit('serverError')
                })
        },

        update ({ state, dispatch }, item) {
            item.total =
                parseInt(item.bouns) +
                parseInt(item.salary_payments) +
                parseInt(item.deduction)

                let Data  =  new FormData();
                Data.append('date' , item.date);
                Data.append('details' , item.details )
                Data.append('notes' , item.notes )
                Data.append('employee_id' , item.employee_id )
                Data.append('deduction' , item.deduction )
                Data.append('bouns' , item.bouns )
                Data.append('salary_payments' , item.salary_payments )
                Data.append('total' , item.total )

            axios
                .post(`/api/deduction/update/${item.id}`, Data)
                .then(response => {
                    dispatch('fetch')
                    Toast.fire({
                        icon: 'success',
                        title: 'Record updated successfully'
                    })
                })
        },

        add ({ state, dispatch }) {
            let deductionData = new FormData()
            deductionData.append('employee_id', state.employee.id)
            axios.post(`/api/deduction/add`, deductionData).then(response => {
                dispatch('fetch')
                Toast.fire({
                    icon: 'success',
                    title: 'Record Added successfully'
                })
            })
        },

        delete ({ state, dispatch }) {
            state.deleteSnackbar = false
            axios
                .delete('/api/deduction/' + state.deleteIndex)
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Record deleted successfully '
                    })
                    dispatch('fetch')
                })
                .catch(error => {
                    store.commit('serverError')
                })
        }
    }
}
