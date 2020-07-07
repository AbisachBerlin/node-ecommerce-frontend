<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col vcols="12" sm="4">
          <v-card outlined>
            <v-card-title primary-title>{{this.$auth.user.name}}</v-card-title>
            <v-card-text>{{this.$auth.user.email}}</v-card-text>
          </v-card>
        </v-col>
        <v-col vcols="12" sm="8">
          <v-card outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">No #</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.customer }}</td>
                    <td>$ {{ order.amount }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      orders: {}
    };
  },
  async mounted() {
    const { data } = await this.$axios.get("orders/getorders");
    this.orders = data;
  },
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.loggedIn) {
      return redirect("/user/login");
    }
  }
};
</script>