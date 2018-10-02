<template>
  <div>
    <section class="hero has-text-centered">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Price Comparer
          </h1>
          <h2 class="subtitle">
            Here you can compare price for products in some shops
          </h2>
        </div>
      </div>
      <div class="box">
        <div class="container">
          <div class="columns">
            <div class="column is-three-fifths-desktop is-offset-one-fifth-desktop">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">We have...</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">{{ stats.products }}</p>
                    <p class="heading">Products</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">{{ stats.categories }}</p>
                    <p class="heading">Categories</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">{{ stats.shops }}</p>
                    <p class="heading">Shops</p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="has-text-centered">
          <h1 class="title">Try it yourself!</h1>
          <h2 class="subtitle">
            just start typing name of product or barcode
          </h2>
        </div>
        <div class="columns">
          <div class="column is-half-desktop is-offset-one-quarter-desktop">
            <b-field class="has-v-margin-1">
              <b-input v-model="searchQuery" placeholder="Name or barcode of product" icon="search"></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
          <section class="searchResults" v-if="isSearchUsed">
              <h2>We've found this products:</h2>
              <div class="columns">
                  <div class="column" v-for="product in searchResults" :key="product.id">
                      <ProductCard v-bind:product="product" />
                  </div>
              </div>
          </section>
          <section class="latestProducts" v-else>
              <div class="columns">
                  <div class="column" v-for="product in latestProducts" :key="product.id">
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
    products(count: 5, orderBy: updated, orderDirection: desc){
      id
      name
      categoryId
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
      categoryId
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
    components: {ProductCard},
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
            pollInterval: 1500,
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
      }
    }
}
</script>
