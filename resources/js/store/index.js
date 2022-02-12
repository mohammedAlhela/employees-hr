import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import authentication from "./moduels/authentication/authentication";
import users from "./moduels/users/users";
import employees from "./moduels/employees/employees";
import expenses from "./moduels/expenses/expenses";
import deductions from "./moduels/deductions/deductions";
import reports from "./moduels/reports/reports";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        users,
        employees,
        expenses,
        deductions , reports
    },

    state: {},

    getters: {
        formatedDate: (state, getters) => dateItem => {
            let dateValue = new Date(dateItem);
            let YearMonthDay =
            dateValue.getFullYear() +
                "-" +
                (dateValue.getMonth() + 1) +
                "-" +
                dateValue.getDate();

            let timestamp =
                YearMonthDay + " " + getters.TwelveHoursFormetedTime(dateValue);
            return timestamp;
        },

        TwelveHoursFormetedTime: state => item => {
            const dateValue = item;
            var hours = dateValue.getHours();
            var minutes = dateValue.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime = hours + ":" + minutes + " " + ampm;
            return strTime;
        }
    },

    mutations: {
        goToHome() {
            router.push({
                name: "home"
            });
        },

        redirectRoute: (state, payload) => {
            router.push({
                name: payload.link
            });
        },

        serverError: state => {
            Toast.fire({
                icon: "error",
                title: "Obs something went wrong in the server "
            });
        },



    }
});
