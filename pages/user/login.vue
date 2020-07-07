<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-alert v-model="error" type="error" dismissible outlined text>{{errorMsg}}</v-alert>

          <v-card outlined>
            <v-toolbar dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                  :rules="emailRules"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                  :rules="passwordRules"
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn to="/user/register" nuxt text small>Register</v-btn>
              <v-spacer />
              <v-btn @click="login" :loading="loading" dark>
                Login
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
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: null,
      valid: false,
      loading: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "Please enter a valid E-mail"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.$auth
            .loginWith("local", {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(() =>
              this.$toast.show("Welcome back! " + this.$auth.user.name)
            );
        } catch (e) {
          this.error = true;
          if ((e.statusCode = 400)) {
            this.errorMsg = "Invalid Email or Password";
          } else {
            this.errorMsg = e.error;
          }
        }
        this.loading = false;
      }
    }
  }
};
</script>