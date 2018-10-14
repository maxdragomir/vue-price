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
                                    <vueper-slides class="no-shadow" autoplay :dragging-distance="70">
                                    <v-icon slot="arrowLeft" color="white" large><i class="fa fa-arrow-left left" aria-hidden="true"></i></v-icon>
                                    <v-icon slot="arrowRight" color="white" large><i class="fa fa-arrow-right right" aria-hidden="true"></i></v-icon>
                                    <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :content="slide.content"></vueper-slide>
                                    </vueper-slides>
                                </div>
                                <div class="modal_right">
                                    <div class="modal_header">
                                        <span>categories</span>
                                        <h3>{{ data.product.name }}</h3>
                                    </div>

                                    <div class="modal_content">
                                        <div class="modal_row">
                                            <div class="name novus">NOVUS</div>
                                            <div class="price">123 грн</div>
                                        </div>
                                        <div class="modal_row">
                                            <div class="name metro">METRO</div>
                                            <div class="price">231 грн</div>
                                        </div>
                                        <div class="modal_row">
                                            <div class="name auchan">AUCHAN</div>
                                            <div class="price">312 грн</div>
                                        </div>
                                    </div>

                                    <div class="modal_footer">
                                        <a href="javascript:;" class="button is-custom is-outlined" title="Statistics" @click.native="openStat">
                                            <span class="icon is-small">
                                                <i class="fa fa-chart-line"></i>
                                            </span>
                                        </a>
                                        <a href="javascript:;" class="button is-custom" title="Add to cart">
                                            <span class="icon is-small">
                                                <i class="fa fa-cart-plus"></i>
                                            </span>
                                            <span class="text">Add to cart</span>
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
                slides: [
                    {
                        title: 'Slide #1',
                        content: 'Slide content.',
                        image: ''
                    },
                    {
                        title: 'Slide #2',
                        content: 'Slide content.',
                        image: ''
                    },
                ]
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