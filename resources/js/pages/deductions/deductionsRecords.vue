<template>
    <transition name="fade">
        <div v-if="$store.state.deductions.employee.id">
            <v-row
                v-for="(item, i) in $store.getters[
                    'deductions/filteredDeductions'
                ]"
                :key="i"
            >
                <v-col cols="12">
                    <v-card light>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                            Deductions
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                               v-model = "item.deduction"
                                                class="input"

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
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                         Bouns
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                  v-model = "item.bouns"
                                                class="input"

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
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                       Salary Payments
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                v-model = "item.salary_payments"
                                                class="input"

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
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                   Date
                                        </span>

                                        <span class="input-holder">
                                            <v-text-field
                                                v-model = "item.date"
                                                class="input"
                                                type="date"
                                                solo
                                                hide-details
                                                dense

                                            >
                                            </v-text-field>
                                        </span>
                                    </div>
                                </v-col>


                                          <v-col cols="4">
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                            Notes
                                        </span>

                                        <span class="input-holder">
                                            <v-textarea
                                            v-model = "item.notes"
                                                rows="14"
                                                solo
                                                hide-details
                                                dense
                                            >
                                            </v-textarea>
                                        </span>
                                    </div>
                                </v-col>

                                          <v-col cols="4">
                                    <div class="deduction-block-holder">
                                        <span classs="header">
                                         Details
                                        </span>

                                        <span class="input-holder">
                                            <v-textarea
                                            v-model = "item.details"
                                                rows="14"
                                                solo
                                                hide-details
                                                dense
                                            >
                                            </v-textarea>
                                        </span>
                                    </div>
                                </v-col>


                                <v-col cols="4" class="total-deductions-holder">
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
                                            item.total
                                        }}$
                                    </v-chip>
                                </v-col>





                                     <v-col cols="12" class="ml-2">


                                <v-btn class = "medium-blue-button" @click = "$store.dispatch('deductions/update' , item)"> Save </v-btn>


                                                          <v-btn        @click="
                                                                $store.commit(
                                                                    'deductions/showDeleteSnackbar',
                                                                    item
                                                                )
                                                            "
                                                            class = "medium-red-button ml-3"

                                                          >
                                                Delete
                                                          </v-btn>





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
    name: "deductionsRecords"
};
</script>
