import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Player from "../components/Player.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/player",
      name: "player",
      component: Player
    }
  ]
});
