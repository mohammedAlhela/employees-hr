import store from "../../index";
import authentication from "../authentication/authentication";

export default {
    namespaced: true,

    modules: {},

    state: {
        // main section
        users: [],
        permissions : [],
        passwordType: "password",
        passwordConfirmationType: "password",

        buttonLoading: false,

        image: {
            file: "",
            name: "",
            preview: ""
        },

        defaultImage: {
            file: "",
            name: "",
            preview: ""
        },

        headers: [

            {
                text: "Image",
                sortable: false,
                value: "image",
            },


            {
                text: "Admission",
                sortable: true,
                value: "id",
            },

            {
                text: "Username",
                sortable: true,
                value: "username",
            },

            {
                text: "Permissions",
                sortable: false,
                value: "permissions",
            },

            {
                text: "Created at",
                value: "created_at",
                sortable: true,

            },


            {
                text: "Updated at",
                value: "updated_at",
                sortable: true,

            },

            {
                text: "Actions",
                value: "actions",
                sortable: false,

            }
        ],
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
            process: "add",
            test : "",
            username: "",
            password: "",
            password_confirmation: ""
        },

        defaultItem: {
            process: "add",
            username: "",
               test : "",
            password: "",
            password_confirmation: ""
        },

        //  save section

        //filter section

        username: "",
        admission: "",
        created_at: "",
        //filter section

        // permissions section
        moduels: [
            {
                title: "Users",
                moduel: "users",
                value: false
            },

            {
                title: "Employees",
                moduel: "employees",
                value: false
            },

            {
                title: "Reports",
                moduel: "reports",
                value: false
            },

            {
                title: "Employees expenses",
                moduel: "employees_expenses",
                value: false
            },

            {
                title: "Employees Deduction & Bouns & Salaries Payments",
                moduel: "employees_deductions_bouns_salariesPayments",
                value: false
            }
        ]
        // permissions section
    },

    getters: {

        getImage: state =>  {
            return     state.image.preview || state.editedItem.image || '/images/project/user.jpg'
        },

        filteredUsers: (state, getters) => {
            let conditions = [];

            if (state.username) {
                conditions.push(getters.filterUsername);
            }

            if (state.admission) {
                conditions.push(getters.filterAdmission);
            }

            if (state.created_at) {
                conditions.push(getters.filterCreatedAt);
            }

            if (conditions.length > 0) {
                return state.users.filter(user => {
                    return conditions.every(condition => {
                        return condition(user);
                    });
                });
            }

            return state.users;
        },

        filterAdmission: state => item => {
            return item.id + "" == parseInt(state.admission);
        },

        filterUsername: state => item => {
            return item.username
                .toLowerCase()
                .includes(state.username.toLowerCase());
        },

        filterCreatedAt: state => item => {
            return item.created_at
                .toLowerCase()
                .includes(state.created_at.toLowerCase());
        },

        datatableIndex: state => {
            if (state.editedIndex > -1) {
                return state.users.findIndex(function(item) {
                    return item.id == state.editedIndex;
                });
            }
            return 0;
        },

        lastLogin: (state, getters) => item => {
            var index = state.users.indexOf(item);
            if (state.users[index].tokens.length > 0) {
                let date =
                    state.users[index].tokens[
                        state.users[index].tokens.length - 1
                    ].last_used_at;

                return store.getters.formatedDate(date);
            }

            return "Not logged in yet"
        },

        formTitle: state => {
            return state.editedIndex > -1 ? "Edit User Date" : "Add User";
        },

        getModuelsNames: state => {
            let moduelsNames = [];
            state.moduels.forEach(item => {
                if (item.value) {
                    moduelsNames.push(item.moduel);
                }
            });

            return moduelsNames;
        }
    },

    mutations: {

        imageSelected: (state, element) => {

            state.image.file = element.target.files[0]
            state.image.name = element.target.files[0].name
            let reader = new FileReader()
            reader.readAsDataURL(state.image.file)
            reader.onload = element => {
                state.image.preview = element.target.result
            }
        },

        resetData: state => {
            state.dialog = false;
            setTimeout(() => {
                state.buttonLoading = false;
                state.errors = {};
                state.editedIndex = -1;
                state.editedItem = Object.assign({}, state.defaultItem);

                state.moduels.forEach(item => {
                    item.value = false;
                });
            }, 200);
        },

        openDialog: state => {
            state.dialog = true;
        },

        showDeleteSnackbar: (state, item) => {
            state.deleteIndex = item.id;
            state.deleteSnackbar = true;
        },

        editItem: (state, item) => {
            setTimeout(() => {
                state.editedIndex = item.id;
                state.editedItem = Object.assign({}, item);
                state.editedItem.process = "update";
                state.dialog = true;
            }, 100);

            // permissions section
            setTimeout(() => {
                const settedModuels = state.moduels.map(item => {
                    state.editedItem.permissionsNames.indexOf(item.moduel) > -1
                        ? (item.value = true)
                        : (item.value = false);
                    return settedModuels;
                });
            }, 200);
            // permissions section
        },


        assignApiData: (state, payload) => {
            state.users = payload.users;
            state.permissions = payload.permissions;
        },

        fillApiErrors: (state, errors) => {
            state.errors = errors;
            state.buttonLoading = false;
        },

        toggleType:  (state  ,  password  ) =>  {
          password === "password" ?
                state.passwordType == "password"
                    ? (state.passwordType = "text")
                    : (state.passwordType = "password") :

                    state.passwordConfirmationType == "password"
                    ? (state.passwordConfirmationType = "text")
                    : (state.passwordConfirmationType = "password")

        },

        downloadAllExcel: state => {
            window.location.assign("/api/users/exportExcel");
        },
    },

    actions: {
        fetch({ state, commit, payload , dispatch }) {
            axios
                .get("/api/users")
                .then(response => {
                    let payload = {
                        users: response.data.users,
                        permissions: response.data.permissions
                    };

                    commit("assignApiData", payload);

                    dispatch('authentication/user/fetch' , null , {root:true})

                    console.log(response.data.users);
                })
                .catch(error => {
                    store.commit("serverError");
                });
        },

        delete({ state, dispatch }) {
            state.deleteSnackbar = false;
            axios
                .delete("/api/user/" + state.deleteIndex)
                .then(response => {
                    Toast.fire({
                        icon: "success",
                        title: "User deleted successfully "
                    });
                    dispatch("fetch");
                })
                .catch(error => {
                    store.commit("serverError");
                });
        },

        save({ state, dispatch, commit, getters }) {
            state.errors = {};
            state.buttonLoading = true;
            let userData = new FormData();

            userData.append("username", state.editedItem.username);
            userData.append("process", state.editedItem.process);
            userData.append('image', state.image.file)
            userData.append("password", state.editedItem.password ?    state.editedItem.password  : 'notAsssigned');
            userData.append(
                "password_confirmation",
                state.editedItem.password_confirmation
            );
            userData.append("permissions", getters.getModuelsNames);

            if (state.editedIndex > -1) {
                axios
                    .post(`/api/user/update/${state.editedIndex}`, userData)
                    .then(response => {
                        commit("resetData");
                        dispatch("fetch");
                        Toast.fire({
                            icon: "success",
                            title: "User updated successfully"
                        });
                    })
                    .catch(error => {
                        let errors;

                        errors = error.response.data.errors;
                        commit("fillApiErrors", errors);
                    });
            } else {
                axios
                    .post("/api/user/add", userData)
                    .then(response => {
                        commit("resetData");
                        dispatch("fetch");
                        Toast.fire({
                            icon: "success",
                            title: "User added successfully"
                        });
                    })
                    .catch(error => {
                        let errors;

                        errors = error.response.data.errors;
                        commit("fillApiErrors", errors);
                    });
            }
        }
    }
};
