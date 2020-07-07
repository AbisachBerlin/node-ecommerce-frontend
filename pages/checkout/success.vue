<template>
  <v-main>
    <v-container class="fill-height">
      <v-row class="text-center">
        <v-col cols="12" sm="12">
          <v-icon size="100" color="success">mdi-check-circle-outline</v-icon>

          <h1 class="headline mt-5">Order Placed Successfully!</h1>
          <h2>Your order # {{this.$route.params.order_id}}</h2>
          <v-btn outlined to="/user/account" nuxt class="mt-5 mb-5">view all Orders</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.order_id);
  }
};
</script>