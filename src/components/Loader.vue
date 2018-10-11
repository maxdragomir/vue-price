<template>

    <div>
        <transition name="load">
            <div class="loading" v-show="loading">
                <div class="loader"></div>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        name: "Loader",
        data() {
            return {
                loading: true,
            }
        },
        mounted(){
            this.loading = false
        }
    }
</script>

<style scoped>

</style>