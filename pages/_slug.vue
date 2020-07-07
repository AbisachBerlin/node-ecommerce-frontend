<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <v-img v-if="product.image" :src="backendUrl + product.image"></v-img>
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <h1>{{product.name}}</h1>
          <h2>${{product.price.toFixed(2)}}</h2>
          <v-row>
            <v-col cols="12" xs="12">
              <div class="input-qty-wrapper">
                <button @click="decreaseQty" class="qty-minus">-</button>
                <input v-model="productQty" class="input-qty" type="text" readonly />
                <button @click="increaseQty" class="qty-plus">+</button>
              </div>
            </v-col>
          </v-row>
          <v-btn x-large block dark @click="addToCart(product)">Add to Cart</v-btn>
          <v-expansion-panels mandatory accordion class="mt-5">
            <v-expansion-panel>
              <v-expansion-panel-header>Description</v-expansion-panel-header>
              <v-expansion-panel-content>{{product.description}}</v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Specifications</v-expansion-panel-header>
              <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Wash Care</v-expansion-panel-header>
              <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      cartQty: [1, 2, 3, 4, 5],
      cartColor: ["Green", "White", "Grey", "Blue"],
      productQty: 1,
      backendUrl: process.env.backendUrl
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`products/${params.slug}`);
    return { product: data };
  },
  methods: {
    addToCart(product) {
      let cartItem = {
        product: product,
        qty: this.productQty
      };
      this.$store.commit("cart/addItem", cartItem);
    },
    increaseQty() {
      this.productQty++;
    },
    decreaseQty() {
      if (this.productQty > 1) {
        this.productQty--;
      }
    }
  }
};
</script>