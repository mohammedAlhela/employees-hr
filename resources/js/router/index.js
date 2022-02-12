import Vue from "vue";
import store from "../store/index";
import VueRouter from "vue-router";

import Error from "../pages/error.vue";
import Home from "../pages/home.vue";
import Login from "../pages/login.vue";
import Users from "../pages/users/users.vue";
import Employees from "../pages/employees/employees.vue";
import Reports from "../pages/reports.vue";
import Expenses from "../pages/expenses/expenses.vue";
import Deductions from "../pages/deductions/deductions.vue";
import Analytics from "../pages/analytics.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        name: "error",
        component: Error
    },

    {
        path: "/home",
        name: "home",
        meta: { title: "Home" },
        component: Home
    },

    {
        path: "/reports",
        name: "reports",
        meta: { title: "Reports" },
        component: Reports,
        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "reports"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    },


    {
        path: "/analytics",
        name: "analytics",
        meta: { title: "Analytics" },
        component: Analytics,
        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "reports"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    },


    {
        path: "/",
        name: "login",
        meta: { title: "Login" },
        component: Login
    },

    {
        path: "/users",
        name: "users",
        meta: { title: "Users" },
        component: Users,
        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "users"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    },

    {
        path: "/employees",
        name: "employees",
        meta: { title: "Employees" },
        component: Employees,

        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "employees"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    },

    {
        path: "/expenses",
        name: "expenses",
        meta: { title: "Expenses" },
        component: Expenses,

        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "employees_expenses"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    } ,

    {
        path: "/deductions",
        name: "deductions",
        meta: { title: "Deductions" },
        component: Deductions,

        beforeEnter: (to, from, next) => {
            if (
                localStorage.getItem('permissions').indexOf(
                    "deductions"
                ) !== -1
            ) {
                next();
            } else {
                next("/home");
            }
        }
    } ,

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name != "login" && !localStorage.getItem("token")) {
        next("/");
    } else if (to.name == "login" && localStorage.getItem("token")) {
        next("/home");
    } else {
        next();
    }
});

export default router;
