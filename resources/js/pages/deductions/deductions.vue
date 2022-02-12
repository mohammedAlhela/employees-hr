<template>
    <div>
        <div class="deductions-container">

             <v-overlay :value="overlay" opacity=".7">

                <div class="deductions-holder">
                    <navigation-upbar />

                    <div class="deductions-sub-holder">
                        <!-- filters and data buttons -->
                        <v-row>
                            <transition name="fade">
                                <v-col
                                    cols="12 pt-5"
                                    v-show="$store.state.deductions.filter.status"
                                >
                                    <v-row>
                                        <v-col cols="12">


                                            <v-tooltip top>
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs
                                                    }"
                                                >
                                                    <span
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        <span
                                                            class="main-header"
                                                        >
                                                            {{
                                                                $store.getters[
                                                                    "deductions/filteredEmployees"
                                                                ].length
                                                            }} Employees
                                                        </span>
                                                    </span>
                                                </template>
                                                <span>
                                                 Employees Number
                                                </span>
                                            </v-tooltip>
                                        </v-col>

                                        <v-col cols="3">
                                            <v-select
                                            @change=" $store.commit('deductions/resetEmployee') "
                                                hide-details
                                                placeholder="Gender"
                                                light
                                                v-model="
                                                    $store.state.deductions.filter
                                                        .gender
                                                "
                                                :items="
                                                    $store.state.employees
                                                        .genders
                                                "
                                                solo
                                                dense
                                                class=" pb-0 textfield"
                                                    clearable
                                            ></v-select>
                                        </v-col>

                                        <v-col cols="3">
                                            <v-select
                                                 @change=" $store.commit('deductions/resetEmployee') "
                                                placeholder="Employee Type"
                                                light
                                                hide-details
                                                v-model="
                                                    $store.state.deductions.filter
                                                        .employee_type
                                                "
                                                :items="
                                                    $store.state.employees
                                                        .employee_types
                                                "
                                                solo
                                                dense
                                                class=" pb-0 textfield"
                                                    clearable
                                            ></v-select>
                                        </v-col>

                                        <v-col cols=" pb-0 3">
                                            <v-select
                                                 @change=" $store.commit('deductions/resetEmployee') "
                                                placeholder="Bases At"
                                                light
                                                hide-details
                                                v-model="
                                                    $store.state.deductions.filter
                                                        .based_at
                                                "
                                                :items="
                                                    $store.state.employees
                                                        .based_ats
                                                "
                                                solo
                                                dense
                                                class="textfield"
                                                    clearable
                                            ></v-select>
                                        </v-col>

                                        <v-col cols="3">
                                            <v-select
                                                 @change=" $store.commit('deductions/resetEmployee') "
                                                placeholder="Position"
                                                light
                                                hide-details
                                                v-model="
                                                    $store.state.deductions.filter
                                                        .position
                                                "
                                                :items="
                                                    $store.state.employees
                                                        .positions
                                                "
                                                solo
                                                dense
                                                class=" pb-0 textfield"
                                                    clearable
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </transition>

                            <v-col cols="6 pt-0">
                                <v-autocomplete
                                    placeholder="Choose employee"
                                    light
                                    v-model="$store.state.deductions.employee"
                                    :items="
                                        $store.getters[
                                            'deductions/filteredEmployees'
                                        ]
                                    "
                                    item-text="first_name"
                                    item-value="id"
                                    solo
                                    dense
                                    return-object
                                    class="textfield"

                                    append-icon="mdi-close"
                                    @click:append = "$store.state.deductions.employee = {}"
                                ></v-autocomplete>



                            </v-col>



                            <v-col cols="12" md = "6">

                                <transition name="fade">
                                <v-col
                                    cols="6 pt-0"
                                    class="text-lg-right"
                                    v-show="$store.state.deductions.employee.id"
                                >
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <span class="main-header">
                                                    <v-chip
                                                        small
                                                        class=""
                                                        dark
                                                        label
                                                        color="#6cd7b4"
                                                    >
                                                        {{
                                                            $store.getters[
                                                                "deductions/getTotalDeductions"
                                                            ]
                                                        }}$
                                                    </v-chip>
                                                </span>
                                            </span>
                                        </template>
                                        <span>
                                            Filtered Records Total
                                        </span>
                                    </v-tooltip>

                                    <v-btn
                                        dark
                                        class="mx-2"
                                        fab
                                        small
                                        color="orange"
                                        @click="
                                            $store.commit(
                                                'deductions/downloadAllExcel'
                                            )
                                        "
                                    >
                                        <v-icon class="white-icon" dark>
                                            mdi-download
                                        </v-icon>
                                    </v-btn>

                                    <v-btn
                                    @click = "$store.dispatch('deductions/add')"
                                        dark
                                        class="mx-2"
                                        fab
                                        small
                                        color="green"
                                    >
                                        <v-icon class="white-icon" dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </transition>

                            </v-col>







                            <v-col cols = "12">

                                <transition name="fade">
                                    <span
                                        class="items-number"
                                        v-show="
                                            $store.state.deductions.employee.id
                                        "
                                    >
                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    <span class="main-header">
                                                        {{
                                                            $store.getters[
                                                                "deductions/filteredDeductions"
                                                            ].length
                                                        }}
                                                        Deductions
                                                    </span>
                                                </span>
                                            </template>
                                            <span> Deductions number</span>
                                        </v-tooltip>

                                        <span class="d-inline-block ml-5">
                                            <span class="header">
                                                Employee Type :
                                            </span>

                                            <span class="paragraph">
                                                {{
                                                    $store.state.deductions
                                                        .employee.employee_type
                                                }}
                                            </span>
                                        </span>

                                        <span class="d-inline-block ml-2">
                                            <span class="header">
                                                Based At :
                                            </span>

                                            <span class="paragraph">
                                                {{
                                                    $store.state.deductions
                                                        .employee.based_at
                                                }}
                                            </span>
                                        </span>

                                        <span class="d-inline-block ml-2">
                                            <span class="header">
                                                Total Salary:
                                            </span>

                                            <span class="paragraph">
                                                {{
                                                    $store.state.deductions
                                                        .employee.total_salary
                                                }}$
                                            </span>
                                        </span>
                                    </span>
                                </transition>
                            </v-col>


                        </v-row>
                        <!-- filters and data buttons -->
                        <deductions-records />


                              <delete-confirm
                        :deleteConfirm="$store.state.deductions.deleteSnackbar"
                        @close="$store.state.deductions.deleteSnackbar = false"
                        @deleteData="$store.dispatch('deductions/delete')"
                        user="Record"
                    />

                    </div>
                </div>
       </v-overlay>
        </div>
    </div>
</template>

<script>
import deductionsRecords from "./deductionsRecords.vue";
export default {
    name: "deductions",




  data: () => ({
        overlay: true
    }),

    components: {
        deductionsRecords
    },

    methods : {
        test (){
            alert('fg')
        }
    },


    mounted() {

        this.$store.dispatch("deductions/fetch");
    }
};
</script>
