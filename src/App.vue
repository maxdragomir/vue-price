<template>
    <div id="app" class="wrapper-container">
        <div is="Navigation"></div>
        <transition name="fade">
            <div is="router-view" class="is-content"></div>
        </transition>
        <!--<div is="ProductModal"></div>-->
        <div is="Footer"></div>
        <div is="Loader"></div>
    </div>
</template>

<script>
    import Navigation from "./components/Navigation";
    import Footer from "./components/Footer";
    import Loader from "./components/Loader";
    import ProductModal from "./components/ProductModal";

    export default {
        components: {
            Navigation,
            Footer,
            Loader,
            ProductModal
        },
    }




</script>