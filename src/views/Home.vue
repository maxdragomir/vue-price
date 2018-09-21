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
              <!--<b-autocomplete-->
                      <!--rounded-->
                      <!--v-model="name"-->
                      <!--:data="searchProducts"-->
                      <!--placeholder="e.g. jQuery"-->
                      <!--size="is-medium"-->
                      <!--icon="search">-->
                <!--<template slot="empty">No results found</template>-->
              <!--</b-autocomplete>-->

                <input class="input is-medium is-rounded" v-model="searchProducts" placeholder="Products or Barcodes">

            </b-field>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
            <div class="column" v-for="product in latestProducts" :key="product.id">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="product.mainPhoto" alt="Placeholder image">
                        </figure>
                    </div>

                    <div class="card-content">

                        <div class="media">
                            <div class="media-content">
                                <p class="title is-size-6">{{ product.name }}</p>
                                <p class="subtitle is-size-7">
                                    {{ product.prices | toPriceRange }}
                                </p>
                            </div>
                        </div>

                        <div class="content">
                            {{ product.description }}
                            <div class="is-size-7"> Добавлен: {{ product.added.split(',')[0] }}</div>
                            <div class="is-size-7 has-text-grey"> Обновлен: {{ product.updated.split(',')[0] }}</div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script>
  import gql from 'graphql-tag'

  const getStatsQuery = gql`query{
    stats{
      products
      categories
      shops
    }
  }`;

  const latestProducts = gql`query{
    products(count: 5, orderBy: updated, orderDirection: asc){
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
        name
        barcodes
    }
  }`;

export default {
    name: 'home',
    filters: {
        toPriceRange: function (value) {
            let minPrice,
                maxPrice,
                measure = value[0].measure ? value[0].measure : 1 + ' unit';

            if (value.length === 1) {
                return value[0].price + ' uah \\ ' + measure;
            }

            value.forEach(function(val) {
                if (minPrice === undefined || val.price <= minPrice) {
                    minPrice = val.price;
                }

                if (maxPrice === undefined || val.price >= maxPrice) {
                    maxPrice = val.price;
                }
            });

            if (minPrice === maxPrice) {
                return minPrice + ' uah \\ ' + measure;
            }

            return minPrice + ' - ' + maxPrice + ' uah \\ ' + measure;
        }
    },
    data() {
        return {
            stats: {
                products: 0,
                categories: 0,
                shops: 0
            },
            latestProducts: [],
            searchProducts: '',
        }
    },
    props: {
        searchQuery: String
    },
    apollo: {
        stats: getStatsQuery,
        latestProducts: {
            query: latestProducts,
            update (data) {
                return data.products;
            }
        },
        searchProducts: {
            query: search,
            variables() {
                return {
                    query: this.searchQuery
                }
            }
        }
    },
    methods: {

    },
    computed: {

    }
}
</script>
