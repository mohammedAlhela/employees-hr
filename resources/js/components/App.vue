<template>



<v-app>



<router-view>

</router-view>
</v-app>


</template>

<script>

export default {

    name: 'App',

    watch: {
        $route: {
            immediate: true,
            handler (to, from) {
                document.title = to.meta.title || 'HR Program'
            }
        }
    },

}
</script>

<style lang="scss"></style>
