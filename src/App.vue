<template>
    <div id="app" class="wrapper-container">
        <div is="Navigation"></div>
        <transition name="fade">
            <div is="router-view" class="is-content" v-on:show-product-modal="showProductModal"></div>
        </transition>
        <div is="ProductModal" v-bind:productId="modalProductId" v-on:close="productModalClosed"></div>
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
        data () {
            return {
                showModal: false,
                modalProductId: null
            }
        },
        components: {
            Navigation,
            Footer,
            Loader,
            ProductModal
        },
        methods: {
            showProductModal (productId) {
                this.modalProductId = productId;
            },
            productModalClosed () {
                this.modalProductId = null;
            }
        }
    }




</script>