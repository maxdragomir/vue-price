<template>
    <div id="app" class="wrapper-container">
        <div is="navigation"></div>
        <transition name="fade">
            <div is="router-view" class="is-content"></div>
        </transition>
        <div is="Footer"></div>
    </div>
</template>

<script>
    import Navigation from "./components/Navigation";
    import Footer from "./components/Footer";

    export default {
        components: {
            Navigation,
            Footer
        }
    }

</script>