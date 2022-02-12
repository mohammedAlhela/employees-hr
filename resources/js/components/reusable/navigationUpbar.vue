<template>
    <div class="navigation-upbar">
        <div class="float-left">
            <v-progress-circular
                v-if="!$store.state.authentication.user.user.username"
                indeterminate
                color="primary"
            ></v-progress-circular>

            <div v-else>
                <img
                    @click="$store.commit('authentication/user/openDialog')"
                    class="image"
                    :src="$store.getters['authentication/user/getImage']"
                    alt="user image"
                />

                <span
                    class="header ml-2 pointer"
                    @click="$store.commit('authentication/user/openDialog')"
                >
                    {{ $store.state.authentication.user.user.username }}
                </span>
            </div>
        </div>

        <div class="float-right">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                        <span class="main-header">
                            <v-icon
                                v-show="showHomeButton()"
                                light
                                class=" icon  mr-3"
                                @click="$store.commit('goToHome')"
                            >
                                mdi-home
                            </v-icon>
                        </span>
                    </span>
                </template>
                <span>
                    Go to home page
                </span>
            </v-tooltip>
            <!--
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                        <span class="main-header">
                            <v-icon
                                light
                                class=" icon  mr-3"
                                @click="
                                    $store.commit(
                                        'authentication/user/openDialog'
                                    )
                                "
                            >
                                mdi-account
                            </v-icon>
                        </span>
                    </span>
                </template>
                <span>
                    Change account data
                </span>
            </v-tooltip> -->

            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                        <span class="main-header">
                            <v-icon
                                light
                                class="icon mr-3"
                                @click="logoutConfirm = true"
                            >
                                mdi-logout
                            </v-icon>
                        </span>
                    </span>
                </template>
                <span>
                    Logout
                </span>
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                        <span class="main-header">
                            <v-icon light class="icon">
                                mdi-eye
                            </v-icon>
                        </span>
                    </span>
                </template>
                <span style="display:inline-block">
                    <span
                        v-if="
                            !$store.state.authentication.user.permissions.length
                        "
                    >
                        No Permissions Added yet
                    </span>

                    <span v-else>
                        <span
                            class="d-block mx-1 my-1"
                            v-for="(item, index) in $store.state.authentication
                                .user.permissions"
                            :key="index"
                        >
                            {{ item.name }}
                        </span>
                    </span>
                </span>
            </v-tooltip>
        </div>

        <div class="clearing"></div>

        <!-- logout confirm -->

        <transition name="fade">
            <div class="delete-confirm" v-show="logoutConfirm">
                <span> Are you sure you want to logout </span>
                <v-btn
                    class="confirm-button"
                    text
                    @click="$store.dispatch('authentication/user/logout')"
                >
                    Logout
                </v-btn>

                <v-btn
                    class="cancel-button"
                    text
                    @click="logoutConfirm = false"
                >
                    Cancel
                </v-btn>
            </div>
        </transition>

        <!-- logout confirm -->

        <!-- data dialog -->
        <v-dialog
            v-model="$store.state.authentication.user.dialog"
            width="1000"
            persistent
        >
            <v-card>
                <v-card-title class="aliceblue-background  main-header">
                    Change user Data
                </v-card-title>

                <v-card-text>
                    <v-form
                        class="form mt-5"
                        @submit.prevent="update()"
                        enctype="multipart/form-data"
                        lazy-validation
                        ref="form"
                    >
                        <v-row class="fields-container">
                            <!-- send images form -->
                            <v-col cols="12">
                                <span class="image-error-paragraph">
                                    Maximum allowed file size is 1000 KB.
                                    recomended dimensions are 600 width and 600
                                    height
                                </span>

                                <div class="upload-image-container">
                                    <div class="image-holder">
                                        <img
                                            :src="
                                                $store.getters[
                                                    'authentication/user/getImage'
                                                ]
                                            "
                                            class="image"
                                        />
                                    </div>

                                    <div class="upload-holder">
                                        <label
                                            for="file-upload"
                                            class="custom-file-upload"
                                        >
                                            <v-icon class="icon">
                                                mdi-pencil
                                            </v-icon>
                                        </label>
                                        <input
                                            class="hidden"
                                            id="file-upload"
                                            type="file"
                                            @change="imageSelected"
                                        />
                                        <span class="d-inline-block ml-2 ">
                                            <span
                                                class="red-paragraph"
                                                v-if="
                                                    $store.state.authentication.user.errors.hasOwnProperty(
                                                        'image'
                                                    )
                                                "
                                            >
                                                {{
                                                    $store.state.authentication
                                                        .user.errors.image[0]
                                                }}
                                            </span>

                                            <span
                                                class="paragraph"
                                                v-else-if="
                                                    $store.state.authentication
                                                        .user.user.image_name
                                                "
                                            >
                                                {{
                                                    $store.state.authentication
                                                        .user.user.image_name
                                                }}
                                            </span>

                                            <span
                                                class="paragraph"
                                                v-else-if="
                                                    !$store.state.authentication
                                                        .user.image.preview
                                                "
                                            >
                                                No image selected
                                            </span>

                                            <span class="paragraph" v-else>
                                                {{
                                                    $store.state.authentication
                                                        .user.image.name
                                                }}
                                            </span>
                                        </span>
                                    </div>

                                    <div class="clearing"></div>
                                </div>
                            </v-col>
                            <!-- send images form -->

                            <v-col cols="12" class="py-0">
                                <span class="input-header">
                                    Username
                                </span>
                                <span class="validated-field">
                                    <v-icon class="validation-icon">
                                        mdi-star
                                    </v-icon>
                                </span>

                                <v-text-field
                                    required
                                    :rules="
                                        $store.state.authentication.user.errors
                                            .username
                                    "
                                    solo
                                    dense
                                    class="textfield"
                                    v-model="
                                        $store.state.authentication.user.user
                                            .username
                                    "
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" class="py-0">
                                <span class="input-header">
                                    Password
                                </span>

                                <v-text-field
                                    class="textfield"
                                    autocomplete="new-password"
                                    append-icon="mdi-eye"
                                    :type="
                                        $store.state.authentication.user
                                            .passwordType
                                    "
                                    @click:append="
                                        $store.commit(
                                            'authentication/user/toggleType'
                                        )
                                    "
                                    :rules="
                                        $store.state.authentication.user.errors
                                            .password
                                    "
                                    solo
                                    dense
                                    v-model="
                                        $store.state.authentication.user.user
                                            .password
                                    "
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="text-right pr-3">
                                <v-btn color="primary" text type="submit">
                                    Update
                                </v-btn>

                                <v-btn
                                    color="primary"
                                    text
                                    @click="
                                        $store.commit(
                                            'authentication/user/resetData'
                                        )
                                    "
                                >
                                    Close
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- date dialog -->

        <div class="clearing"></div>
    </div>
</template>

<script>
export default {
    name: 'NavigationAppbar',

    created () {
        if (localStorage.getItem('token')) {
            window.axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${localStorage.getItem('token')}`
        }
    },

    mounted () {
        this.$store.dispatch('authentication/user/fetch')
        this.$store.dispatch('employees/fetch')
    },

    methods: {
        update () {
            this.$refs.form.validate()
            this.$store.dispatch('authentication/user/update')
        },

        imageSelected (element) {
            this.$store.commit('authentication/user/imageSelected', element)
        },

        showHomeButton () {
            return this.$router.currentRoute.name != 'home'
        }
    },

    data: () => ({
        logoutConfirm: false
    })
}
</script>
