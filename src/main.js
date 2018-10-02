import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import 'buefy/dist/buefy.css'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import'animate.css'


Vue.config.productionTip = false

const httpLink = new HttpLink({
    uri: 'https://api.pricecomparer.tk/graphql',
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

Vue.use(Buefy, { defaultIconPack: 'fas' })
Vue.use(VueApollo)

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
