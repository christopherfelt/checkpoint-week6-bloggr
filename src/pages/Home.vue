<template>
  <div class="home container text-center">
    <h1>Welcome</h1>
    <div class="row d-flex justify-content-center">
      <blogs />
    </div>
  </div>
</template>

<script>
import Blogs from "@/components/BlogsComponent.vue";

export default {
  name: "home",
  components: {
    Blogs,
  },
};
</script>
