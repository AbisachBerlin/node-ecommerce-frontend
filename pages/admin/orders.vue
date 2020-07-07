<template>
  <div>
    <h1 class="headline">All Orders</h1>
    <div v-if="orders.length>0">
      <v-data-table :headers="headers" :items="orders" :items-per-page="10"></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "orders",
  data() {
    return {
      headers: [
        {
          text: "Order #",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Customer Name", value: "customer" },
        { text: "Order Total", value: "amount" }
      ],
      orders: []
    };
  },
  async mounted() {
    const { data } = await this.$axios.get("orders/all");
    this.orders = data;
  }
};
</script>
