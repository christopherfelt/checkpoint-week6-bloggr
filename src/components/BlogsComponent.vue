<template>
  <div class="blogs-component col ">
    <div class="mb-3 d-flex justify-content-center">
      <form class="form-inline" @submit.prevent="searchByAuthor">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search by author name"
            v-model="searchEmail"
          />
          <button class="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
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
    return {
      searchEmail: "",
    };
  },
  mounted() {
    this.$store.dispatch("getBlogs");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {
    searchByAuthor() {
      if (this.searchEmail == "") {
        this.$store.dispatch("getBlogs");
      } else {
        this.$store.dispatch("searchByAuthor", this.searchEmail);
      }
    },
  },
  components: {
    Blog,
    BlogForm,
  },
};
</script>

<style scoped>
#form-section {
  width: 40em;
  text-align: left;
}
</style>
