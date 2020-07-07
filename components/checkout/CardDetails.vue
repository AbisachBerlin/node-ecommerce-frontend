<template>
  <div>
    <div class="my-5">
      <div class="subtitle-1 mb-3">Please enter your card details below</div>
      <div id="card-element"></div>
    </div>
    <v-alert v-model="error" type="error" dismissible outlined text>{{errorMsg}}</v-alert>
    <div class="text-right">
      <v-btn :loading="loading" large @click="submit" dark>Place Order</v-btn>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters } from "vuex";

export default {
  name: "CardDetails",
  data: () => ({
    loading: false,
    stripe: null,
    elements: null,
    card: null,
    error: false,
    errorMsg: null
  }),
  methods: {
    async submit() {
      this.loading = true;
      const shippingAddress = JSON.parse(
        localStorage.getItem("shippingAddress")
      );

      let vm = this;
      try {
        // Request backend to create a paymetIntent and get client secret
        const { data } = await this.$axios.post("orders/createpayment", {
          amount: this.cartSubTotal * 100,
          currency: "usd",
          description: `Order from ${shippingAddress.firstname}`,
          shipping: {
            name: shippingAddress.firstname,
            address: {
              city: shippingAddress.city.name,
              country: shippingAddress.country.sortname,
              line1: shippingAddress.address_1,
              line2: shippingAddress.address_2,
              postal_code: shippingAddress.postcode,
              state: shippingAddress.state.name
            }
          }
        });
        // console.log(data);
        const clientSecret = data.client_secret;

        // Use clientSecret and card data to confirm card payment
        this.stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.card,
              billing_details: {
                address: {
                  city: shippingAddress.city.name,
                  country: shippingAddress.country.sortname,
                  line1: shippingAddress.address_1,
                  line2: shippingAddress.address_2,
                  postal_code: shippingAddress.postcode,
                  state: shippingAddress.state.name
                },
                email: this.$auth.user.email,
                name: this.$auth.user.name,
                phone: shippingAddress.phone
              }
            }
          })
          .then(async function(result) {
            if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              vm.error = true;
              vm.errorMsg = result.error.message;
              vm.loading = false;
              return;
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === "succeeded") {
                // console.log("payment was successful...");
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.

                await vm.$axios
                  .post("orders/createorder", {
                    payment_id: result.paymentIntent.id,
                    customer: vm.$auth.user.name,
                    customer_id: vm.$auth.user.id,
                    amount: vm.cartSubTotal,
                    products: JSON.stringify(vm.cartItems)
                  })
                  .then(response => {
                    console.log(response.data);
                    if (response.data.message == "success") {
                      // Clear Cart
                      localStorage.removeItem("cartItems");
                      vm.$store.commit("cart/clearCart");

                      // Redirect to success pge
                      vm.$router.push({
                        name: "checkout-success",
                        params: { order_id: response.data.order_id }
                      });
                    }
                  });

                vm.loading = false;
                return;
              }
            }
          });
      } catch (err) {
        console.log("An error occurred.");
        console.log(err);
        this.loading = false;
        return;
      }
    }
  },
  async mounted() {
    this.stripe = await loadStripe("STRIPE_PUBLIC_KEY");
    this.elements = this.stripe.elements();
    // Create an instance of the card Element.
    this.card = this.elements.create("card", { hidePostalCode: true });
    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount("#card-element");
  },
  computed: {
    ...mapGetters({
      selectedShippingMethod: "checkout/selectedShippingMethod",
      cartSubTotal: "cart/cartSubTotal",
      cartItems: "cart/cartItems"
    })
  }
};
</script>


<style>
.StripeElement {
  box-sizing: border-box;
  padding: 16px;
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: white;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>