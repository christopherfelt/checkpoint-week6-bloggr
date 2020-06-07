<template>
  <div class="blog-form">
    <div>
      <button class="btn btn-primary mb-2" @click="openForm = !openForm">
        Add Post
      </button>
    </div>
    <div id="form-section" class="card p-2" v-if="openForm">
      <form id="blog-form" class="form" @submit.prevent="newPost">
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
          <label for="blog-title">Text</label>
          <input
            type="text"
            name="blog-body"
            id="blog-body"
            class="form-control"
            placeholder="What do you want to say?"
            v-model="newBlogPost.body"
          />
          <label for="published" class="">Publish?</label>
          <input
            type="checkbox"
            name="published"
            id="published"
            class="form-check-input ml-3 mt-3"
            v-model="newBlogPost.published"
          />
          <input
            type="text"
            name="blog-tags"
            id="blog-tags"
            class="form-control "
            placeholder="Tags?"
            v-model="newBlogPost.tagString"
          />

          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogForm",
  data() {
    return {
      newBlogPost: {
        published: false,
      },
      openForm: false,
    };
  },
  computed: {},
  methods: {
    newPost() {
      try {
        let tags = this.newBlogPost.tagString.split(", ");
        this.newBlogPost.tags = tags;
      } catch (error) {
        console.warn("No tags added");
      }
      this.$store.dispatch("createNewPost", this.newBlogPost);
      this.newBlogPost = {};
    },
  },
  components: {},
};
</script>

<style scoped>
#blog-body {
  height: 200px;
}

.form-control {
  width: 400px;
  margin: 5px 0;
}

#blog-form {
  text-align: left;
}
</style>
