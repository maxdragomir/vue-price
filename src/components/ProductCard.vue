<template>

    <transition name="products">
        <div class="card is-products">
            <div class="card-header">
                <a href="javascript:;"  class="card-image"  v-on:click="$emit('show-product-modal', product.id)" ref="product.id" :style="{'background-image': 'url(' + product.mainPhoto + ')'}"></a>
                <div class="card-price">
                    {{ product.prices | toPriceRange }}
                </div>
            </div>
            <div class="card-body">
                <a href="javascript:;" v-on:click="$emit('show-product-modal', product.id)" ref="product.id">
                    <div class="card-title" :title="product.name"> {{ product.name }} </div>
                </a>
                <div class="card-description">
                    <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, tempora.</p>-->
                    <p>{{ product.description }}</p>
                </div>

            </div>
            <div class="card-footer is-flex">
                <a class="button is-custom is-outlined" title="More info" href="javascript:;"  v-on:click="$emit('show-product-modal', product.id)" ref="product.id">
                    <span class="icon is-small">
                        <i class="fas fa-eye"></i>
                    </span>
                    <span class="text">More info</span>
                </a>
                <a href="javascript:;" class="button is-custom" title="Add to cart">
                    <span class="icon is-small">
                        <i class="fa fa-cart-plus"></i>
                    </span>
                    <!--<span class="text">Add to cart</span>-->
                </a>
            </div>

        </div>
    </transition>

</template>

<script>
    export default {
        name: "ProductCard",
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
        props: {
            product: Object,
        }
    }
</script>

<style scoped>

</style>