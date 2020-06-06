<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    {{ userBlogs }}
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getUserBlogs", this.profile.email);
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    userBlogs() {
      return this.$store.state.userBlogs;
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
