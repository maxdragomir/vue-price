<template>
    <div id="app" class="wrapper-container">
        <Navigation></Navigation>
        <transition name="fade">
            <div is="router-view" class="is-content" v-on:show-product-modal="showProductModal"></div>
        </transition>
        <product-modal v-bind:productId="modalProductId" v-on:close="productModalClosed"></product-modal>
        <Footer></Footer>
        <Loader></Loader>
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