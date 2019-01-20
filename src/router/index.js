import Vue from "vue";
import Router from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Index from "../views/home/components/Index.vue";
import Player from "../views/home/components/Player.vue";
import SongInfo from "../views/home/components/SongInfo.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index",
      name: "home",
      component: Home,
      children: [
        {
          path: '/index',
          component: Index
        },
        {
          path: 'song/:name',
          component: SongInfo
        }
      ]

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
    },
    // {
    //   path:"/test/",
    //   name: "test",
    //   component: Test,
    //   children: [
    //     {
    //       path: 'song/:name',
    //       component: Song
    //     }
    //   ]
    // }
  ]
});
