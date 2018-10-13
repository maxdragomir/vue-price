<template>
    <section>
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep" v-on:close="$emit('close')">
            <ApolloQuery :query="require('@/apollo/product.gql')" :variables="{ id: productId }">
                <template slot-scope="{ result: { loading, data } }">
                    <div v-if="loading">
                        Loading
                    </div>
                    <div v-else-if="data">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/static/img/placeholder-1280x960.png" alt="Image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="/static/img/placeholder-1280x960.png" alt="Image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{{ data.product.name }}</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>

                                <div class="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                    <a>#css</a> <a>#responsive</a>
                                    <br>
                                    <small>11:09 PM - 1 Jan 2016</small>
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
    </section>
</template>

<script>
    export default {
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
        }
    }
</script>