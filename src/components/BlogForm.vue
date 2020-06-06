<template>
  <div class="blog-form">
    <form class="form" @submit.prevent="newPost">
      <div class="form-group">
        <label for="blog-title">Title</label>
        <input
          type="text"
          name="blog-title"
          id="blog-title"
          class="form-control"
          placeholder="blog title"
          v-model="newBlogPost.title"
        />
        <input
          type="text"
          name="blog-body"
          id="blog-body"
          class="form-control"
          placeholder="What do you want to say?"
          v-model="newBlogPost.body"
        />
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "BlogForm",
  data() {
    return {
      newBlogPost: {},
    };
  },
  computed: {},
  methods: {
    newPost() {
      this.$store.dispatch("createNewPost", this.newBlogPost);
      this.newBlogPost = {};
    },
  },
  components: {},
};
</script>

<style scoped></style>
