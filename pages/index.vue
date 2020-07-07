<template>
  <v-main>
    <v-container>
      <v-row>
        <!-- Call ProductCard Component for each product -->
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ProductCard from "~/components/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get("products");
    return {
      products: data
    };
  }
};
</script>