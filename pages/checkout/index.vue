<template>
  <v-main>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" sm="12">
          <h1 class="headline">Checkout</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-expansion-panels v-model="activeStep" mandatory flat focusable>
            <v-expansion-panel>
              <v-card outlined>
                <v-expansion-panel-header disable-icon-rotate>
                  Shipping Address
                  <template v-if="isAddressValid" v-slot:actions>
                    <v-icon color="teal">mdi-check</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ShippingAddress />
                </v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
            <v-expansion-panel :disabled="!isAddressValid" class="mt-3">
              <v-card outlined>
                <v-expansion-panel-header>
                  Shipping Method
                  <template v-if="isMethodValid" v-slot:actions>
                    <v-icon color="teal">mdi-check</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ShippingMethods />
                </v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
            <v-expansion-panel :disabled="!isMethodValid" class="mt-3">
              <v-card outlined>
                <v-expansion-panel-header>Payment</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <CardDetails />
                </v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" md="4">
          <OrderSummary />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import OrderSummary from "~/components/OrderSummary.vue";
import ShippingAddress from "~/components/checkout/ShippingAddress.vue";
import ShippingMethods from "~/components/checkout/ShippingMethods.vue";
import CardDetails from "~/components/checkout/CardDetails.vue";

export default {
  name: "checkout",
  components: {
    OrderSummary,
    ShippingAddress,
    ShippingMethods,
    CardDetails
  },
  computed: {
    ...mapGetters({
      isAddressValid: "checkout/isAddressValid",
      isMethodValid: "checkout/isMethodValid"
    }),
    activeStep: {
      get() {
        return this.$store.state.checkout.activeStep;
      },
      set(val) {
        this.$store.commit("checkout/CHANGE_ACTIVE_STEP", val);
      }
    }
  },
  mounted() {
    this.$store.commit("checkout/ADDRESS_VALIDATE", false);
    this.$store.commit("checkout/CHANGE_ACTIVE_STEP", 0);
  },
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.loggedIn) {
      return redirect("/user/login");
    }
    // If Cart is Empty
    if (store.state.cart.cartItems.length == 0) {
      return redirect("/cart");
    }
  }
};
</script>

<style>
</style>