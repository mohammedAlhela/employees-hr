<template>
    <transition name="fade">
        <div v-if="$store.state.expenses.employee.id">
            <v-row
                v-for="(expense, i) in $store.getters[
                    'expenses/filteredExpenses'
                ]"
                :key="i"
            >
                <v-col cols="12" md='10'>
                    <v-card light>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Employment Offer
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                            v-model = "expense.employment_offer"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Transfer Work Permit Applicationr
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                  v-model = "expense.transfer_work_permit_application"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Pre approval Tyoing
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                v-model = "expense.pre_approval_typing"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Work Permit Pre Approval Fee:
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                             v-model = "expense.work_permit_pre_approval_fee"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Work Permit Information Update
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                               v-model = "expense.work_permit_information_update"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Employment Visa
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                             v-model = "expense.employment_visa"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Change Work Status
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                  v-model = "expense.change_work_status"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Status Delay Fine
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                    v-model = "expense.status_delay_fine"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Employment Contract
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                               v-model = "expense.employment_contract"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Employment Renewal
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                 v-model = "expense.employment_renewal"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Labour Card Renewal
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                              v-model = "expense.labour_card_renewal"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Work Permit Application
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                              v-model = "expense.work_permit_application"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Id Registeration
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                 v-model = "expense.id_registration"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Pre Visa Medical
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                              v-model = "expense.pre_visa_medical"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Daman Document Preparation
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                  v-model = "expense.daman_document_preparation"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Daman Insurance Delay
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                  v-model = "expense.daman_insurance_delay"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Daman Delay Fee
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                             v-model = "expense.insurance_delay_fee"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Passport Charge
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                v-model = "expense.passport_charge"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Residencye
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                            v-model = "expense.residency"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Residency Delay Fine
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                 v-model = "expense.residency_delay_fine"
                                                class="input"
                                                type="number"
                                                solo
                                                hide-details
                                                dense
                                                append-icon="mdi-currency-usd"
                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="4" class="total-expenses-holder">
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
                                            expense.total
                                        }}$
                                    </v-chip>
                                </v-col>

                                     <v-col cols="12" class="">


                                <v-btn class = "medium-blue-button" @click = "$store.dispatch('expenses/update' , expense)"> Save </v-btn>

                                         <!-- <v-tooltip top>
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

                                                          <v-btn        @click="
                                                                $store.commit(
                                                                    'expenses/showDeleteSnackbar',
                                                                    expense
                                                                )
                                                            "
                                                            class = "medium-red-button"

                                                          >
                                                Delete
                                                          </v-btn>

                                                    </span>
                                                </template>
                                                <span>
                                                    delete Expense
                                                </span>
                                            </v-tooltip> -->



                                </v-col>


                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md='2'>
                    <v-card light>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <div class="expense-block-holder">
                                        <span classs="header">
                                            Notes
                                        </span>

                                        <span class="input-holder">
                                            <v-textarea
                                            v-model = "expense.notes"
                                                rows="14"
                                                solo
                                                hide-details
                                                dense
                                            >
                                            </v-textarea>
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ExpensesRecords"
};
</script>
