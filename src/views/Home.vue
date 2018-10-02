<template >
  <div>

    <section class="hero is-medium has-text-centered is-header">
      <div class="hero-body">
          <div class="container">
              <div class="svg">
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
                                    <div class="svg">
                                        <img src="../assets/img/shopping-bag.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="title">{{ stats.categories }}</p>
                                    <p class="heading">Categories</p>
                                    <div class="svg">
                                        <img src="../assets/img/checklist.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="title">{{ stats.shops }}</p>
                                    <p class="heading">Shops</p>
                                    <div class="svg">
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
              <h1 class="title">Try it yourself!</h1>
              <h2 class="subtitle">just start typing name of product or barcode</h2>
          </div>
          <div class="columns">
              <div class="column is-half-desktop is-offset-one-quarter-desktop">
                  <b-field class="has-t-margin-2 is-home-input">
                      <b-input v-model="searchQuery" placeholder="Name or barcode of product" icon="search" v-bind:class="{ 'no-result': noResult}"></b-input>
                  </b-field>
              </div>
          </div>
      </div>
    </section>

    <section class="section is-products has-t-padding-0 has-b-padding-5">
      <div class="container">

          <section class="searchResults" v-if="isSearchUsed">
              <h2 v-if="noResult">No result</h2>
              <h2 v-else>We've found this products:</h2>
              <div class="columns is-multiline is-two-thirds-mobile">
                  <div class="column is-one-third-tablet is-one-fifth-desktop" v-for="product in searchResults" :key="product.id">
                      <ProductCard v-bind:product="product" />
                  </div>
              </div>
          </section>

          <section class="latestProducts" v-else>
              <h2>Last products:</h2>
              <div class="columns is-multiline is-two-thirds-mobile">
                  <div class="column is-one-third-tablet is-one-fifth-desktop" v-for="product in latestProducts" :key="product.id">
                      <ProductCard v-bind:product="product" />
                  </div>
              </div>
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

  const latestProducts = gql`query{
    products(count: 10, orderBy: updated, orderDirection: asc){
      id
      name
      categoriesIds
      description
      barcodes
      photos
      mainPhoto
      prices {
        price
        measure
      }
      added(format: long)
      updated(format: long)
    }
  }`;

  const search = gql`query getSearch($query: String) {
    productsSearch(query: $query) {
      id
      name
      categoriesIds
      description
      barcodes
      photos
      mainPhoto
      prices {
        price
        measure
      }
      added(format: long)
      updated(format: long)
    }
  }`;

export default {
    name: 'home',
    components: {
        ProductCard
    },
    data() {
        return {
            stats: {
                products: 0,
                categories: 0,
                shops: 0
            },
            latestProducts: [],
            searchResults: [],
            searchQuery: '',
        }
    },
    apollo: {
        stats: getStatsQuery,
        latestProducts: {
            query: latestProducts,
            update (data) {
              return data.products;
            }
        },
        searchResults: {
            query: search,
            variables() {
              return {
                query: this.searchQuery
              }
            },
            update (data) {
                return data.productsSearch;
            }
        }
    },
    computed: {
      isSearchUsed () {
          return this.searchQuery.length;
      },
      noResult () {
          if(this.searchResults.length === 0) {
              return true;
          }
      }

    }
}
</script>
