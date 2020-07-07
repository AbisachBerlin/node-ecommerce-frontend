<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    // If the user is authenticated send to account page else send to login page
    if (store.state.auth.loggedIn) {
      return redirect("/user/account");
    } else {
      return redirect("/user/login");
    }
  }
};
</script>