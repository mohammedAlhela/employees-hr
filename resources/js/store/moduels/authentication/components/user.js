import store from "../../../index";
export default {
    namespaced: true,

    state: {
        passwordType: "password",
        dialog: false,

        permissionsNames : [],
        username: "",
        user: {
            username: "",
            password: "",
            image: ""
        },

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

        tokens: [],


        permissions: [],

        errors: {},

        defaultErrors: {},

    },

    getters: {
        getImage: state => {
            return (
                state.image.preview ||
                state.user.image ||
                "/images/project/user.jpg"
            );
        } ,


    },

    mutations : {


        canAccess: state => {
            return  state.permissionsNames ;
              },

        imageSelected: (state, element) => {
            state.image.file = element.target.files[0];
            state.image.name = element.target.files[0].name;
            let reader = new FileReader();
            reader.readAsDataURL(state.image.file);
            reader.onload = element => {
                state.image.preview = element.target.result;
            };
        },
        resetData: state => {
            state.user.password = "";
            state.errors = Object.assign({}, state.defaultErrors);
            state.dialog = false;
        },

        toggleType: state => {
            state.passwordType == "password"
                ? (state.passwordType = "text")
                : (state.passwordType = "password");
        },

        openDialog: state => {
            state.dialog = true;
        }
    },

    actions: {
        logout({ state, commit }) {
            axios
                .post("/api/logout")
                .then(response => {
                    localStorage.removeItem("token");


                    localStorage.removeItem(
                        "permissions"
                    );


                    Toast.fire({
                        icon: "success",
                        title: "Logged out successfully"
                    });

                    store.commit("redirectRoute", { link: "login" });
                    commit("resetData");
                })
                .catch(error => {
                    store.commit("serverError");
                });
        },

        fetch({ state , dispatch }) {
            axios
                .get(`/api/user`)
                .then(response => {
                    state.user = response.data.user;
                    state.tokens = response.data.tokens;
                    state.permissions = response.data.permissions;
                    state.permissionsNames = response.data.permissionsNames
                })
                .catch(error => {
                 dispatch("logout")
                });
        },


        update({ state, dispatch, commit }) {
            state.errors = {};

            const userData = new FormData();
            userData.append("image", state.image.file);
            userData.append("username", state.user.username);
            userData.append("password", state.user.password ?  state.user.password  : 'notAsssigned');

            axios
                .post("/api/authenticated/update", userData)
                .then(response => {
                    Toast.fire({
                        icon: "success",
                        title: "data updated successfully"
                    });

                    commit("resetData");

                    dispatch("logout");
                })
                .catch(error => {
                    state.errors = error.response.data.errors;
                });
        }
    }
};
