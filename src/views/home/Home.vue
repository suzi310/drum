<template>
    <el-container class="home-container">
      <el-aside width="320px">
        <user-info></user-info>
        <song-list></song-list>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
// @ is an alias to /src 
import UserInfo from "@/views/home/components/UserInfo.vue";
import SongList from "@/views/home/components/SongList.vue";
import SongInfo from "@/views/home/components/SongInfo.vue";

export default {
  name: "home",
  data(){
    return {

    }
  },
  computed:{
    song() {
      return this.$store.state.currentSong;
    }
  },
  components: {
    UserInfo,
    SongList,
    SongInfo
  }
};
</script>

<style lang="scss" scoped>
$bg: #5c8d89;
$dark: #74b49b;
$mid-c: #a7d7c5;
$light: #f4f9f4;

.home-container {
  height: 100%;
}
.el-aside {
  background-color: $bg;
  color: #333;
}

.el-main {
  background-color: $light;
  color: #333;
}
</style>
