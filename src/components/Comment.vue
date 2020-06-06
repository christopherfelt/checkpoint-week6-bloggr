<template>
  <div>
    <h6>{{ comment.creatorEmail }}</h6>
    <p>{{ comment.body }}</p>
    <div v-if="isAuthor">
      <form v-if="editForm" @submit.prevent="editComment">
        <input type="text" placeholder="update text" v-model="comment.body" />
        <button class="btn btn-primary" type="submit">submit</button>
      </form>
      <button class="btn btn-info" @click="editForm = !editForm">
        Edit Comment
      </button>
      <button class="btn btn-danger" @click="deleteComment">
        Delete Comment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      editForm: false,
    };
  },
  props: ["comment"],
  computed: {
    isAuthor() {
      return this.$store.state.profile.email == this.comment.creatorEmail;
    },
  },
  methods: {
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.editForm = false;
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment.id);
    },
  },
  components: {},
};
</script>

<style scoped></style>
