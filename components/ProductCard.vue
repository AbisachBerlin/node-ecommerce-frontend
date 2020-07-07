<template>
  <v-col cols="12" xs="6" sm="6" md="4">
    <v-card outlined>
      <nuxt-link :to="product.slug">
        <v-img :src="backendUrl + product.image"></v-img>
      </nuxt-link>
      <v-card-text class="card-text">
        <v-btn @click="addToCart(product)" dark absolute top right fab>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-card-title>{{product.name}}</v-card-title>
        <v-card-subtitle>${{product.price.toFixed(2)}}</v-card-subtitle>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    return {
      backendUrl: process.env.backendUrl
    };
  },
  methods: {
    addToCart(product) {
      let cartItem = {
        product: product,
        qty: 1
      };
      this.$store.commit("cart/addItem", cartItem);
    }
  }
};
</script>

<style scoped>
.card-text {
  position: relative;
}
</style>