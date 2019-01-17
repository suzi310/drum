<template>
  <div class="home">
    <el-container>
      <el-aside width="320px">
        <user-info></user-info>
        <song-list></song-list>
      </el-aside>
      <el-main>
        <song-info :song="song" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src 
import UserInfo from "@/components/UserInfo.vue";
import SongList from "@/components/SongList.vue";
import SongInfo from "@/components/SongInfo.vue";

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

<style scoped>
.home, .el-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
