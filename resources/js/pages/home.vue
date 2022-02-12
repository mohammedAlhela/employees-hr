<template>
    <div>
        <div class="home-container">
            <v-overlay :value="overlay" opacity=".7">
                <div class="home-holder">


                    <navigation-upbar />

                    <div class="content-holder">
                        <v-row>
                             <v-col cols="12" md = "6" class="text-center">
                                <div
                                    v-if="!checkAbility('employees')"
                                    class="home-link"
                                    @click="redirectRoute('employees')"
                                >
                                    Employees
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'employees'
                                                        )
                                                    }"
                                                >
                                                    Employees
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to manage
                                            or show Employees
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>

                         <v-col cols="12" md = "6" class="text-center">
                                <div
                                    v-if="!checkAbility('users')"
                                    class="home-link"
                                    @click="redirectRoute('users')"
                                >
                                    users
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'users'
                                                        )
                                                    }"
                                                >
                                                    Users
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to manage
                                            or show Users
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>
       <v-col cols="12" md = "6" class="text-center">
                                <div
                                    v-if="!checkAbility('employees_expenses')"
                                    class="home-link"
                                    @click="redirectRoute('expenses')"
                                >
                                    Expenses
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'employees_expenses'
                                                        )
                                                    }"
                                                >
                                                    Expenses
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to manage
                                            or show Expenses
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>
                            <v-col cols="12" md = "6" class="text-center">
                                <div
                                    v-if="!checkAbility('reports')"
                                    class="home-link"
                                    @click="redirectRoute('reports')"
                                >
                                    Reports
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'reports'
                                                        )
                                                    }"
                                                >
                                                    Reports
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to manage
                                            Reports
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>

                            <v-col cols="12" class="text-center">
                                <div
                                    v-if="
                                        !checkAbility(
                                            'deductions'
                                        )
                                    "
                                    class="home-link"
                                    @click="
                                        redirectRoute(
                                            'deductions'
                                        )
                                    "
                                >
                                    Employees Deduction & Bouns & Salaries
                                    Payments
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'deductions'
                                                        )
                                                    }"
                                                >
                                                    Employees Deduction & Bouns
                                                    & Salaries Payments
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to manage
                                            or show Employees Deduction & Bouns
                                            & Salaries
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>

                            <v-col cols="12"  class="text-center">
                                <div
                                    v-if="!checkAbility('reports')"
                                    class="home-link"
                                    @click="redirectRoute('analytics')"
                                >
                                    Analytics And Charts
                                </div>

                                <div v-else>
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <div
                                                    class="home-link"
                                                    :class="{
                                                        disabled_link: checkAbility(
                                                            'reports'
                                                        )
                                                    }"
                                                >
                                                    Analytics
                                                </div>
                                            </span>
                                        </template>
                                        <span>
                                            You dont have permissions to Show
                                            Analytics
                                        </span>
                                    </v-tooltip>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-divider light></v-divider>
                        </v-row>

                        <v-row class="">
                            <v-col cols="12">
                                <div class="date">
                                    {{
                                        $store.getters['formatedDate'](
                                            new Date()
                                        )
                                    }}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </v-overlay>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',

    data: () => ({
        overlay: true,
        dialog: false
    }),

    methods: {

        checkAbility (ability) {
            let permissions = localStorage.getItem('permissions')

            if (permissions.length) {
                return permissions.indexOf(ability) !== -1 ? false : true
            } else {
                return true
            }
        },

        redirectRoute (route) {
            let payload = {
                link: route
            }

            this.$store.commit('redirectRoute', payload)
        }
    },



}
</script>
