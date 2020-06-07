<template>
  <div class="blogs-component col-8">
    <div class="d-flex justify-content-center">
      <form class="form" @submit.prevent="search">
        <div class="form-group">
          <div class="d-flex m-2">
            <input
              type="text"
              class="form-control d-inline"
              placeholder="author name or blog tag"
              v-model="searchTerm"
            />
            <button class="btn btn-primary d-inline ml-1">Search</button>
          </div>
          <div id="radio-section">
            <label for="author">Author</label>
            <input
              id="searchAuthor"
              name="author"
              type="radio"
              value="author"
              v-model="picked"
            />
            <label for="tag">Tag</label>
            <input
              id="searchTag"
              name="tag"
              type="radio"
              value="tag"
              v-model="picked"
            />
          </div>
        </div>
      </form>
    </div>
    <div
      class="mb-3 d-flex justify-content-center"
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
      searchTerm: "",
      picked: "author",
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
    search() {
      if (this.searchTerm == "") {
        this.$store.dispatch("getBlogs");
      } else {
        this.$store.dispatch("search", {
          searchBy: this.picked,
          searchTerm: this.searchTerm,
        });
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

#radio-section > input {
  margin: 0 5px;
}
</style>
