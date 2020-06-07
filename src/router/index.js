import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Profile from "../pages/Profile.vue";
// @ts-ignore
import BlogDetail from "../pages/BlogDetail.vue";
// @ts-ignore
import About from "../pages/About.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/:id",
    name: "BlogDetail",
    component: BlogDetail,
    // beforeEnter: authGuard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    // beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
