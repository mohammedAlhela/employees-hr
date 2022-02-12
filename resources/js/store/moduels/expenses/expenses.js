import store from "../../index";
import authentication from "../authentication/authentication";

export default {
    namespaced: true,

    modules: {},

    state: {
        expenses: [],
        employees: [],

        // filter employees

        filter: {
            status: true,
            gender: "",
            based_at: "",
            employee_type: "",
            position: ""
        },
        // filter employees

        // filter the expenses using the employee name
        employee: {
            first_name: "",
            id: ""
        },

        defaultEmployee: {
            first_name: "",
            id: ""
        },

        // filter the expenses using the employee name


           // delete section
        //    deleteSnackbar: false,
        //    deleteIndex: -1,
           //  delete section

    },

    getters: {
        filteredExpenses: (state, getters) => {
            let conditions = [];

            if (state.employee.id) {
                conditions.push(getters.filterEmployeee);
            }

            if (conditions.length > 0) {
                return state.expenses.filter(expense => {
                    return conditions.every(condition => {
                        return condition(expense);
                    });
                });
            }

            return state.expenses;
        },

        filterEmployeee: state => item => {
            return item.employee_id + "" == parseInt(state.employee.id);
        },

        getTotalExpenses: (state, getters) => {
            let sub = 0;

            getters.filteredExpenses.forEach(expense => {
                sub += parseInt(expense.total);
            });

            return sub;
        },




        filteredEmployees: (state, getters) => {
            let conditions = [];

            if (state.filter.employee_type) {
                conditions.push(getters.filterEmployeeType);
            }

            if (state.filter.gender) {
                conditions.push(getters.filterGender);
            }

            if (state.filter.based_at) {
                conditions.push(getters.filterBasedAt);
            }

            if (state.filter.position) {
                conditions.push(getters.filterPosition);
            }

            if (conditions.length > 0) {
                return state.employees.filter(employee => {
                    return conditions.every(condition => {
                        return condition(employee);
                    });
                });
            }

            return state.employees;
        },



        filterEmployeeType: state => item => {
            if (item.employee_type) {
                return item.employee_type
                    .toLowerCase()
                    .includes(state.filter.employee_type.toLowerCase());
            } else {
                return false;
            }
        },

        filterGender: state => item => {
            if (item.gender) {
                return item.gender
                    .toLowerCase()
                    .includes(state.filter.gender.toLowerCase());
            } else {
                return false;
            }
        },

        filterBasedAt: state => item => {
            if (item.based_at) {
                return item.based_at
                    .toLowerCase()
                    .includes(state.filter.based_at.toLowerCase());
            } else {
                return false;
            }
        },

        filterPosition: state => item => {
            if (item.position) {
                return item.position
                    .toLowerCase()
                    .includes(state.filter.position.toLowerCase());
            } else {
                return false;
            }
        }
    },

    mutations: {

        // showDeleteSnackbar: (state, item) => {
        //     state.deleteIndex = item.id;
        //     state.deleteSnackbar = true;
        // },

        resetEmployee: state => {
            state.employee = Object.assign({}, state.defaultEmployee);
        },

        assignApiData: (state, payload) => {
            state.expenses = payload.expenses;
        },

        fillApiErrors: (state, errors) => {
            state.errors = errors;
        },

        downloadAllExcel: state => {
            window.location.assign(
                `/api/expenses/exportExcel/${state.employee.id}`
            );
        },

        assignEmployeesFromEmployeesPage: (state, payload) => {
            state.employees = payload.employees;
        }
    },

    actions: {
        fetch({ state, commit, payload, dispatch }) {
            axios
                .get("/api/expenses")
                .then(response => {
                    let payload = {
                        expenses: response.data.expenses
                    };

                    commit("assignApiData", payload);

                    console.log(response.data.expenses);
                })
                .catch(error => {
                    store.commit("serverError");
                });
        },

        update({ state, dispatch }, item) {
            item.total =
                parseInt(item.employment_offer) +
                parseInt(item.transfer_work_permit_application) +
                parseInt(item.pre_approval_typing) +
                parseInt(item.work_permit_pre_approval_fee) +
                parseInt(item.work_permit_information_update) +
                parseInt(item.employment_visa) +
                parseInt(item.change_work_status) +
                parseInt(item.status_delay_fine) +
                parseInt(item.employment_contract) +
                parseInt(item.employment_renewal) +
                parseInt(item.labour_card_renewal) +
                parseInt(item.work_permit_application) +
                parseInt(item.id_registration) +
                parseInt(item.pre_visa_medical) +
                parseInt(item.daman_document_preparation) +
                parseInt(item.daman_insurance_delay) +
                parseInt(item.insurance_delay_fee) +
                parseInt(item.passport_charge) +
                parseInt(item.residency) +
                parseInt(item.residency_delay_fine);

            axios
                .post(`/api/expense/update/${item.id}`, item)
                .then(response => {
                    dispatch("fetch");
                    Toast.fire({
                        icon: "success",
                        title: "Expense updated successfully"
                    });
                });
        },

//         add({ state, dispatch }) {

// let expenseData = new FormData ;
// expenseData.append("employee_id" , state.employee.id);
//             axios
//                 .post(`/api/expense/add`, expenseData)
//                 .then(response => {
//                     dispatch("fetch");
//                     Toast.fire({
//                         icon: "success",
//                         title: "Expense Added successfully"
//                     });
//                 });
//         },

        // delete({ state, dispatch }) {
        //     state.deleteSnackbar = false;
        //     axios
        //         .delete("/api/expense/" + state.deleteIndex)
        //         .then(response => {
        //             Toast.fire({
        //                 icon: "success",
        //                 title: "Expense deleted successfully "
        //             });
        //             dispatch("fetch");
        //         })
        //         .catch(error => {
        //             store.commit("serverError");
        //         });
        // },
    }
};
