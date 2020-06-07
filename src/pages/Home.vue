<template>
  <div class="home container-fluid text-center">
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
