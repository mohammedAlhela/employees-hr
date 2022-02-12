import store from "../../..";

export default {
    namespaced: true,
    state: {
        passwordType: 'password',
        errors : {},

        form: {
            username: "",
            password: ""
        },

        default: {
            username: "",
            password: ""
        },

    },
    mutations: {
        resetData: state => {
            state.form = Object.assign({}, state.default);
        },

        toggleType: state => {
            state.passwordType == 'password'
                ? (state.passwordType = 'text')
                : (state.passwordType = 'password')
        },

    },

    actions: {
        login({ state, commit , rootState }) {
            if (!state.form.username || !state.form.password) {
                Toast.fire({
                    icon: "error",
                    title: "Fill both fields please"
                });
            } else {


                axios
                    .post(`/api/login`, state.form)

                    .then(response => {
                        localStorage.setItem(
                            "token",
                            response.data.token
                        );

                        localStorage.setItem(
                            "permissions",
                            response.data.permissions
                        );

                        Toast.fire({
                            icon: "success",
                            title: "logged in successfully"
                        });

                        window.location.href =
                            "http://127.0.0.1:8000/";
                        commit("resetData");
                    })
                    .catch(error => {
                        Toast.fire({
                            icon: "error",
                            title: error.response.data.message
                        });

                        state.errors = error.response.data.errors
                    });
            }
        }
    }
};
