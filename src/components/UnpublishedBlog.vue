<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{ draft.title }}</h4>
      <div id="form-section" class="card p-2" v-if="editForm">
        <form id="blog-form" class="form" @submit.prevent="editDraft">
          <div class="form-group">
            <label for="blog-title">Title</label>
            <input
              type="text"
              name="blog-title"
              id="blog-title"
              class="form-control"
              placeholder="blog title"
              v-model="draft.title"
            />
            <label for="blog-title">Text</label>
            <input
              type="text"
              name="blog-body"
              id="blog-body"
              class="form-control"
              placeholder="What do you want to say?"
              v-model="draft.body"
            />
            <label for="published" class="">Publish?</label>
            <input
              type="checkbox"
              name="published"
              id="published"
              class="form-check-input ml-3 mt-2"
              v-model="draft.published"
            />
            <input
              type="text"
              name="blog-tags"
              id="blog-tags"
              class="form-control "
              placeholder="Tags?"
              v-model="tags"
            />

            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <button class="btn btn-info" @click="editForm = !editForm">
        Edit Post
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnpublishedBlog",
  mounted() {
    // this.draft.tags = this.draft.tags.join(", ");
  },
  data() {
    return {
      editForm: false,
      tags: this.draft.tags.join(", "),
    };
  },
  props: ["draft"],
  computed: {},
  methods: {
    editDraft() {
      let tags = this.tags.split(", ");
      this.draft.tags = tags;
      this.$store.dispatch("editBlog", this.draft);
      this.editForm = false;
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
