<template>
    <div>

                    <delete-confirm
                        :deleteConfirm="$store.state.users.deleteSnackbar"
                        @close="$store.state.users.deleteSnackbar = false"
                        @deleteData="$store.dispatch('users/delete')"
                        user="User"
                    />


                    <v-dialog
                        v-model="$store.state.users.dialog"
                        width="1000"
                        persistent
                    >
                        <v-card>
                            <v-card-title
                                class="aliceblue-background  main-header"
                            >
                                {{ $store.getters["users/formTitle"] }}
                            </v-card-title>

                            <v-card-text>
                                <v-form
                                    class="form mt-5"
                                    @submit.prevent="save()"
                                    enctype="multipart/form-data"
                                    lazy-validation
                                    ref="form"
                                >
                                    <v-row class="fields-container">
                                        <!-- send images form -->
                                        <v-col cols="12">
                                            <span class="image-error-paragraph">
                                                Maximum allowed file size is
                                                1000 KB. recomended dimensions
                                                are 600 width and 600 height
                                            </span>

                                            <div class="upload-image-container">
                                                <div class="image-holder">
                                                    <img
                                                        :src="
                                                            $store.getters[
                                                                'users/getImage'
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
                                                    <span
                                                        class="d-inline-block ml-2 "
                                                    >
                                                        <span
                                                            class="red-paragraph"
                                                            v-if="
                                                                $store.state.users.errors.hasOwnProperty(
                                                                    'image'
                                                                )
                                                            "
                                                        >
                                                            {{
                                                                $store.state
                                                                    .users
                                                                    .errors
                                                                    .image[0]
                                                            }}
                                                        </span>

                                                        <span
                                                            class="paragraph"
                                                            v-else-if="
                                                                $store.state
                                                                    .users
                                                                    .editedItem
                                                                    .image_name
                                                            "
                                                        >
                                                            {{
                                                                $store.state
                                                                    .users
                                                                    .editedItem
                                                                    .image_name
                                                            }}
                                                        </span>

                                                        <span
                                                            class="paragraph"
                                                            v-else-if="
                                                                !$store.state
                                                                    .users.image
                                                                    .preview
                                                            "
                                                        >
                                                            No image selected
                                                        </span>

                                                        <span
                                                            class="paragraph"
                                                            v-else
                                                        >
                                                            {{
                                                                $store.state
                                                                    .users.image
                                                                    .name
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
                                                    $store.state.users.errors
                                                        .username
                                                "
                                                solo
                                                dense
                                                class="textfield"
                                                v-model="
                                                    $store.state.users
                                                        .editedItem.username
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
                                                    $store.state.users
                                                        .passwordType
                                                "
                                                @click:append="
                                                    $store.commit(
                                                        'users/toggleType',
                                                        'password'
                                                    )
                                                "
                                                :rules="
                                                    $store.state.users.errors
                                                        .password
                                                "
                                                solo
                                                dense
                                                v-model="
                                                        $store.state.users
                                                        .editedItem.password
                                                "
                                            >
                                            </v-text-field>
                                        </v-col>





                                        <v-col
                                            cols="12"
                                            class="py-0"
                                            v-if="
                                                $store.state.users
                                                    .editedIndex === -1
                                            "
                                        >
                                            <span class="input-header">
                                                Password Confirmation
                                            </span>

                                            <v-text-field
                                                class="textfield"
                                                append-icon="mdi-eye"
                                                :type="
                                                    $store.state.users
                                                        .passwordConfirmationType
                                                "
                                                @click:append="
                                                    $store.commit(
                                                        'users/toggleType',
                                                        'password_confirmation'
                                                    )
                                                "
                                                :rules="
                                                    $store.state.users.errors
                                                        .password_confirmation
                                                "
                                                solo
                                                dense
                                                v-model="
                                                    $store.state.users
                                                        .editedItem
                                                        .password_confirmation
                                                "
                                            >
                                            </v-text-field>
                                        </v-col>



                                        <v-col

                                            class="permission-item"
                                            v-for="(moduel, index) in $store
                                                .state.users.moduels"
                                            :key="index"
                                            :cols="getColmn(moduel)"
                                        >
                                            <v-checkbox
                                                 v-if = "$store.state.authentication.user.user.id != $store.state.users.editedIndex"
                                                :label="moduel.title"
                                                color="blue"
                                                hide-details
                                                v-model="moduel.value"
                                            >
                                            </v-checkbox>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col
                                            cols="12"
                                            class="text-right pr-3"
                                        >
                                            <v-btn
                                                color="primary"
                                                text
                                                type="submit"
                                            >
                                                Save
                                            </v-btn>

                                            <v-btn
                                                color="primary"
                                                text
                                                @click="
                                                    $store.commit(
                                                        'users/resetData'
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
    </div>
</template>

<script>
export default {
    name: "UsersComponents",



    methods: {

        save() {
            this.$refs.form.validate();
            this.$store.dispatch("users/save");
        },

        getColmn(permission) {
            return permission.moduel ===
                "employees_deduction_bouns_salariesPayments"
                ? 12
                : 6;
        },

        imageSelected(element) {
            this.$store.commit("users/imageSelected", element);
        }
    },

};
</script>
