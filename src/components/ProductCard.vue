<template>

    <div class="card is-products">
        <div class="card-header">
            <a href="#!" class="card-image" :style="{'background-image': 'url(' + product.mainPhoto + ')'}"></a>
            <div class="card-price">
                {{ product.prices | toPriceRange }}
            </div>
        </div>
        <div class="card-body">
            <a href="#!">
                <div class="card-title" :title="product.name"> {{ product.name }} </div>
            </a>
            <div class="card-description">
                <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, tempora.</p>-->
                <p>{{ product.description }}</p>
            </div>
            <div class="card-update">
                <div> Add: {{ product.added.split(',')[0] }}</div>
                <div> Update: {{ product.updated.split(',')[0] }}</div>
            </div>
        </div>
        <div class="card-footer is-flex">
            <a class="button is-info is-custom is-outlined" href="#!">
                <span class="icon is-small">
                    <i class="fas fa-info-circle"></i>
                </span>
                <span>More info</span>
            </a>
        </div>
    </div>


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
            product: Object
        },
    }
</script>

<style scoped>

</style>