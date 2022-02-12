<template>
    <div>
        <div class="reports-container">
            <v-overlay :value="overlay" opacity=".7">
                <div class="reports-holder">
                    <navigation-upbar />

                    <div class="reports-sub-holder">

                        <v-row>
                            <v-col cols="12" md= "6">
                                <apexchart
                                    type="donut"
                                    height="400"
                                    :options="$store.state.reports.positionsEmployeesNumberOptions"
                                    :series="$store.state.reports.positionsEmployeesNumbers"
                                ></apexchart>

                            </v-col>


                                     <v-col cols="12" md= "6">
                                <apexchart
                                    type="donut"
                                    height="400"
                                    :options="$store.state.reports.positionsEmployeesSalaryOptions"
                                    :series="$store.state.reports.positionsEmployeesSalaries"
                                ></apexchart>

                            </v-col>




   <v-col cols="12" md= "6">
                                <apexchart
                                    type="area"
                                    height="400"
                                    :options="chartOptions"
                                    :series="series"
                                ></apexchart>
                            </v-col>



                           <v-col cols="12" md= "6">
                                <apexchart
                                    type="bar"
                                    height="400"
                                    :options="chartOptions_1"
                                    :series="series_1"
                                ></apexchart>
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
    name: "Analytics",

    data: () => ({
        positionsEmployeesNumbers: [],

        positionsEmployeesNumberOptions: {
            chart: {

                type: "pie"
            },

            title: {
                text: "Positions Employees Numbers",
                align: "center",
                style: {
                    fontSize: "14px"
                }
            },

            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
            responsive: [
                {
                    // breakpoint: 480,
                    options: {
                        chart: {

                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        },

        overlay: true,
        series: [
            {
                name: "Malian",
                data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
                name: "Nigerian",
                data: [70, 57, 40, 50, 34, 67, 45]
            },


            //      {
            //     name: "Syrian",
            //     data: [31, 47, 46, 45, 42, 27, 31]
            // },
            {
                name: "Indian",
                data: [100, 60, 40, 20, 34, 52, 41]
            }

        ],

        series_1: [
            {
                name: "Kobaisi Phone",
                data: [70, 50, 20, 10, 98, 104, 106]
            },
            {
                name: "Kalab Phone",
                data: [50, 30, 10, 30, 34, 46, 41]
            },

              {
                name: "Dalma Mall",
                data: [10, 30, 20, 30, 34, 100, 41]
            } ,

              {
                name: "Alain Mall",
                data: [46, 20, 10, 100, 40, 46, 41]
            }



        ],

        series_2: [44, 55, 41, 17, 15],

        options: {
            chart: {
                width: 380,
                type: "pie"
            },

            title: {
                text: "Area with Negative Values",
                align: "center",
                style: {
                    fontSize: "14px"
                }
            },

            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        },

        chartOptions: {
            chart: {
                height: 350,
                type: "area"
            },
            dataLabels: {
                enabled: false
            },

            title: {
                text: "ُExpenses",
                align: "center",
                style: {
                    fontSize: "14px"
                }
            },

            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "string",
                categories: [
                    "Saturday",
                          "Sunday",
                    "Monday",

                    "Tuesday",
                    "Wednesday",     "Thursday",

                ]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            }
        },


        chartOptions_1: {
            chart: {
                height: 350,
                type: "area"
            },
            dataLabels: {
                enabled: false
            },

            title: {
                text: "Deductions && Bouns && Salaries Payments",
                align: "center",
                style: {
                    fontSize: "14px"
                }
            },

            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "string",
              categories: [
                    "Saturday",
                          "Sunday",
                    "Monday",

                    "Tuesday",
                    "Wednesday",
                          "Thursday",

                ]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            }
        }
    }),



    mounted () {
    this.$store.dispatch('reports/fetchPositionsEmployeesNumbers')
    }
};
</script>
