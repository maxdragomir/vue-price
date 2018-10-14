<template>
  <div>
    <section class="hero is-medium is-header has-text-centered">
      <div class="hero-body">
          <div class="container">
              <div class="svg animated fadeInUp delay-1s">
                  <img src="../assets/img/market.svg" alt="">
              </div>
              <h1 class="title">Price Comparer</h1>
              <h2 class="subtitle">Here you can compare price for products in some shops</h2>
          </div>
      </div>
        <div class="is-home-numbers">
            <div class="container">
                <div class="columns is-gapless">
                    <div class="column is-two-thirds has-text-centered">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div><p class="title">We have:</p></div>
                            </div>
                            <div class="level-item has-text-centered is-products-stats">
                                <div>
                                    <p class="title">{{ stats.products }}</p>
                                    <p class="heading">Products</p>
                                    <div class="svg animated fadeInUp delay-1_5s">
                                        <img src="../assets/img/shopping-bag.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="title">{{ stats.categories }}</p>
                                    <p class="heading">Categories</p>
                                    <div class="svg animated fadeInUp delay-2s">
                                        <img src="../assets/img/checklist.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="title">{{ stats.shops }}</p>
                                    <p class="heading">Shops</p>
                                    <div class="svg animated fadeInUp delay-2_5s">
                                        <img src="../assets/img/shop.svg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section is-try">
      <div class="container">
          <div class="has-text-centered">
              <h1 class="title">Try it by yourself!</h1>
              <h2 class="subtitle">just start typing name of product or barcode</h2>
          </div>
          <div class="columns">
              <div class="column is-half-desktop is-offset-one-quarter-desktop">
                  <b-field class="has-t-margin-2 is-home-input">
                      <b-input v-model="searchQuery" placeholder="Name or barcode of product" icon="search"></b-input>
                  </b-field>
              </div>
          </div>
      </div>
    </section>

    <section class="section is-products has-t-padding-0 has-b-padding-5">
      <div class="container">

          <section class="searchResults" v-if="isSearchUsed">
              <ApolloQuery :query="require('@/apollo/productsSearch.gql')" :variables="{ query: searchQuery }">
                  <template slot-scope="{ result: { loading, data} }">
                      <div v-if="loading">Loading...</div>
                      <div v-else-if="data && data.productsSearch">
                          <div v-if="data.productsSearch.length">
                              <h2>We've found this products:</h2>
                              <div class="columns is-multiline is-two-thirds-mobile">
                                  <div class="column is-one-third-tablet is-one-fifth-desktop" v-for="product in data.productsSearch" :key="product.id">
                                      <ProductCard v-bind:product="product" v-on:show-product-modal="launchCardModal" />
                                  </div>
                              </div>
                          </div>
                          <h2 v-else>No results</h2>
                      </div>
                  </template>
              </ApolloQuery>
          </section>

          <section class="latestProducts" v-else>
              <h2>Last products:</h2>
              <ApolloQuery :query="require('@/apollo/latestProducts.gql')" :pollInterval="5000" :skip="isSearchUsed">
                <template slot-scope="{ result: { loading, data } }">
                    <div v-if="loading">Loading...</div>
                    <div v-else-if="data && data.products" class="columns is-multiline is-two-thirds-mobile">
                        <div class="column is-one-third-tablet is-one-fifth-desktop" v-for="product in data.products" :key="product.id">
                            <ProductCard v-bind:product="product" v-on:show-product-modal="launchCardModal" />
                        </div>
                    </div>
                </template>
              </ApolloQuery>
          </section>

      </div>
    </section>
  </div>

</template>

<script>

  import gql from 'graphql-tag'
  import ProductCard from "../components/ProductCard";

  const getStatsQuery = gql`query{
    stats{
      products
      categories
      shops
    }
  }`;

export default {
    name: 'home',
    components: {
        ProductCard,
    },
    data() {
        return {
            stats: {
                products: 0,
                categories: 0,
                shops: 0
            },
            searchQuery: '',
        }
    },
    apollo: {
        stats: getStatsQuery
    },
    computed: {
      isSearchUsed () {
          return this.searchQuery.length !== 0;
      }
    },
    methods: {
        launchCardModal (productId) {
            this.$emit('show-product-modal', productId);
        }
    }
}
</script>
