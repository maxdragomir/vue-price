<template>

    <nav class="navbar is-fixed-top is-small is-nav">
        <div class="container">
            <div class="navbar-brand">
                <router-link active-class="is-active" class="navbar-item is-logo" to="/">
                    PriceComparer
                </router-link>
                <div class="navbar-burger burger" data-target="main-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="main-nav" class="navbar-menu">

                <div class="navbar-end">
                    <router-link active-class="is-active" class="navbar-item" to="/">
                        Home
                    </router-link>
                    <router-link active-class="is-active" class="navbar-item" to="/categories">
                        Categories
                    </router-link>
                    <router-link active-class="is-active" class="navbar-item" to="/about">
                        About
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>

</style>