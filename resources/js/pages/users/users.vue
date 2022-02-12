<template>
    <div>
        <div class="users-container">
            <v-overlay :value="overlay" opacity=".7">
                <div class="users-holder">
                    <navigation-upbar />

                    <div class="users-sub-holder">
                        <v-row>
                            <v-col cols="6 pt-5">
                                <span class="items-number">
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span v-bind="attrs" v-on="on">
                                                <span class="main-header">
                                                    {{
                                                        $store.getters[
                                                            "users/filteredUsers"
                                                        ].length
                                                    }}
                                                    Users
                                                </span>
                                            </span>
                                        </template>
                                        <span> Users number</span>
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
                                                            $store.state.users
                                                                .permissions
                                                                .length
                                                        }}
                                                        Permissions
                                                    </v-chip>
                                                </span>
                                            </span>
                                        </template>
                                        <span style="display:inline-block">
                                            <span
                                                class="d-block mx-1 my-1"
                                                v-for="(item, index) in $store
                                                    .state.users.permissions"
                                                :key="index"
                                            >
                                                {{ item }}
                                            </span>
                                        </span>
                                    </v-tooltip>
                                </span>
                            </v-col>

                            <v-col cols="6" class="text-right">
                                <v-btn
                                    dark
                                    class="mx-2"
                                    fab
                                    small
                                    color="orange"
                                    @click="
                                        $store.commit('users/downloadAllExcel')
                                    "
                                >
                                    <v-icon class="white-icon" dark>
                                        mdi-download
                                    </v-icon>
                                </v-btn>

                                <v-btn
                                    dark
                                    class="mx-2"
                                    fab
                                    small
                                    color="green"
                                    @click="$store.commit('users/openDialog')"
                                >
                                    <v-icon class="white-icon" dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-data-table
                                    light
                                    class="elevation-3"
                                    :headers="$store.state.users.headers"
                                    :items="
                                        $store.getters['users/filteredUsers']
                                    "
                                    :items-per-page="10"
                                    item-key="item.id"
                                    mobile-breakpoint="1100"
                                >
                                    <!-- headers -->
                                    <template
                                        v-slot:header.username="{ header }"
                                    >
                                        {{ header.text }}
                                        <v-menu
                                            offset-y
                                            :close-on-content-click="false"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-btn
                                                    icon
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon
                                                        small
                                                        :color="
                                                            $store.state.users
                                                                .username
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
                                                        $store.state.users
                                                            .username
                                                    "
                                                    class="pa-4"
                                                    type="text"
                                                    label="Enter the search term"
                                                ></v-text-field>
                                                <v-btn
                                                    @click="
                                                        $store.state.users.username =
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

                                    <template v-slot:header.id="{ header }">
                                        {{ header.text }}
                                        <v-menu
                                            offset-y
                                            :close-on-content-click="false"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-btn
                                                    icon
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon
                                                        small
                                                        :color="
                                                            $store.state.users
                                                                .admission
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
                                                        $store.state.users
                                                            .admission
                                                    "
                                                    class="pa-4"
                                                    type="text"
                                                    label="Enter the search term"
                                                ></v-text-field>
                                                <v-btn
                                                    @click="
                                                        $store.state.users.admission =
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
                                    <!-- headers -->

                                    <template v-slot:item.username="{ item }">
                                        <td class=" py-1">
                                            <span> {{ item.username }} </span>
                                            <br />

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
                                                            class="blue-paragraph"
                                                        >
                                                            {{
                                                                $store.getters[
                                                                    "users/lastLogin"
                                                                ](item)
                                                            }}
                                                        </span>
                                                    </span>
                                                </template>
                                                <span>
                                                    Last used at
                                                </span>
                                            </v-tooltip>
                                        </td>
                                    </template>

                                    <template v-slot:item.image="{ item }">
                                        <td class="py-2">
                                            <img
                                                class="thumb-image"
                                                :src="
                                                    item.image ||
                                                        '/images/users/user.jpg'
                                                "
                                                alt=""
                                            />
                                        </td>
                                    </template>

                                    <template
                                        v-slot:item.permissions="{ item }"
                                    >
                                        <td class="">
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
                                                        <v-icon class="icon">
                                                            mdi-eye
                                                        </v-icon>
                                                    </span>
                                                </template>
                                                <span
                                                    v-if="
                                                        item.permissions.length
                                                    "
                                                    style="display:inline-block"
                                                >
                                                    <span
                                                        class="d-block mx-1 my-1"
                                                        v-for="(item,
                                                        index) in item.permissionsNames"
                                                        :key="index"
                                                    >
                                                        {{ item }}
                                                    </span>
                                                </span>

                                                <span v-else>
                                                    No permissions added yet
                                                </span>
                                            </v-tooltip>
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
                                                    <span
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        <v-icon
                                                            @click="
                                                                $store.commit(
                                                                    'users/editItem',
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


<span        v-if = "$store.state.authentication.user.user.id != item.id">


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
                                                        <v-icon
                                                            @click="
                                                                $store.commit(
                                                                    'users/showDeleteSnackbar',
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
                                            </span>

                                            <!-- actions -->
                                        </td>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                </div>


                <users-components />
            </v-overlay>
        </div>
    </div>
</template>

<script>
import usersComponents from"./usersComponents.vue" ;
export default {
    name: "Users",

    components : {
  usersComponents
    },

    data: () => ({
        overlay: true
    }),



    mounted() {
        this.$store.dispatch("users/fetch");
    }
};
</script>
