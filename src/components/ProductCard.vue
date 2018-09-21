<template>
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