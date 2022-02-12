<template>
    <div>
        <div class="login-container">
            <v-overlay :value="overlay" opacity=".7">
                <div class="login-holder">
                    <h3 class="login-title">Login page</h3>

                    <div class="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            v-model="
                                $store.state.authentication.login.form.username
                            "
                        />
                    </div>

                    <div class="input-group">
                        <label>Password</label>
                        <input
                            autocomplete="new-password"
                            class="login-password-field"
                            :type="type"
                            v-model="
                                $store.state.authentication.login.form.password
                            "
                        />

                        <v-icon
                            class="login-password-icon"
                            @click="changeType()"
                        >
                            mdi-eye
                        </v-icon>
                    </div>

                    <button
                        type="submit"
                        class="login-button "
                        @click="$store.dispatch('authentication/login/login')"
                    >
                        Sign In
                    </button>
                </div>
            </v-overlay>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data: () => ({
        overlay: true,
        type: 'password'
    }),

    methods: {
        changeType () {
            this.type == 'password'
                ? (this.type = 'text')
                : (this.type = 'password')
        }
    }
}
</script>
