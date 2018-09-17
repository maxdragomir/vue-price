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
                    <p class="title">3,456</p>
                    <p class="heading">Products</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">123</p>
                    <p class="heading">Categories</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">456K</p>
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
              <b-autocomplete
                      rounded
                      v-model="name"
                      :data="filteredDataArray"
                      placeholder="e.g. jQuery"
                      size="is-medium"
                      icon="search">
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            data: [
                'Angular',
                'Angular 2',
                'Aurelia',
                'Backbone',
                'Ember',
                'jQuery',
                'Meteor',
                'Node.js',
                'Polymer',
                'React',
                'RxJS',
                'Vue.js'
            ],
            name: '',
            selected: null
        }
    },
    computed: {
        filteredDataArray() {
            return this.data.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    }
}
</script>
