<template>
  <div>
    <h1 class="headline">All Customers</h1>
    <div v-if="customers.length>0">
      <v-data-table :headers="headers" :items="customers" :items-per-page="10"></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "customers",
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Customer Name", value: "name" },
        { text: "Customer Email", value: "email" }
      ],
      customers: []
    };
  },
  async mounted() {
    const { data } = await this.$axios.get("user/all");
    this.customers = data;
  }
};
</script>
