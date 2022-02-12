<template>
    <div>
        <div class="">
            <div class="expenses-holder">
                <navigation-upbar />

                <div class="expenses-sub-holder">
                    <!-- filters and data buttons -->
                    <v-row>
                        <v-col cols="12">
                            <v-tooltip top>
                                <template
                                    v-slot:activator="{
                                        on,
                                        attrs
                                    }"
                                >
                                    <span v-bind="attrs" v-on="on">
                                        <span class="main-header">
                                            {{
                                                $store.getters[
                                                    "expenses/filteredEmployees"
                                                ].length
                                            }}
                                            Employees
                                        </span>
                                    </span>
                                </template>
                                <span>
                                    Employees Number
                                </span>
                            </v-tooltip>

                            <v-btn
                                dark
                                class="mx-2"
                                fab
                                small
                                color="orange"
                                @click="
                                    $store.commit('expenses/downloadAllExcel')
                                "
                            >
                                <v-icon class="white-icon" dark>
                                    mdi-download
                                </v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                @change="
                                    $store.commit('expenses/resetEmployee')
                                "
                                hide-details
                                placeholder="Gender"
                                light
                                v-model="$store.state.expenses.filter.gender"
                                :items="$store.state.employees.genders"
                                solo
                                dense
                                class=" pb-0 textfield"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                @change="
                                    $store.commit('expenses/resetEmployee')
                                "
                                placeholder="Employee Type"
                                light
                                hide-details
                                v-model="
                                    $store.state.expenses.filter.employee_type
                                "
                                :items="$store.state.employees.employee_types"
                                solo
                                dense
                                class=" pb-0 textfield"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                @change="
                                    $store.commit('expenses/resetEmployee')
                                "
                                placeholder="Bases At"
                                light
                                hide-details
                                v-model="$store.state.expenses.filter.based_at"
                                :items="$store.state.employees.based_ats"
                                solo
                                dense
                                class="textfield"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                @change="
                                    $store.commit('expenses/resetEmployee')
                                "
                                placeholder="Position"
                                light
                                hide-details
                                v-model="$store.state.expenses.filter.position"
                                :items="$store.state.employees.positions"
                                solo
                                dense
                                class=" pb-0 textfield"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-autocomplete
                                placeholder="Choose employee"
                                light
                                v-model="$store.state.expenses.employee"
                                :items="
                                    $store.getters['expenses/filteredEmployees']
                                "
                                item-text="first_name"
                                item-value="id"
                                solo
                                dense
                                return-object
                                class="textfield"
                                append-icon="mdi-close"
                                @click:append="
                                    $store.state.expenses.employee = {}
                                "
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="12">
                            <transition name="fade">
                                <div
                                    class="items-number"
                                    v-show="$store.state.expenses.employee.id"
                                >
                                    <span class="d-inline-block ml-5">
                                        <span class="header">
                                            Employee Type :
                                        </span>

                                        <span class="paragraph">
                                            {{
                                                $store.state.expenses.employee
                                                    .employee_type
                                            }}
                                        </span>
                                    </span>

                                    <span class="d-inline-block ml-2">
                                        <span class="header">
                                            Based At :
                                        </span>

                                        <span class="paragraph">
                                            {{
                                                $store.state.expenses.employee
                                                    .based_at
                                            }}
                                        </span>
                                    </span>

                                    <span class="d-inline-block ml-2">
                                        <span class="header">
                                            Total Salary:
                                        </span>

                                        <span class="paragraph">
                                            {{
                                                $store.state.expenses.employee
                                                    .total_salary
                                            }}$
                                        </span>
                                    </span>
                                </div>
                            </transition>
                        </v-col>
                    </v-row>

                    <expenses-records />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import expensesRecords from "./expensesRecords.vue";
export default {
    name: "Expenses",

    components: {
        expensesRecords
    },

    mounted() {
        this.$store.dispatch("expenses/fetch");
    }
};
</script>
