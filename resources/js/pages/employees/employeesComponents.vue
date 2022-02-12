<template>
    <div>
                  <delete-confirm
                :deleteConfirm="$store.state.employees.deleteSnackbar"
                @close="$store.state.employees.deleteSnackbar = false"
                @deleteData="$store.dispatch('employees/delete')"
                user="Employee"
            />


            <v-dialog
                persistent
                fullscreen
                v-model="$store.state.employees.dialog"
                transition="dialog-bottom-transition"
            >
                <v-card flat>
                    <v-toolbar dark color="blue">
                        <v-btn
                            icon
                            @click="$store.commit('employees/resetData')"
                            class="no-focus"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            {{ $store.getters['employees/formTitle'] }}
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-form
                            class="form mt-5"
                            @submit.prevent="save()"
                            enctype="multipart/form-data"
                            lazy-validation
                            ref="form"
                        >
                            <v-row class="fields-container">
                                <!-- +++++++++++++++++++++++++++++++++++++  references  section  +++++++++++++++++++++++++++++++++++ -->
                                <v-col cols="12 pb-1">
                                    <v-icon class="ml-2 mr-1">
                                        mdi-account-box-multiple
                                    </v-icon>
                                    <span class="input-blocks-header">
                                        Personal Informations
                                    </span>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        First Name
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .first_name
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .first_name
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Last Name
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .last_name
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .last_name
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Employee Type
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .employee_type
                                        "
                                        solo
                                        :items="
                                            $store.state.employees
                                                .employee_types
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .employee_type
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Nationality
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .nationality
                                        "
                                        solo
                                        :items="
                                            $store.state.employees.nationalities
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .nationality
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Gender
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors.gender
                                        "
                                        solo
                                        :items="$store.state.employees.genders"
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .gender
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Date Of Birth
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .date_of_birth
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .date_of_birth
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Local mobile number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .local_mobile_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .local_mobile_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Emergency Number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .emergency_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .emergency_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Emergency Contact Name
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .emergency_contact_name
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .emergency_contact_name
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Local mobile number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .local_mobile_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .local_mobile_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Local Address
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-textarea
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .local_address
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .local_address
                                        "
                                        class="textarea"
                                    ></v-textarea>
                                </v-col>

                                <!-- +++++++++++++++++++++++++++++++++++++  references  section  +++++++++++++++++++++++++++++++++++ -->

                                <!-- +++++++++++++++++++++++++++++++++++++  Informations section  +++++++++++++++++++++++++++++++++++ -->

                                <v-col cols="12">
                                    <v-divider light> </v-divider>
                                </v-col>

                                <v-col cols="12 pb-1 pt-2">
                                    <v-icon class="ml-2 mr-1">
                                        mdi-passport
                                    </v-icon>
                                    <span class="input-blocks-header">
                                        Passport && health
                                    </span>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Passport Number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .passport_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .passport_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Passport Expiry Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .passport_expiry_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .passport_expiry_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Residency Number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .residency_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .residency_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Residency Expiry Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .residency_expiry_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .residency_expiry_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Health Number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .health_number
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .health_number
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Health Renewal Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .health_renewal_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .health_renewal_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Labour Contact
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .labour_contract
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .labour_contract
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Labour Contract Issue Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .labour_contract_issue_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .labour_contract_issue_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Labour Contract Expiry Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .labour_contract_expiry_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .labour_contract_expiry_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <!-- +++++++++++++++++++++++++++++++++++++  descriptions section  +++++++++++++++++++++++++++++++++++ -->

                                <!-- +++++++++++++++++++++++++++++++++++++  price and quantity  +++++++++++++++++++++++++++++++++++ -->

                                <v-col cols="12">
                                    <v-divider light> </v-divider>
                                </v-col>

                                <v-col cols="12 pb-1 pt-2">
                                    <v-icon class="ml-2 mr-1">
                                        mdi-source-branch
                                    </v-icon>
                                    <span class="input-blocks-header">
                                        Position && branch
                                    </span>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Position
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .position
                                        "
                                        solo
                                        :items="
                                            $store.state.employees.positions
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .position
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Position Branch Number
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .position_branch_number
                                        "
                                        solo
                                        :items="
                                            $store.state.employees
                                                .position_branch_numbers
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .position_branch_number
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Position Date Of Joining
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .position_date_of_joining
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .position_date_of_joining
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Based At
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .based_at
                                        "
                                        solo
                                        :items="
                                            $store.state.employees.based_ats
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .based_at
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Based At Current Status
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-select
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .based_at_current_status
                                        "
                                        solo
                                        :items="
                                            $store.state.employees
                                                .based_at_current_statuss
                                        "
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .based_at_current_status
                                        "
                                        class="textfield"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Based At Started Date
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .based_at_started_date
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .based_at_started_date
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Date Of Leaving
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="date"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .date_of_leaving
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .date_of_leaving
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Reason Of Leaving
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-textarea
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .reason_of_leaving
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .reason_of_leaving
                                        "
                                        class="textarea"
                                    ></v-textarea>
                                </v-col>

                                <!-- +++++++++++++++++++++++++++++++++++++  price and quantity  +++++++++++++++++++++++++++++++++++ -->

                                <!-- +++++++++++++++++++++++++++++++++++++  tags section   +++++++++++++++++++++++++++++++++++ -->

                                <v-col cols="12">
                                    <v-divider light> </v-divider>
                                </v-col>

                                <v-col cols="12 pb-1 pt-2">
                                    <v-icon class="ml-2 mr-1">
                                        mdi-currency-usd
                                    </v-icon>
                                    <span class="input-blocks-header">
                                        Salaries
                                    </span>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Basic Salary
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .basic_salary
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .basic_salary
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Salary Accommodation
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .salary_accommodation
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .salary_accommodation
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="py-0">
                                    <span class="input-header">
                                        Salary Transportation
                                    </span>
                                    <span class="validated-field">
                                        <v-icon class="validation-icon">
                                            mdi-star
                                        </v-icon>
                                    </span>
                                    <v-text-field
                                        type="number"
                                        required
                                        :rules="
                                            $store.state.employees.errors
                                                .salary_transportation
                                        "
                                        solo
                                        dense
                                        v-model="
                                            $store.state.employees.editedItem
                                                .salary_transportation
                                        "
                                        class="textfield"
                                    ></v-text-field>
                                </v-col>

                                            <v-col cols="4" class="mt-3 pt-5">
                                    <span class="header">
                                        Total :
                                    </span>

                                    <v-chip
                                        small
                                        class="ma-2"
                                        dark
                                        label
                                        color="#aac360"
                                    >
                                        {{
                                              $store.getters['employees/totlaSalary']
                                        }}$
                                    </v-chip>
                                </v-col>


                                <!-- +++++++++++++++++++++++++++++++++++++  tags section   +++++++++++++++++++++++++++++++++++ -->
                                <v-col
                                    cols="12"
                                    class="textarea-form-button-holder"
                                >
                                    <v-btn
                                        class="medium-blue-button"
                                        type="submit"
                                        :loading="
                                            $store.state.employees.buttonLoading
                                        "
                                    >
                                        Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'employeesComponents',



    methods: {
        save () {
            this.$refs.form.validate()
            this.$store.dispatch('employees/save')
        }
    },



}
</script>
