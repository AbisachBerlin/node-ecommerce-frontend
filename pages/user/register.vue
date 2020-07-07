<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-alert v-model="error" type="error" dismissible outlined text>{{errorMsg}}</v-alert>

          <v-card outlined>
            <v-toolbar dark flat>
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="name"
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="nameRules"
                />
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  :rules="emailRules"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="passwordRules"
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn to="/user/login" nuxt text small>Login</v-btn>
              <v-spacer />
              <v-btn @click="register" :loading="loading" dark>
                Register
                <v-icon right dark>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: false,
      errorMsg: null,
      loading: false,
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "Please enter a valid E-mail"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.$axios
            .post("user/register", {
              name: this.name,
              email: this.email,
              password: this.password
            })
            .then(() => this.login());
        } catch (e) {
          this.error = true;
          this.errorMsg = e.message;
        }
        this.loading = false;
      }
    },
    async login() {
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(() =>
            this.$toast.show("Welcome to Nuxt Shop! " + this.$auth.user.name)
          )
          .then(() => this.$router.push({ path: "/user/account" }));
      } catch (e) {
        this.error = true;
        if ((e.statusCode = 400)) {
          this.errorMsg = "Invalid Email or Password";
        } else {
          this.errorMsg = e.message;
        }
      }
    }
  }
};
</script>