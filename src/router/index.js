import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Test from "../views/Test.vue";
import Player from "../components/Player.vue";
import SongInfo from "../components/SongInfo.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
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
