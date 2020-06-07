import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
    userPublishedBlogs: [],
    userUnpublishedBlogs: [],
    userComments: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs;
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog;
    },
    addNewBlog(state, blog) {
      state.blogs.push(blog);
    },
    addNewComment(state, comment) {
      state.activeBlog.comments.push(comment);
    },
    removeFromActiveComments(state, commentId) {
      let comments = state.activeBlog.comments;
      let remaining = comments.filter((c) => c.id != commentId);
      let updatedActiveBlog = { ...state.activeBlog };
      updatedActiveBlog.comments = remaining;
      state.activeBlog = updatedActiveBlog;
    },
    setUserPublishedBlogs(state, publishedBlogs) {
      state.userPublishedBlogs = publishedBlogs;
    },
    setUserUnpublishedBlogs(state, unPublishedBlogs) {
      state.userUnpublishedBlogs = unPublishedBlogs;
    },
    setUserComments(state, comments) {
      state.userComments = comments;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("blogs");
        commit("setBlogs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogById({ commit, dispatch }, id) {
      try {
        let res = await api.get("blogs/" + id);
        const dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        let date = new Date(res.data.blog.createdAt);
        res.data.blog.creationDate = date.toLocaleDateString(
          "en-US",
          dateOptions
        );
        commit("setActiveBlog", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createNewPost({ commit, dispatch }, newPost) {
      try {
        let res = await api.post("blogs", newPost);
        commit("addNewBlog", res.data);
        if (res.data.published) {
          router.push({ name: "BlogDetail", params: { id: res.data._id } });
        } else {
          router.push({ name: "Profile" });
        }
        dispatch("getBlogs");
      } catch (error) {
        console.error(error);
      }
    },
    async editBlog({ commit, dispatch }, updatedBlogPost) {
      try {
        let res = await api.put("blogs/" + updatedBlogPost.id, updatedBlogPost);
        commit("setActiveBlog", res.data);
        dispatch("getUserBlogs");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBlog({ commit, dispatch }, id) {
      try {
        let res = await api.delete("blogs/" + id);
        router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post("comments", newComment);
        commit("addNewComment", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, comment) {
      try {
        let res = await api.put("comments/" + comment.id, comment);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, id) {
      try {
        let res = await api.delete("comments/" + id);
        commit("removeFromActiveComments", id);
        console.log("made it past commit");
      } catch (error) {
        console.log(error);
      }
    },
    async getUserBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("profile/blogs");
        let published = [];
        let unpublished = [];
        let data = res.data;
        data.forEach((c) => {
          if (c.published) {
            published.push(c);
          } else {
            unpublished.push(c);
          }
        });
        commit("setUserPublishedBlogs", published);
        commit("setUserUnpublishedBlogs", unpublished);
      } catch (error) {
        console.error(error);
      }
    },

    async getUserComments({ commit, dispatch }) {
      try {
        let res = await api.get("profile/comments");
        commit("setUserComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async searchByAuthor({ commit, dispatch }, searchEmail) {
      try {
        let res = await api.get("blogs/?creatorEmail=" + searchEmail);
        commit("setBlogs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
