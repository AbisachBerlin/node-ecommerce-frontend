<template>
  <v-app-bar :clipped-left="clipLeft" app dark>
    <nuxt-link class="site-title" to="/">
      <v-toolbar-title>Node eCommerce</v-toolbar-title>
    </nuxt-link>

    <v-spacer />

    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <!-- If user is logged in  -->
      <v-list v-if="this.$auth.loggedIn">
        <v-list-item to="/user/account" nuxt>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- If user is not logged in  -->
      <v-list v-else>
        <v-list-item to="/user/login" nuxt>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item to="/user/register" nuxt>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Cart Icon -->
    <v-btn icon to="/cart" nuxt>
      <v-badge :value="cartItems.length" :content="cartItems.length" dark overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  props: ["clipLeft"],
  methods: {
    async logOut() {
      await this.$auth
        .logout()
        .then(() => this.$toast.show("You have been logged out"));
    }
  },
  computed: mapGetters({
    cartItems: "cart/cartItems"
  }),
  mounted() {
    if (process.browser) {
      let localCartItems = localStorage.getItem("cartItems");
      if (localCartItems) {
        this.$store.commit("cart/loadCart", JSON.parse(localCartItems));
      }
    }
  }
};
</script>

<style scoped>
.site-title {
  text-decoration: none;
  color: #fff;
}
</style>