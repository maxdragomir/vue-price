<template>
        <b-modal :active.sync="isCardModalActive" v-on:close="$emit('close')">
            <ApolloQuery :query="require('@/apollo/product.gql')" :variables="{ id: productId }">
                <template slot-scope="{ result: { loading, data } }">
                    <div v-if="loading">
                        Loading
                    </div>
                    <div v-else-if="data">
                        <div class="product-modal-card">
                            <div class="product-info">
                                <div class="modal_left">
                                    <!--<img :src="data.product.mainPhoto">-->
                                    <img v-if="data.product.photos.length === 1" v-bind:src="data.product.photos[0]">
                                    <div v-else>
                                        <vueper-slides class="no-shadow" autoplay :dragging-distance="70" :bullets-outside="true">
                                            <v-icon slot="arrowLeft" color="white" large><i class="fa fa-arrow-left left" aria-hidden="true"></i></v-icon>
                                            <v-icon slot="arrowRight" color="white" large><i class="fa fa-arrow-right right" aria-hidden="true"></i></v-icon>
                                            <vueper-slide v-for="(photo, i) in data.product.photos" :key="i" :image="photo"></vueper-slide>
                                        </vueper-slides>
                                    </div>
                                </div>
                                <div class="modal_right">
                                    <div class="modal_header">
                                        <span>categories</span>
                                        <h3>{{ data.product.name }}</h3>
                                    </div>

                                    <div class="modal_content">
                                        <div class="modal_row" v-for="price in data.product.prices" v-bind:key="price.shop.name">
                                            <div class="name">{{price.shop.name}}</div>
                                            <div class="price">{{price.price}} грн</div>
                                        </div>
                                    </div>

                                    <div class="modal_footer">
                                        <a href="javascript:;" class="button is-custom is-outlined" title="Statistics" @click.native="openStat">
                                            <span class="icon is-small">
                                                <i class="fa fa-chart-line"></i>
                                            </span>
                                            <span class="text">Statistics</span>
                                        </a>
                                        <a href="javascript:;" class="button is-custom" title="Add to cart">
                                            <span class="icon is-small">
                                                <i class="fa fa-cart-plus"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        Can't get product :(
                    </div>
                </template>
            </ApolloQuery>
        </b-modal>
</template>

<script>
    import { VueperSlides, VueperSlide } from 'vueperslides'

    export default {
        components: { VueperSlides, VueperSlide },
        data () {
            return {
            }
        },
        props: {
            productId: String
        },
        computed: {
            isCardModalActive: {
                get () {
                    return this.productId !== null;
                },
                set () {

                }
            }
        },
        methods: {

        }
    }
</script>