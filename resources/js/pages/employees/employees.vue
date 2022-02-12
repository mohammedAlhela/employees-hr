<template>
    <div>
        <div class="employees-holder">
            <navigation-upbar />

            <div class="employees-sub-holder">
                <v-row>
                    <v-col cols="12" md="7">
                        <span class="custome-fields-holder">
                            <v-select
                                class="textfield"
                                :items="allHeaders"
                                return-object
                                item-value="value"
                                item-text="text"
                                v-model="headers"
                                dense
                                multiple
                                label="Choose Fields To Show In Table"
                            >
                            </v-select>
                        </span>
                    </v-col>

                    <v-col cols="12" md="5" class=" text-lg-right">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <span v-bind="attrs" v-on="on">
                                    <span class="main-header">
                                        {{
                                            $store.getters[
                                                'employees/filteredEmployees'
                                            ].length
                                        }}
                                        Employees
                                    </span>
                                </span>
                            </template>
                            <span> Employees number</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template
                                v-slot:activator="{
                                    on,
                                    attrs
                                }"
                            >
                                <span v-bind="attrs" v-on="on">
                                    <v-btn
                                        dark
                                        class="mx-2"
                                        fab
                                        small
                                        color="orange"
                                        @click="
                                            $store.commit(
                                                'employees/downloadAllExcel'
                                            )
                                        "
                                    >
                                        <v-icon class="white-icon" dark>
                                            mdi-download
                                        </v-icon>
                                    </v-btn>
                                </span>
                            </template>
                            <span>
                                Download Excel File
                            </span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template
                                v-slot:activator="{
                                    on,
                                    attrs
                                }"
                            >
                                <span v-bind="attrs" v-on="on">
                                    <v-btn
                                        dark
                                        class="mx-2"
                                        fab
                                        small
                                        color="green"
                                        @click="
                                            $store.commit(
                                                'employees/openDialog'
                                            )
                                        "
                                    >
                                        <v-icon class="white-icon" dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </span>
                            </template>
                            <span>
                                Add New Record
                            </span>
                        </v-tooltip>
                    </v-col>

                    <v-col cols="12">
                        <span class="items-number">
                            <span class=" d-inline-block">
                                <transition name="fade">
                                    <span v-show="dataButtons">
                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    <span class="main-header">
                                                        <v-chip
                                                            small
                                                            class="ma-2"
                                                            dark
                                                            label
                                                            color="#707ae7"
                                                        >
                                                            {{
                                                                $store.state
                                                                    .employees
                                                                    .positions
                                                                    .length
                                                            }}
                                                            Positions
                                                        </v-chip>
                                                    </span>
                                                </span>
                                            </template>
                                            <span
                                                style="display:inline-block ; width:100px"
                                            >
                                                <span
                                                    class="d-block mx-1 my-1"
                                                    v-for="(item,
                                                    index) in $store.state
                                                        .employees.positions"
                                                    :key="index"
                                                >
                                                    {{ item }}
                                                </span>
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    <span class="main-header">
                                                        <v-chip
                                                            small
                                                            class="ma-2"
                                                            dark
                                                            label
                                                            color="#e3986d"
                                                        >
                                                            {{
                                                                $store.state
                                                                    .employees
                                                                    .position_branch_numbers
                                                                    .length
                                                            }}
                                                            Branch Numbers
                                                        </v-chip>
                                                    </span>
                                                </span>
                                            </template>
                                            <span
                                                style="display:inline-block ; width:100px"
                                            >
                                                <span
                                                    class="d-block mx-1 my-1"
                                                    v-for="(item,
                                                    index) in $store.state
                                                        .employees
                                                        .position_branch_numbers"
                                                    :key="index"
                                                >
                                                    {{ item }}
                                                </span>
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    <span class="main-header">
                                                        <v-chip
                                                            small
                                                            class="ma-2"
                                                            dark
                                                            label
                                                            color="#85dddd"
                                                        >
                                                            {{
                                                                $store.state
                                                                    .employees
                                                                    .position_branch_numbers
                                                                    .length
                                                            }}
                                                            Nationalities
                                                        </v-chip>
                                                    </span>
                                                </span>
                                            </template>
                                            <span
                                                style="display:inline-block ; width:100px"
                                            >
                                                <span
                                                    class="d-block mx-1 my-1"
                                                    v-for="(item,
                                                    index) in $store.state
                                                        .employees
                                                        .nationalities"
                                                    :key="index"
                                                >
                                                    {{ item }}
                                                </span>
                                            </span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    <span class="main-header">
                                                        <v-chip
                                                            small
                                                            class="ma-2"
                                                            dark
                                                            label
                                                            color="#e17655"
                                                        >
                                                            {{
                                                                $store.state
                                                                    .employees
                                                                    .based_ats
                                                                    .length
                                                            }}
                                                            Based at
                                                        </v-chip>
                                                    </span>
                                                </span>
                                            </template>
                                            <span
                                                style="display:inline-block ; width:100px"
                                            >
                                                <span
                                                    class="d-block mx-1 my-1"
                                                    v-for="(item,
                                                    index) in $store.state
                                                        .employees.based_ats"
                                                    :key="index"
                                                >
                                                    {{ item }}
                                                </span>
                                            </span>
                                        </v-tooltip>
                                    </span>
                                </transition>

                                <br />

                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-bind="attrs" v-on="on">
                                            <span class="main-header">
                                                <v-chip
                                                    small
                                                    class="ma-1"
                                                    dark
                                                    label
                                                    color="#6cd7b4"
                                                >
                                                    {{
                                                        $store.getters[
                                                            'employees/getTotalSalaries'
                                                        ]
                                                    }}
                                                    $
                                                </v-chip>
                                            </span>
                                        </span>
                                    </template>
                                    <span>
                                        Employees salaries
                                    </span>
                                </v-tooltip>

                                <span class="header"> + </span>

                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-bind="attrs" v-on="on">
                                            <span class="main-header">
                                                <v-chip
                                                    small
                                                    class="ma-1"
                                                    dark
                                                    label
                                                    color="#c7d76c"
                                                >
                                                    {{
                                                        $store.getters[
                                                            'employees/getTotalExpenses'
                                                        ]
                                                    }}
                                                    $
                                                </v-chip>
                                            </span>
                                        </span>
                                    </template>
                                    <span>
                                        Employees Expenses
                                    </span>
                                </v-tooltip>

                                <span class="header"> + </span>

                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-bind="attrs" v-on="on">
                                            <span class="main-header">
                                                <v-chip
                                                    small
                                                    class="ma-1"
                                                    dark
                                                    label
                                                    color="#ff9800"
                                                >
                                                    {{
                                                        $store.getters[
                                                            'employees/getTotalDeductions'
                                                        ]
                                                    }}
                                                    $
                                                </v-chip>
                                            </span>
                                        </span>
                                    </template>
                                    <span>
                                        Employees Deductions And Salary Paymenys
                                    </span>
                                </v-tooltip>

                                <span class="header">
                                    =

                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <span class="header">
                                                    {{
                                                        $store.getters[
                                                            'employees/getTotal'
                                                        ]
                                                    }}$
                                                </span>
                                            </span>
                                        </template>
                                        <span>
                                            Total
                                        </span>
                                    </v-tooltip>
                                </span>
                            </span>
                        </span>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-data-table
                            light
                            class="elevation-3"
                            :headers="headers"
                            :items="
                                $store.getters['employees/filteredEmployees']
                            "
                            :items-per-page="10"
                            item-key="item.id"
                            mobile-breakpoint="1300"
                        >
                            <!-- headers -->
                            <template v-slot:header.first_name="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .first_name
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .first_name
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.first_name =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.last_name="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .last_name
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees.last_name
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.last_name =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.nationality="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .nationality
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees
                                                    .nationality
                                            "
                                            :items="
                                                $store.state.employees
                                                    .nationalities
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.nationality =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.local_mobile_number="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .local_mobile_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .local_mobile_number
                                            "
                                            class="pa-4"
                                            type="number"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.local_mobile_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.passport_number="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .passport_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .passport_number
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.passport_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.local_number_number="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .local_number_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .local_number_number
                                            "
                                            class="pa-4"
                                            type="number"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.local_number_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.emergency_number="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .emergency_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .emergency_number
                                            "
                                            class="pa-4"
                                            type="number"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.emergency_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.residency_number="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .residency_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .residency_number
                                            "
                                            class="pa-4"
                                            type="number"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.residency_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.emergency_contact_name="{
                                    header
                                }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .emergency_contact_name
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .emergency_contact_name
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.emergency_contact_name =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.labour_contract="{ header }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .labour_contract
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .labour_contract
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.labour_contract =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.health_number="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .health_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .health_number
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.health_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.employee_type="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .employee_type
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees
                                                    .employee_type
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees
                                                    .employee_types
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.employee_type =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.gender="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .gender
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees.gender
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees.genders
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.gender =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.based_at="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .based_at
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees.based_at
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees.based_ats
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.based_at =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.based_at_current_status="{
                                    header
                                }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .based_at_current_status
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees
                                                    .based_at_current_status
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees
                                                    .based_at_current_statuss
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.based_at_current_status =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template v-slot:header.position="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .position
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees.position
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees.positions
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.position =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>

                            <template
                                v-slot:header.position_branch_number="{
                                    header
                                }"
                            >
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .position_branch_number
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-select
                                            v-model="
                                                $store.state.employees
                                                    .position_branch_number
                                            "
                                            class="pa-4"
                                            type="text"
                                            label="Enter the search term"
                                            :items="
                                                $store.state.employees
                                                    .position_branch_numbers
                                            "
                                        ></v-select>
                                        <v-btn
                                            @click="
                                                $store.state.employees.position_branch_number =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template>
                            <!--
                            <template v-slot:header.total_salary="{ header }">
                                {{ header.text }}
                                <v-menu
                                    offset-y
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon
                                                small
                                                :color="
                                                    $store.state.employees
                                                        .total_salary
                                                        ? 'primary'
                                                        : ''
                                                "
                                            >
                                                mdi-filter
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <div
                                        style="background-color: white; width: 280px"
                                    >
                                        <v-text-field
                                            v-model="
                                                $store.state.employees
                                                    .total_salary
                                            "
                                            class="pa-4"
                                            type="number"
                                            label="Enter the search term"
                                        ></v-text-field>
                                        <v-btn
                                            @click="
                                                $store.state.employees.total_salary =
                                                    ''
                                            "
                                            small
                                            text
                                            color="primary"
                                            class="ml-2 mb-2"
                                            >Clean</v-btn
                                        >
                                    </div>
                                </v-menu>
                            </template> -->

                            <!-- items  -->

                            <template v-slot:item.first_name="{ item }">
                                <td class="">
                                    <span> {{ item.first_name }} </span>
                                </td>
                            </template>

                            <template v-slot:item.total_salary="{ item }">
                                <td class="pt-2 pb-2">
                                    <div>
                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{
                                                    on,
                                                    attrs
                                                }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    {{
                                                        $store.getters[
                                                            'employees/recordTotal'
                                                        ](item)
                                                    }}$
                                                </span>
                                            </template>
                                            <span>
                                                Total
                                            </span>
                                        </v-tooltip>

                                        <br />

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{
                                                    on,
                                                    attrs
                                                }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    {{ item.total_salary }}$
                                                </span>
                                            </template>
                                            <span>
                                                Salary
                                            </span>
                                        </v-tooltip>
                                        +

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{
                                                    on,
                                                    attrs
                                                }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    {{
                                                        item.expenses[0].total
                                                    }}$
                                                </span>
                                            </template>
                                            <span>
                                                Expenses
                                            </span>
                                        </v-tooltip>
                                        +

                                        <v-tooltip top>
                                            <template
                                                v-slot:activator="{
                                                    on,
                                                    attrs
                                                }"
                                            >
                                                <span v-bind="attrs" v-on="on">
                                                    {{
                                                        $store.getters[
                                                            'employees/recordDeductionsTotal'
                                                        ](item)
                                                    }}$
                                                </span>
                                            </template>
                                            <span>
                                                Deductions
                                            </span>
                                        </v-tooltip>
                                    </div>
                                </td>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <!-- actions -->
                                <td class="paragraph">
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{
                                                on,
                                                attrs
                                            }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <v-icon
                                                    @click="
                                                        $store.commit(
                                                            'employees/editItem',
                                                            item
                                                        )
                                                    "
                                                    class="  mr-2 edit-icon"
                                                >
                                                    mdi-pencil
                                                </v-icon>
                                            </span>
                                        </template>
                                        <span>
                                            edit user
                                        </span>
                                    </v-tooltip>

                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{
                                                on,
                                                attrs
                                            }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <v-icon
                                                    @click="
                                                        $store.commit(
                                                            'employees/showDeleteSnackbar',
                                                            item
                                                        )
                                                    "
                                                    class="  delete-icon"
                                                >
                                                    mdi-delete
                                                </v-icon>
                                            </span>
                                        </template>
                                        <span>
                                            delete user
                                        </span>
                                    </v-tooltip>

                                    <!-- actions -->
                                </td>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </div>

            <employees-components />
        </div>
    </div>
</template>

<script>
import employeesComponents from './employeesComponents.vue'
export default {
    name: 'employees',

    components: {
        employeesComponents
    },

    data: () => ({
        dataButtons: true,
        overlay: true,
        allHeaders: [
            {
                text: 'First name',
                sortable: true,
                value: 'first_name',
                id: 0,
                disabled: true
            },

            {
                text: 'Last name',
                sortable: true,
                value: 'last_name',
                id: 1,
                disabled: true
            },

            {
                text: 'Employee type',
                sortable: true,
                value: 'employee_type',
                id: 2
            },

            {
                text: 'Based At',
                sortable: true,
                value: 'based_at',
                id: 3
            },

            {
                text: 'Based At Current Status',
                sortable: true,
                value: 'based_at_current_status',
                id: 4
            },

            {
                text: 'Position Branch',
                sortable: true,
                value: 'position_branch_number',
                id: 5
            },

            {
                text: 'Nationality',
                sortable: true,
                value: 'nationality',
                id: 6
            },

            {
                text: 'Gender',
                sortable: true,
                value: 'gender',
                id: 7
            },

            {
                text: 'Local Mobile Number',
                sortable: true,
                value: 'local_mobile_number',
                id: 8
            },

            {
                text: 'Emergency Number',
                sortable: true,
                value: 'emergency_number',
                id: 9
            },

            {
                text: 'Emergency Contact Name',
                sortable: true,
                value: 'emergency_contact_name',
                id: 10
            },

            {
                text: 'Position',
                sortable: true,
                value: 'position',
                id: 11
            },

            {
                text: 'Position',
                sortable: true,
                value: 'position',
                id: 12
            },

            {
                text: 'Passport Number',
                sortable: true,
                value: 'passport_number',
                id: 13
            },

            {
                text: 'Residency Number',
                sortable: true,
                value: 'residency_number',
                id: 14
            },

            {
                text: 'Health Number ',
                sortable: true,
                value: 'health_number',
                id: 15
            },

            {
                text: 'Labour Contact ',
                sortable: true,
                value: 'labour_contract',
                id: 16
            },

            {
                text: 'Salary && Deductions && expenses',
                sortable: true,
                value: 'total_salary',
                id: 17
            },

            {
                text: 'Actions',
                value: 'actions',
                sortable: false,
                id: 50,
                disabled: true
            }
        ],

        headers: [
            {
                text: 'First name',
                sortable: true,
                value: 'first_name',
                id: 0,
                disabled: true
            },

            {
                text: 'Last name',
                sortable: true,
                value: 'last_name',
                id: 1,
                disabled: true
            },

            {
                text: 'Employee type',
                sortable: true,
                value: 'employee_type',
                id: 2
            },

            {
                text: 'Based At',
                sortable: true,
                value: 'based_at',
                id: 3
            },

            // {
            //     text: 'Based At Current Status',
            //     sortable: true,
            //     value: 'based_at_current_status',
            //     id: 4
            // },

            // {
            //     text: 'Position Branch',
            //     sortable: true,
            //     value: 'position_branch_number',
            //     id: 5
            // },

            {
                text: 'Salary && Deductions && expenses',
                sortable: true,
                value: 'total_salary',
                id: 6
            },

            {
                text: 'Actions',
                value: 'actions',
                sortable: false,
                id: 50,
                disabled: true
            }
        ]
    }),

    mounted () {
        this.currentHeaders = this.headers
    },

    methods: {
        sortHeaders () {
            let headers = this.headers

            let actionsNumber = headers.findIndex(function (item) {
                return item.id == 50
            })

            if (actionsNumber) {
                let actionsObject = {}
                actionsObject = Object.assign({}, headers[actionsNumber])
                headers.splice(actionsNumber, 1)
                headers.push(actionsObject)
            }
        }
    },

    watch: {
        headers: function (newValue, oldValue) {
            console.log(
                `headers changed from${oldValue.length} to ${newValue.length}`
            )
            if (oldValue.length < newValue.length) {
                this.sortHeaders()
            }
        }
    }
}
</script>

<style lang="scss">
.theme--light.v-list-item--disabled {
    display: none !important;
}

.opacity-0 {
    opacity: 0;
}
</style>
