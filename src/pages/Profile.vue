<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <div class="container">
      <div class="row">
        <div class="col">
          <h2>Published Blogs</h2>
          <Blog
            v-for="blog in userPublishedBlogs"
            :key="blog._id"
            :blogProp="blog"
          />
        </div>
        <div class="col">
          <h2>Blog Drafts</h2>
          <draft
            v-for="draft in userUnpublishedBlogs"
            :key="draft._id"
            :draft="draft"
          />
        </div>
        <div class="col">
          <h2>Comments</h2>
          <div v-for="comment in userComments" :key="comment._id" class="card">
            <router-link
              :to="{ name: 'BlogDetail', params: { id: comment.blogId } }"
            >
              <div class="card-body">
                <h4 class="card-title">{{ comment.body }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from "@/components/BlogComponent.vue";
import Draft from "@/components/UnpublishedBlog.vue";

export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getUserBlogs");
    this.$store.dispatch("getUserComments");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    userPublishedBlogs() {
      return this.$store.state.userPublishedBlogs;
    },
    userUnpublishedBlogs() {
      return this.$store.state.userUnpublishedBlogs;
    },
    userComments() {
      return this.$store.state.userComments;
    },
  },
  components: {
    Blog,
    Draft,
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
