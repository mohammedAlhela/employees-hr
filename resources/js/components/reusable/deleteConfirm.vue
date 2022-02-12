<template>
    <div>


         <transition name="fade">
        <div class="delete-confirm" v-show="deleteConfirm">
                <span> do you want to delete this {{ user }} ?  </span>
                <v-btn
                    class="confirm-button"
                    text

                    @click="deleteData()"
                >
                    Delete
                </v-btn>

                <v-btn
                    class="cancel-button"
                    text

                    @click="close()"
                >
                    Cancel
                </v-btn>
            </div>
      </transition>





    </div>
</template>

<script>
export default {
    name: "deleteConfirm",

    props: ["deleteConfirm", "user"],
    data: () => ({
        attrs: null
    }),

    methods: {
        close() {
            this.$emit("close");
        },

        deleteData() {
            this.$emit("deleteData");
        }
    }
};
</script>
