<template>
  <v-card outlined>
    <v-card-title>Order Summary</v-card-title>
    <v-divider />
    <v-card-text class="pl-0 pr-0">
      <v-simple-table>
        <tbody>
          <tr>
            <td>Items Total</td>
            <td class="text-right">${{cartSubTotal}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-divider />
    <v-card-title class="d-flex justify-space-between">
      <div class="title">Grand Total</div>
      <div class="title">${{cartSubTotal}}</div>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "cart_summary",
  computed: mapGetters({
    cartItems: "cart/cartItems",
    cartSubTotal: "cart/cartSubTotal"
  })
};
</script>

<style>
</style>