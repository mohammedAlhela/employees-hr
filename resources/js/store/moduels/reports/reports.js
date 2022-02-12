import store from '../../index'

export default {
    namespaced: true,

    state: {
        positionsEmployeesNumbers: [49, 55, 65, 57, 47, 63, 64],

        positionsEmployeesSalaries: [
            80000,
            70000,
            65000,
            4500,
            75000,
            76000,
            45000,
            75000,
            76000,
            45000
        ],

        positionsEmployeesNumberOptions: {
            chart: {


                type: 'pie'
            },

            title: {
                text: 'Positions Employees Numbers',
                align: 'center',
                style: {
                    fontSize: '14px'
                }
            },

            labels: [
                'Accountact',
                'Administrator',
                'Finance manager',
                'General manager',
                'Graphic designer',
                'Sales man',
                'Sales manager'
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {


                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        },

        positionsEmployeesSalaryOptions: {
            chart: {

                type: 'pie'
            },

            title: {
                text: 'Branches Employees Total',
                align: 'center',
                style: {
                    fontSize: '14px'
                }
            },

            labels: [
                'Al Ain Phone HM',
                'N 1 Sephora Al Ain',
                'Al Ain Phone Carrfour',
                'N 1 Etisalat Al Ain',
                'Makani Mall Al Ain',
                'A 1 Bawadi Mall',
                'Al Ghurair',
                'DFC Kiosk',
                'Merdif istyle',
                'Jimi istyle'
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {

                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        },

        employees: [],
        selectedEmployeesIds: [],
        selectEmployeesIds : [],


        filter: {
            gender: '',
            based_at: '',
            employee_type: '',
            position: '',
            nationality: ''
        }
    },

    mutations: {
        assignEmployeesFromEmployeesPage: (state, payload) => {
            state.employees = payload.employees

            let apiIds = []
            state.employees.forEach(employee => {
                apiIds.push(employee.id)
            })
            state.selectedEmployeesIds = apiIds
        },

        pushAllEmployees: (state, payload) => {


            let apiIds = []
            state.employees.forEach(employee => {
                apiIds.push(employee.id)
            })
            state.selectedEmployeesIds = apiIds
        },

        resetEmployees: state => {
            state.selectedEmployees = []
        },

        SelectEmployees: state => {
            state.selectedEmployeesIds = []
        }
    },

    getters: {


        filteredEmployeesIds : (state , getters) => {
            let apiIds = []
            getters.filteredEmployees.forEach(employee => {
                apiIds.push(employee.id)
            })
            return apiIds ;
        },


        getIds : (state ) => {
          return state.selectEmployeesIds || state.selectedEmployeesIds ;
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

            if (state.filter.nationality) {
                conditions.push(getters.filterNationality)
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

        filterNationality: state => item => {
            if (item.nationality) {
                return (
                    item.nationality.toLowerCase() ===
                    state.filter.nationality.toLowerCase()
                )
            } else {
                return false
            }
        },

        filterEmployeeType: state => item => {
            if (item.employee_type) {
                return (
                    item.employee_type.toLowerCase() ===
                    state.filter.employee_type.toLowerCase()
                )
            } else {
                return false
            }
        },

        filterGender: state => item => {
            if (item.gender) {
                return (
                    item.gender.toLowerCase() ===
                    state.filter.gender.toLowerCase()
                )
            } else {
                return false
            }
        },

        filterBasedAt: state => item => {
            if (item.based_at) {
                return (
                    item.based_at.toLowerCase() ===
                    state.filter.based_at.toLowerCase()
                )
            } else {
                return false
            }
        },

        filterPosition: state => item => {
            if (item.position) {
                return (
                    item.position.toLowerCase() ===
                    state.filter.position.toLowerCase()
                )
            } else {
                return false
            }
        }
    }
}
