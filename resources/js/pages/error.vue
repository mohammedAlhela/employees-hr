<template>
    <v-container fluid class="error-page">
        <v-row class="logo-wrapper">
            <span class="logo-title">Invalid Url</span>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="8">
                <div class="card">
                    <span class="error-logo">404</span>
                    <p class="error-text">
                        Oops. Looks like the page you're looking for no longer
                        exists
                    </p>
                    <p class="error-subtext">
                        But we're here to bring you back to safety
                    </p>



                    <v-btn

                        @click="goToHome()"
                        class="text-capitalize"
                        dark
                        x-large
                        to="dashboard"
                    >
                        Back to Home
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<style lang="scss">
.error-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo-wrapper {
        align-items: center;
        margin-bottom: 30px;

        .logo-title {
            font-size: 32px;
            font-weight: 500;
            color: white;
        }
    }
    .card {
        padding: 0 50px;
        background-color: white;
        border-radius: 4px;
        height: 680px;

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        .error-logo {
            color: aliceblue;
            font-size: 148px;
            font-weight: 600;
        }
        .error-text {
            text-align: center;
        }
        .error-subtext {
            text-align: center;
        }
    }
}
</style>

<script>
export default {
    created() {
        this.$store.state.authentication.noErrorPage = false;
    },


    methods : {
        goToHome () {
            this.$router.push ( {name : "home"})
        }
    }
};
</script>
