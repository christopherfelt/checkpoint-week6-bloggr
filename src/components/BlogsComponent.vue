<template>
  <div class="blogs-component col">
    <div
      class="mb-2 d-flex justify-content-center"
      v-if="$auth.isAuthenticated"
    >
      <blog-form />
    </div>
    <div class="card-columns">
      <blog v-for="post in blogs" :key="post._id" :blogProp="post" />
    </div>
  </div>
</template>

<script>
import Blog from "./BlogComponent";
import BlogForm from "./BlogForm";

export default {
  name: "BlogsComponent",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBlogs");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {},
  components: {
    Blog,
    BlogForm,
  },
};
</script>

<style scoped></style>
