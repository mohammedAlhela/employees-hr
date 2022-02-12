<template>
    <div>
        <div class="reports-container">
            <v-overlay :value="overlay" opacity=".7">
                <div class="reports-holder">
                    <navigation-upbar />

                    <div class="reports-sub-holder">
                        <v-row>
                            <!-- date options -->
                            <v-col cols="12" md="6" class="py-0 pt-1">
                                <span class="input-header">
                                    Choose Date
                                </span>


                                <v-radio-group light v-model="dateType" row>
                                    <v-radio
                                        label="All Time"
                                        value="all_time"
                                    ></v-radio>

                                    <v-radio
                                        label="Last Week"
                                        value="last_week"
                                    ></v-radio>
                                    <v-radio
                                        label="Last Month"
                                        value="last_month"
                                    ></v-radio>

                                    <v-radio
                                        label="Custom Date"
                                        value="custom_date"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>


                                  <!-- <v-col cols="12" md="6" class="py-0 pt-1">
                                <span class="input-header">
                                    Choose Report Type
                                </span>


                                <v-radio-group light v-model="reportType" row>
                                    <v-radio
                                        label="All Time"
                                        value="all_time"
                                    ></v-radio>

                                    <v-radio
                                        label="Last Week"
                                        value="last_week"
                                    ></v-radio>
                                    <v-radio
                                        label="Last Month"
                                        value="last_month"
                                    ></v-radio>

                                    <v-radio
                                        label="Custom Date"
                                        value="custom_date"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col> -->


                            <v-col cols="12" md="6" class="py-0 pt-1">
                                <span class="input-header">
                                    Choose Employees :
                                    {{
                                        $store.state.reports.selectEmployeesIds
                                            .length ||
                                            this.$store.getters[
                                                'reports/filteredEmployeesIds'
                                            ].length
                                    }}
                                </span>

                                <v-radio-group
                                    light
                                    v-model="employeesType"
                                    row
                                >
                                    <v-radio
                                        @click="
                                            $store.commit(
                                                'reports/pushAllEmployees'
                                            )
                                        "
                                        label="All Employees"
                                        value="all_employees"
                                    ></v-radio>
                                    <v-radio
                                        @click="
                                            $store.commit(
                                                'reports/SelectEmployees'
                                            )
                                        "
                                        label="Select Employees"
                                        value="selected_employees"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>

                            <v-row>
                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <span class="input-header">
                                        From Date :
                                    </span>

                                    <v-menu
                                        :disabled="dateType != 'custom_date'"
                                        ref="fromDate"
                                        v-model="form.fromDateMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="form.fromDateValue"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                light
                                                class="textfield"
                                                solo
                                                dense
                                                v-model="form.fromDateValue"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                class="no-focus"
                                                @click="fromDateMenu = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                class="no-focus"
                                                @click="
                                                    $refs.fromDate.save(date)
                                                "
                                            >
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <span class="input-header">
                                        To Date :
                                    </span>

                                    <v-menu
                                        :disabled="dateType != 'custom_date'"
                                        ref="toDate"
                                        v-model="toDateMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="form.toDateValue"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                light
                                                class="textfield"
                                                solo
                                                dense
                                                v-model="form.toDateValue"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                class="no-focus"
                                                @click="toDateMenu = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                class="no-focus"
                                                @click="$refs.toDate.save(date)"
                                            >
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>

                            <!-- date options -->

                            <!-- Employees  options -->

                            <v-row>
                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-select
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        @change="
                                            $store.commit(
                                                'reports/resetEmployees'
                                            )
                                        "
                                        hide-details
                                        placeholder="Gender"
                                        light
                                        v-model="
                                            $store.state.reports.filter.gender
                                        "
                                        :items="$store.state.employees.genders"
                                        solo
                                        dense
                                        class=" pb-0 textfield"
                                        clearable
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-select
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        @change="
                                            $store.commit(
                                                'reports/resetEmployees'
                                            )
                                        "
                                        hide-details
                                        placeholder="Employee Type"
                                        light
                                        v-model="
                                            $store.state.reports.filter
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

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-select
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        @change="
                                            $store.commit(
                                                'reports/resetEmployees'
                                            )
                                        "
                                        hide-details
                                        placeholder="Position"
                                        light
                                        v-model="
                                            $store.state.reports.filter.position
                                        "
                                        :items="
                                            $store.state.employees.positions
                                        "
                                        solo
                                        dense
                                        class=" pb-0 textfield"
                                        clearable
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-select
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        @change="
                                            $store.commit(
                                                'reports/resetEmployees'
                                            )
                                        "
                                        hide-details
                                        placeholder="Nationality"
                                        light
                                        v-model="
                                            $store.state.reports.filter
                                                .nationality
                                        "
                                        :items="
                                            $store.state.employees.nationalities
                                        "
                                        solo
                                        dense
                                        class=" pb-0 textfield"
                                        clearable
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-select
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        @change="
                                            $store.commit(
                                                'reports/resetEmployees'
                                            )
                                        "
                                        hide-details
                                        placeholder="Based At"
                                        light
                                        v-model="
                                            $store.state.reports.filter.based_at
                                        "
                                        :items="
                                            $store.state.employees.based_ats
                                        "
                                        solo
                                        dense
                                        class=" pb-0 textfield"
                                        clearable
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0 pt-1">
                                    <v-autocomplete
                                        :disabled="
                                            employeesType == 'all_employees'
                                        "
                                        hide-details
                                        placeholder="Select Employees"
                                        light
                                        v-model="
                                            $store.state.reports
                                                .selectEmployeesIds
                                        "
                                        :items="
                                            $store.getters[
                                                'reports/filteredEmployees'
                                            ]
                                        "
                                        solo
                                        dense
                                        multiple
                                        item-text="first_name"
                                        item-value="id"
                                        class=" pb-0 textfield"
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>

                            <!-- Employees options -->

                            <!-- buttons-->

                            <v-col cols="12">
                                <form
                                    action="http://127.0.0.1:8000/api/reports/pdf/employeeSalaries"
                                    method="post"
                                    target="_blank"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        :value="csrf"
                                    />

                                    <input
                                        name="selectedEmployees"
                                        type="hidden"
                                        :value="
                                            $store.state.reports
                                                .selectEmployeesIds.length
                                                ? $store.state.reports
                                                      .selectEmployeesIds
                                                : $store.getters[
                                                      'reports/filteredEmployeesIds'
                                                  ]
                                        "
                                    />

                                    <input
                                        name="dateType"
                                        type="hidden"
                                        :value="dateType"
                                    />

                                    <input
                                        name="fromDate"
                                        type="hidden"
                                        :value="form.fromDateValue"
                                    />

                                    <input
                                        name="toDate"
                                        type="hidden"
                                        :value="form.toDateValue"
                                    />

                                    <button type="submit" class="report-button">
                                        PDF
                                    </button>
                                </form>


                                    <form
                                    action="http://127.0.0.1:8000/api/reports/excel/employeeSalaries"
                                    method="post"
                                    target="_blank"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        :value="csrf"
                                    />

                                    <input
                                        name="selectedEmployees"
                                        type="hidden"
                                        :value="
                                            $store.state.reports
                                                .selectEmployeesIds.length
                                                ? $store.state.reports
                                                      .selectEmployeesIds
                                                : $store.getters[
                                                      'reports/filteredEmployeesIds'
                                                  ]
                                        "
                                    />

                                    <input
                                        name="dateType"
                                        type="hidden"
                                        :value="dateType"
                                    />

                                    <input
                                        name="fromDate"
                                        type="hidden"
                                        :value="form.fromDateValue"
                                    />

                                    <input
                                        name="toDate"
                                        type="hidden"
                                        :value="form.toDateValue"
                                    />

                                    <button type="submit" class="report-excel-button">
                                   Excel
                                    </button>
                                </form>



                            </v-col>
                            <!-- buttons-->

                            <div class="clearing"></div>
                        </v-row>
                    </div>
                </div>
            </v-overlay>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Reports',

    data: () => ({
        csrf: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute('content'),
        date: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
        ).toISOString(),

        fromDateMenu: false,
        toDateMenu: false,
        overlay: true,

        form: {
            fromDateValue: '',
            toDateValue: '',

            employee: { first_name: '', id: '' },

            based_at: '',
            position: '',
            employee_type: '',
            position_branch_number: ''
        },

        dateType: 'last_week',

        employeesType: 'all_employees'
    }),
}
</script>
