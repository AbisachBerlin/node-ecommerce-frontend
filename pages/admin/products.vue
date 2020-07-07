<template>
  <div>
    <h1 class="headline">All Products</h1>
    <div v-if="products.length>0">
      <v-data-table :headers="headers" :items="products" :items-per-page="10"></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "products",
  data() {
    return {
      headers: [
        {
          text: "id",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Slug", value: "slug" },
        { text: "Price", value: "price" }
      ],
      products: []
    };
  },
  async mounted() {
    const { data } = await this.$axios.get("products");
    this.products = data;
  }
};
</script>
