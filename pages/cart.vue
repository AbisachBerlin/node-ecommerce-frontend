<template>
  <v-main>
    <v-container v-if="cartItems.length==0" class="fill-height">
      <v-row class="text-center">
        <v-col cols="12" sm="12">
          <h1 class="headline">Your Cart is Empty</h1>
          <v-btn x-large dark to="/" nuxt class="mt-5 mb-5">Go Shopping</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="text-center">
        <v-col cols="12" sm="12">
          <h1 class="headline">Your Cart</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartItems" :key="item.index">
                  <td>
                    <v-list-item three-line class="pl-0">
                      <v-list-item-avatar tile size="80" color="grey">
                        <img :src="backendUrl+item.product.image" />
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="title">{{item.product.name}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td>${{item.product.price.toFixed(2)}}</td>
                  <td>
                    <div class="input-qty-wrapper">
                      <button class="qty-minus" @click="decreaseQty(item)">-</button>
                      <input class="input-qty" type="text" :value="item.qty" readonly />
                      <button class="qty-plus" @click="increaseQty(item)">+</button>
                    </div>
                  </td>
                  <td class="text-right">${{(item.product.price * item.qty).toFixed(2)}}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon dark color="grey" @click="deleteItem(item)">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <span>Remove from Cart</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <OrderSummary />

          <v-btn x-large block dark class="mt-5" to="checkout" nuxt>
            Proceed to Checkout
            <v-icon right dark>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import OrderSummary from "~/components/OrderSummary.vue";

export default {
  name: "cart",
  components: {
    OrderSummary
  },
  data() {
    return {
      backendUrl: process.env.backendUrl
    };
  },
  methods: {
    increaseQty(item) {
      this.$store.commit("cart/increaseQty", item);
    },
    decreaseQty(item) {
      this.$store.commit("cart/decreaseQty", item);
    },
    deleteItem(item) {
      this.$store.commit("cart/deleteItem", item);
    }
  },
  computed: mapGetters({
    cartItems: "cart/cartItems",
    cartSubTotal: "cart/cartSubTotal"
  })
};
</script>

<style >
.input-qty-wrapper {
  display: inline-flex;
  align-items: center;
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  line-height: 1;
}
.input-qty-wrapper > button {
  padding: 0.75em;
}
input.input-qty {
  max-width: 3em;
  text-align: center;
  align-self: stretch;
  border: thin solid rgba(0, 0, 0, 0.12);
  border-top: none;
  border-bottom: none;
}
</style>