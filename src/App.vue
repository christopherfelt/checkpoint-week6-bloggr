<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import { setBearer, api } from "./store/AxiosStore";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      setBearer(this.$auth.bearer);
      this.$store.dispatch("getProfile");
      //NOTE if you want to do something everytime the user logs in, do so here
    }
  },
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
// @import "./assets/_variables.scss";
@import "./assets/_spaclabvariables.scss";
@import "bootstrap";
// @import "./assets/_overrides.scss";

// * {
//   outline: 1px solid red;
// }
</style>
