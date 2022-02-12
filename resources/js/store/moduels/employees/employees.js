import store from '../../index'

export default {
    namespaced: true,

    modules: {},

    state: {
        // main section
        employees: [],
        employee_types: ['Full_time', 'Temporary'],
        genders: ['Male', 'Female'],
        based_at_current_statuss: [
            'Terminated',
            'Inactive',
            'Active',
            'On vacation'
        ],
        positions: [
            'Sales man',
            'Sales manager',
            'General manager',
            'Graphic designer',
            'Finance manager',
            'Accountact',
            'Administrator'
        ],
        position_branch_numbers: [
            'Branch 1',
            'Branch 2',
            'Branch 3',
            'Branch 4',
            'Branch 5',
            'Branch 6',
            'Branch 7',
            'Branch 8',
            'Branch 9',
            'Branch 10',
            'Dubai branch',
            'Main branch'
        ],
        based_ats: [
            'Al Ain Phone HM',
            'N 1 Sephora Al Ain',
            'Al Ain Phone Carrfour',
            'N 1 Etisalat Al Ain',
            'Makani Mall Al Ain',
            'A 1 Bawadi Mall',
            'Al Ghurair',

            'DFC Kiosk',
            'Merdif istyle',
            'Jimi istyle',
            'Van',
            'Midrif Kiosk',
            'Dalma Mall',
            'Khaledia',
            'Abu Dhabi istyle',
            'Sahara style',
            'Oud Altoba'
        ],

        nationalities: [
            'Egyptian',
            'Cameroonian',
            'Filipino',
            'Indian',
            'Jordanian',
            'Malian',
            'Syrian',
            'Pakistani',
            'Nigerian'
        ],
        // buttonLoading: false,

        // main section

        // delete section
        deleteSnackbar: false,
        deleteIndex: -1,
        //  delete section

        //  save section
        errors: {},
        dialog: false,
        editedIndex: -1,

        editedItem: {
            first_name: '',
            last_name: '',
            employee_type: '',
            nationality: '',
            gender: '',
            date_of_birth: '',
            local_mobile_number: '',
            local_address: '',
            emergency_number: '',
            emergency_contact_name: '',
            passport_number: '',
            passport_expiry_date: '',
            residency_number: '',
            residency_expiry_date: '',
            health_number: '',
            health_renewal_date: '',
            labour_contract: '',
            labour_contract_issue_date: '',
            labour_contract_expiry_date: '',
            position: '',

            position_date_of_joining: '',
            position_branch_number: '',
            based_at: '',
            based_at_started_date: '',
            based_at_current_status: '',

            basic_salary: '',
            salary_transportation: '',
            salary_accommodation: '',
            total_salary: '',

            date_of_leaving: '',
            reason_of_leaving: ''
        },

        defaultItem: {
            first_name: '',
            last_name: '',
            employee_type: '',
            nationality: '',
            gender: '',
            date_of_birth: '',
            local_mobile_number: '',
            local_address: '',
            emergency_number: '',
            emergency_contact_name: '',
            passport_number: '',
            passport_expiry_date: '',
            residency_number: '',
            residency_expiry_date: '',
            health_number: '',
            health_renewal_date: '',
            labour_contract: '',
            labout_contract_issue_date: '',
            labour_contract_expiry_date: '',
            position: '',

            position_date_of_joining: '',
            position_branch_number: '',
            based_at: '',
            based_at_started_date: '',
            based_at_current_status: '',

            basic_salary: '',
            salary_transportation: '',
            salary_accommodation: '',
            total_salary: '',

            date_of_leaving: '',
            reason_of_leaving: ''
        },

        //  save section

        //filter section
        first_name: '',
        last_name: '',
        employee_type: '',
        gender: '',
        based_at: '',
        based_at_current_status: '',
        position: '',
        position_branch_number: '',

        total_salary: '',

        nationality: '',

        local_mobile_number: '',

        emergency_number: '',

        position: '',
        passport_number: '',

        total_salary: '',

        nationality: '',

        emergency_number: '',

        local_mobile_number: '',

        passport_number: '',

        residency_number: '',

        health_number: '',

        labour_contract: '',

        emergency_contact_name: '',

        //filter section

        buttonLoading: false
    },

    getters: {
        filteredEmployees: (state, getters) => {
            let conditions = []

            if (state.first_name) {
                conditions.push(getters.filterFirstName)
            }

            if (state.last_name) {
                conditions.push(getters.filterLastName)
            }

            if (state.employee_type) {
                conditions.push(getters.filterEmployeeType)
            }

            if (state.gender) {
                conditions.push(getters.filterGender)
            }

            if (state.based_at) {
                conditions.push(getters.filterBasedAt)
            }

            if (state.based_at_current_status) {
                conditions.push(getters.filterBasedAtCurrentStatus)
            }

            if (state.position) {
                conditions.push(getters.filterPosition)
            }

            if (state.local_mobile_number) {
                conditions.push(getters.filterLocalMobileNumber)
            }

            if (state.nationality) {
                conditions.push(getters.filterNationality)
            }

            if (state.passport_number) {
                conditions.push(getters.filterPassportNumber)
            }

            if (state.emergency_number) {
                conditions.push(getters.filterEmergencyNumber)
            }

            if (state.position_branch_number) {
                conditions.push(getters.filterPositionBranchNumber)
            }

            if (state.total_salary) {
                conditions.push(getters.filterTotalSalary)
            }

            if (state.emergency_contact_name) {
                conditions.push(getters.filterEmergencyContactName)
            }

            if (state.residency_number) {
                conditions.push(getters.filterResidencyNumber)
            }

            if (state.health_number) {
                conditions.push(getters.filterHealthNumber)
            }

            if (state.labour_contract) {
                conditions.push(getters.filterLabourContract)
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

        getTotalSalaries: (state, getters) => {
            let sub = 0

            getters.filteredEmployees.forEach(employee => {
                sub += parseInt(employee.total_salary)
            })
            return sub
        },

        getTotalExpenses: (state, getters) => {
            let sub = 0

            getters.filteredEmployees.forEach(employee => {
                sub += parseInt(employee.expenses[0].total)
            })
            return sub
        },

        getTotalDeductions: (state, getters) => {
            if (getters.filteredEmployees.length) {
                let total = 0

                getters.filteredEmployees.forEach(employee => {
                    employee.deductions.forEach(deduction => {
                        total += parseInt(deduction.total)
                    })
                })

                return total
            } else {
                return 0
            }
        },

        totlaSalary: state => {
            return (
                parseInt(state.editedItem.basic_salary) +
                parseInt(state.editedItem.salary_accommodation) +
                parseInt(state.editedItem.salary_transportation)
            )
        },

        getTotal: (state, getters) => {
            return (
                getters.getTotalDeductions +
                getters.getTotalExpenses +
                getters.getTotalSalaries
            )
        },

        recordTotal: (state, getters) => item => {
            return (
                parseInt(item.total_salary) +
                parseInt(item.expenses[0].total) +
                getters.recordDeductionsTotal(item)
            )
        },

        recordDeductionsTotal: state => item => {
            if (state.employees.length) {
                let total = 0
                let deductions = item.deductions
                deductions.forEach(deduction => {
                    total += parseInt(deduction.total)
                })

                return total
            } else {
                return 0
            }
        },

        filterFirstName: state => item => {
            if (item.first_name) {
                return item.first_name
                    .toLowerCase()
                    .includes(state.first_name.toLowerCase())
            } else {
                return false
            }
        },

        filterLastName: state => item => {
            if (item.last_name) {
                return item.last_name
                    .toLowerCase()
                    .includes(state.last_name.toLowerCase())
            } else {
                return false
            }
        },

        filterEmployeeType: state => item => {
            if (item.employee_type) {
                return item.employee_type
                    .toLowerCase()
                    .includes(state.employee_type.toLowerCase())
            } else {
                return false
            }
        },

        filterGender: state => item => {
            if (item.gender) {
                return item.gender.toLowerCase() === state.gender.toLowerCase()
            } else {
                return false
            }
        },

        filterBasedAt: state => item => {
            if (item.based_at) {
                return item.based_at
                    .toLowerCase()
                    .includes(state.based_at.toLowerCase())
            } else {
                return false
            }
        },

        filterBasedAtCurrentStatus: state => item => {
            if (item.based_at_current_status) {
                return (
                    item.based_at_current_status.toLowerCase() ===
                    state.based_at_current_status.toLowerCase()
                )
            } else {
                return false
            }
        },

        filterPosition: state => item => {
            if (item.position) {
                return item.position
                    .toLowerCase()
                    .includes(state.position.toLowerCase())
            } else {
                return false
            }
        },

        filterPositionBranchNumber: state => item => {
            if (item.position_branch_number) {
                return item.position_branch_number
                    .toLowerCase()
                    .includes(state.position_branch_number.toLowerCase())
            } else {
                return false
            }
        },

        filterTotalSalary: state => item => {
            if (item.total_salary) {
                return item.total_salary.toString().includes(state.total_salary)
            } else {
                return false
            }
        },

        filterLocalMobileNumber: state => item => {
            if (item.local_mobile_number) {
                return item.local_mobile_number
                    .toString()
                    .includes(state.local_mobile_number)
            } else {
                return false
            }
        },

        filterLocalMobileNumber: state => item => {
            if (item.local_mobile_number) {
                return item.local_mobile_number
                    .toString()
                    .includes(state.local_mobile_number)
            } else {
                return false
            }
        },

        filterPassportNumber: state => item => {
            if (item.passport_number) {
                return item.passport_number
                    .toString()
                    .includes(state.passport_number)
            } else {
                return false
            }
        },

        filterEmergencyNumber: state => item => {
            if (item.emergency_number) {
                return item.emergency_number
                    .toString()
                    .includes(state.emergency_number)
            } else {
                return false
            }
        },

        filterNationality: state => item => {
            if (item.nationality) {
                return item.nationality
                    .toLowerCase()
                    .includes(state.nationality.toLowerCase())
            } else {
                return false
            }
        },

        filterEmergencyContactName: state => item => {
            if (item.emergency_contact_name) {
                return item.emergency_contact_name
                    .toLowerCase()
                    .includes(state.emergency_contact_name.toLowerCase())
            } else {
                return false
            }
        },

        filterResidencyNumber: state => item => {
            if (item.residency_number) {
                return item.residency_number
                    .toString()
                    .includes(state.residency_number)
            } else {
                return false
            }
        },

        filterHealthNumber: state => item => {
            if (item.health_number) {
                return item.health_number
                    .toString()
                    .includes(state.health_number)
            } else {
                return false
            }
        },

        filterLabourContract: state => item => {
            if (item.labour_contract) {
                return item.labour_contract
                    .toString()
                    .includes(state.labour_contract)
            } else {
                return false
            }
        },

        formTitle: state => {
            return state.editedIndex > -1
                ? 'Edit Employee Date'
                : 'Add Employee'
        }
    },

    mutations: {
        resetData: state => {
            state.dialog = false
            setTimeout(() => {
                state.buttonLoading = false
                state.errors = {}
                state.editedIndex = -1
                state.editedItem = Object.assign({}, state.defaultItem)
            }, 200)
        },

        openDialog: state => {
            state.dialog = true
        },

        showDeleteSnackbar: (state, item) => {
            state.deleteIndex = item.id
            state.deleteSnackbar = true
        },

        editItem: (state, item) => {
            setTimeout(() => {
                state.editedIndex = item.id
                state.editedItem = Object.assign({}, item)
                state.dialog = true
            }, 100)
        },

        downloadAllExcel: state => {
            window.location.assign('/api/employees/exportExcel')
        },

        assignApiData: (state, payload) => {
            state.employees = payload.employees
        },

        fillApiErrors: (state, errors) => {
            state.errors = errors
            state.buttonLoading = false
        },

        downloadAllExcel: state => {
            window.location.assign('/api/employees/exportExcel')
        }
    },

    actions: {
        fetch ({ state, commit }) {
            axios
                .get('/api/employees')
                .then(response => {
                    let payload = {
                        employees: response.data.employees
                    }

                    commit('assignApiData', payload)

                    store.commit(
                        'expenses/assignEmployeesFromEmployeesPage',
                        payload
                    )
                    store.commit(
                        'deductions/assignEmployeesFromEmployeesPage',
                        payload
                    )

                    store.commit(
                        'reports/assignEmployeesFromEmployeesPage',
                        payload
                    )
                })
                .catch(error => {
                    store.commit('serverError')
                })
        },

        delete ({ state, dispatch }) {
            state.deleteSnackbar = false
            axios
                .delete('/api/employee/' + state.deleteIndex)
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Employee deleted successfully '
                    })
                    dispatch('fetch')
                })
                .catch(error => {
                    store.commit('serverError')
                })
        },

        save ({ state, dispatch, commit, getters }) {
            state.editedItem.total_salary =
                parseInt(state.editedItem.basic_salary) +
                parseInt(state.editedItem.salary_accommodation) +
                parseInt(state.editedItem.salary_transportation)
            state.errors = {}

            state.buttonLoading = true

            if (state.editedIndex > -1) {
                axios
                    .post(
                        `/api/employee/update/${state.editedIndex}`,
                        state.editedItem
                    )
                    .then(response => {
                        commit('resetData')
                        dispatch('fetch')
                        Toast.fire({
                            icon: 'success',
                            title: 'Employee updated successfully'
                        })
                    })
                    .catch(error => {
                        let errors

                        errors = error.response.data.errors
                        commit('fillApiErrors', errors)
                    })
            } else {
                axios
                    .post('/api/employee/add', state.editedItem)
                    .then(response => {
                        commit('resetData')
                        dispatch('fetch')
                        Toast.fire({
                            icon: 'success',
                            title: 'Employee added successfully'
                        })
                    })
                    .catch(error => {
                        let errors

                        errors = error.response.data.errors
                        commit('fillApiErrors', errors)
                    })
            }
        }
    }
}
