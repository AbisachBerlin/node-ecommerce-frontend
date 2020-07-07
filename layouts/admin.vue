<template>
  <v-app>
    <Header clipLeft />

    <v-navigation-drawer clipped app>
      <v-list>
        <v-subheader>ORDERS</v-subheader>
        <v-list-item-group>
          <v-list-item to="/admin/orders" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>All Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list>
        <v-subheader>PRODUCTS</v-subheader>
        <v-list-item-group>
          <v-list-item to="/admin/products" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>All Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/admin/new-product" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add New Product</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list>
        <v-subheader>CUSTOMERS</v-subheader>
        <v-list-item-group>
          <v-list-item to="/admin/customers">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>All Customers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "~/components/Header.vue";
export default {
  name: "admin",
  components: {
    Header
  },
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.auth.user.id !== 1) {
      return redirect("/");
    }
  }
};
</script>

