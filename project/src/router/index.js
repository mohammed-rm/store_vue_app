import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "../firebase.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "LogIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogIn.vue")
  },
  {
    path: "/documentation",
    name: "Documentation",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Documentation.vue")
  },
  {
    path: "/admin",
    name: "Administration",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: "/materiel/:id",
    name: "Materiel",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/Materiel/Materiel.vue"
      ),
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: "/admin/user/:id",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/User/User.vue"),
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: "/pageNotFound",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/notFound.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/pageNotFound"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth && !firebase.auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
