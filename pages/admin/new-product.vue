<template>
  <div>
    <h1 class="headline">All Orders</h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="name" @keyup="upadteSlug" label="Name" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="slug" label="Slug" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="price" label="Price" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-file-input v-model="imageFile" prepend-icon append-icon="mdi-image" label="Image"></v-file-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-textarea label="Description" v-model="description" auto-grow value></v-textarea>
      </v-col>
    </v-row>
    <v-alert dismissible outlined type="error" v-model="error">{{errorMsg}}</v-alert>
    <v-btn :loading="loading" @click="submit" dark>Submit</v-btn>
  </div>
</template>

<script>
const slugify = require("slugify");
export default {
  layout: "admin",
  data() {
    return {
      name: null,
      slug: null,
      price: null,
      description: null,
      imageFile: null,
      image: null,
      error: false,
      errorMsg: null,
      loading: false
    };
  },

  methods: {
    upadteSlug() {
      this.slug = slugify(this.name, {
        lower: true,
        strict: true
      });
    },
    async submit() {
      this.loading = true;
      this.slug = slugify(this.slug, {
        lower: true,
        strict: true
      });
      // Embed Image in  FormData
      const formData = new FormData();
      formData.append("productImage", this.imageFile);

      // Upload Image
      try {
        await this.$axios
          .post("products/uploadimage", formData)
          .then(response => {
            this.image = response.data.url;
          });
      } catch (error) {
        if (error.response) {
          this.errorMsg = error.response.data.message;
        } else {
          this.errorMsg = error;
        }
        this.loading = false;
        return;
      }

      // Save Product
      try {
        await this.$axios
          .post("products", {
            name: this.name,
            slug: this.slug,
            price: this.price,
            description: this.description,
            image: this.image
          })
          .then(response => {
            console.log(response.data);
          });
      } catch (error) {
        this.error = true;
        if (error.response) {
          this.errorMsg = error.response.data.message;
        } else {
          this.errorMsg = error;
        }
      }
      this.loading = false;
      this.$toast.show("Product Added Successfully");
      this.$router.push("/admin/products");
    }
  }
};
</script>

<style>
</style>