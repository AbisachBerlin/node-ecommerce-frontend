<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-radio-group v-model="selectedShippingMethod">
          <v-radio label="DHL Standard" value="DHL Standard"></v-radio>
          <p class="pl-8 font-italic">Delivery Time : 4 - 5 Days</p>
          <v-radio label="FedEx Express" value="FedEx Express"></v-radio>
          <p class="pl-8 font-italic">Delivery Time : 6 - 7 Days</p>
        </v-radio-group>
        <div class="text-right">
          <v-btn @click="submit" dark>
            Next
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ShippingMethods",
  methods: {
    submit() {
      if (this.selectedShippingMethod != null) {
        this.$store.commit("checkout/METHOD_VALIDATE", true);
        this.$store.commit("checkout/CHANGE_ACTIVE_STEP", 2);
      }
    }
  },
  computed: {
    selectedShippingMethod: {
      get() {
        return this.$store.state.checkout.selectedShippingMethod;
      },
      set(val) {
        this.$store.commit("checkout/CHANGE_SHIPPING_METHOD", val);
      }
    }
  }
};
</script>

<style>
</style>