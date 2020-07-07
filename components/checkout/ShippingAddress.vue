<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="shippingAddress.firstname"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field v-model="shippingAddress.phone" :rules="phoneRules" label="Phone" required></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="shippingAddress.address_1"
            :rules="addressRules"
            label="Address Line 1"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field v-model="shippingAddress.address_2" label="Address Line 2"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            :rules="countryRules"
            v-model="shippingAddress.country"
            :items="countriesList"
            item-text="name"
            item-value="name"
            label="Country"
            @change="loadStates()"
            return-object
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            :rules="stateRules"
            v-model="shippingAddress.state"
            :items="statesList"
            item-text="name"
            item-value="name"
            label="State/Province"
            @change="loadCity()"
            return-object
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="shippingAddress.city"
            :items="cityList"
            item-text="name"
            item-value="name"
            label="City/Town"
            return-object
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="shippingAddress.postcode"
            :rules="postcodeRules"
            label="Postcode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" class="text-right">
          <v-btn @click="submit" dark>
            Next
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import csc from "country-state-city";
import { mapMutations } from "vuex";

export default {
  name: "ShippingAddress",
  data() {
    return {
      shippingAddress: {
        firstname: "John Doe",
        lastname: null,
        email: null,
        phone: "3216549870",
        address_1: "12",
        address_2: "jh",
        country: "India",
        state: "London",
        city: "London",
        postcode: "IG62AF"
      },
      nameRules: [v => !!v || "Please enter your Name"],
      emailRules: [
        v => !!v || "Please enter your E-mail",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [v => !!v || "Please enter your Phone Number"],
      addressRules: [v => !!v || "Please enter your Address"],
      countryRules: [v => !!v || "Please select your Country"],
      stateRules: [v => !!v || "Please select your State/Province"],
      postcodeRules: [v => !!v || "Please enter your Postcode"],
      valid: false,
      statesList: [],
      cityList: []
    };
  },
  computed: {
    countriesList: () => {
      return csc.getAllCountries();
    }
  },
  mounted() {
    if (process.browser) {
      let localAddress = localStorage.getItem("shippingAddress");
      if (localAddress) {
        this.shippingAddress = JSON.parse(localAddress);
      }
    }
  },
  methods: {
    async loadStates() {
      this.statesList = await csc.getStatesOfCountry(
        this.shippingAddress.country.id
      );
    },
    async loadCity() {
      this.cityList = await csc.getCitiesOfState(this.shippingAddress.state.id);
    },
    submit() {
      if (this.$refs.form.validate()) {
        localStorage.setItem(
          "shippingAddress",
          JSON.stringify(this.shippingAddress)
        );
        this.addresssValidate(true);
        this.changeActiveStep(1);
      }
    },
    ...mapMutations({
      addresssValidate: "checkout/ADDRESS_VALIDATE",
      changeActiveStep: "checkout/CHANGE_ACTIVE_STEP"
    })
  }
};
</script>

<style>
</style>