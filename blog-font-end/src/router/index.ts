import { createWebHistory, createRouter } from "vue-router";
const HomePage = () => import('../views/Home.vue')
const MyProfile = () => import('../views/MyProfile.vue')

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "HomePage",
    component: HomePage
  },
  {
    path:'/HomePage',
    name: "HomePage",
    component: HomePage
  },
  {
    path:'/MyProfile',
    name: "MyProfile",
    component: MyProfile
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;