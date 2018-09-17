<template>
    <div class="container">
        <nav class="navbar is-transparent">
            <div class="navbar-brand">
                <router-link active-class="is-active" class="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo.png"
                         alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
                </router-link>
                <div class="navbar-burger burger" data-target="main-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="main-nav" class="navbar-menu">
                <div class="navbar-start">
                    <router-link active-class="is-active" class="navbar-item" to="/">
                        Home
                    </router-link>
                    <router-link active-class="is-active" class="navbar-item" to="/categories">
                        Categories
                    </router-link>
                </div>

                <div class="navbar-end">
                    <router-link active-class="is-active" class="navbar-item" to="/about">
                        About
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>

</style>