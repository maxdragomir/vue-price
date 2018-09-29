<template>

    <nav class="navbar is-fixed-top is-small is-nav" v-on-clickaway ="away">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item navbar-logo" to="/">
                    PriceComparer
                </router-link>
                <a role="button" class="navbar-burger" data-target="main-nav" :class="{ 'is-active': mobnav }" @click="mobnav = !mobnav;">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div id="main-nav" class="navbar-menu" :class="{ 'is-active': mobnav }">
                <div class="navbar-end">
                    <router-link active-class="is-active" class="navbar-item" to="/" exact @click.native="closeNav">
                        Home
                    </router-link>
                    <router-link active-class="is-active" class="navbar-item" to="/categories" @click.native="closeNav">
                        Categories
                    </router-link>
                    <router-link active-class="is-active" class="navbar-item" to="/about" @click.native="closeNav">
                        About
                    </router-link>
                </div>
            </div>
        </div>
    </nav>

</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        name: "Navigation",
        mixins: [ clickaway ],

        data() {
            return {
                mobnav: false,
            }
        },
        methods: {
            closeNav: function() {
                this.mobnav = false
            },
            away: function() {
                this.mobnav = false
            },
        }
    }
</script>

<style scoped>

</style>