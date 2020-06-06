<template>
  <div class="blog-detail container">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-center">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ activeBlog.title }}</h4>
            <h6>
              by {{ activeBlog.creatorEmail }} - {{ activeBlog.creationDate }}
            </h6>
            <p class="card-text">{{ activeBlog.body }}</p>
            <div v-if="isAuthor">
              <form v-if="editForm" @submit.prevent="editBlog">
                <input
                  type="text"
                  placeholder="update text"
                  v-model="activeBlog.body"
                />
                <button class="btn btn-primary" type="submit">submit</button>
              </form>
              <button class="btn btn-info" @click="editForm = !editForm">
                Edit Post
              </button>
              <button class="btn btn-danger" @click="deleteBlog">
                Delete Post
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div>
            <form @submit.prevent="addComment">
              <input type="text" v-model="newComment.body" />
              <button class="btn btn-primary" type="submit">
                Add Comment
              </button>
            </form>
          </div>
        </div>
        <div class="card">
          <comment
            v-for="comment in activeBlogComments"
            :key="comment.id"
            :comment="comment"
          />
        </div>

        <!-- {{ activeBlogObject }} -->
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";

export default {
  name: "BlogDetail",
  mounted() {
    this.$store.dispatch("getBlogById", this.$route.params.id);
  },
  data() {
    return {
      newComment: {
        blogId: this.$route.params.id,
        creatorEmail: this.$store.state.profile.email,
      },
      editForm: false,
    };
  },
  computed: {
    activeBlogObject() {
      return this.$store.state.activeBlog;
    },
    activeBlog() {
      return this.$store.state.activeBlog.blog;
    },
    activeBlogComments() {
      return this.$store.state.activeBlog.comments;
    },

    profileEmail() {
      return this.$store.state.profile.email;
    },
    isAuthor() {
      return this.$store.state.profile.email == this.activeBlog.creatorEmail;
    },
  },
  methods: {
    editBlog() {
      this.$store.dispatch("editBlog", this.activeBlog);
      this.editForm = false;
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.activeBlog.id);
    },
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {
        blogId: this.$route.params.id,
        creatorEmail: this.$store.state.profile.email,
      };
    },
  },
  components: {
    Comment,
  },
};
</script>

<style scoped></style>
