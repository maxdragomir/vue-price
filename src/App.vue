<template>
    <div id="app" class="wrapper-container">
        <div is="navigation"></div>
        <div is="router-view" class="is-content"></div>
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