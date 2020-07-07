<template>
  <v-app>
    <Header v-bind:clipLeft="false" />
    <nuxt />
  </v-app>
</template>

<script>
import Header from "~/components/Header.vue";
export default {
  name: "default",
  components: {
    Header
  }
};
</script>

