<template>
  <div class="song-info">
    <div class="main" v-show="!isShow">
      <div class="song-msg">
        <h3>{{this.$route.params.name}}</h3>
        <p>xxx</p>
      </div>
      <div class="player">
        <player :songUrl="songUrl"></player>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/views/home/components/Player";

export default {
  name: "SongInfo",
  data() {
    return {
      isShow: false,
      // songName: "歌曲",
      songUrl: "http://localhost:5000/public/"+this.$route.params.name+".mp3"
    };
  },
  watch:{
    $route(to, from){
      if(to.path !== from.path){
        this.songUrl="http://localhost:5000/public/"+this.$route.params.name+".mp3"
      }
    }
  },
  created(){
    // 查询歌曲信息

  },
  components: {
    Player: Player
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.song-info {
  height: 100%;
}
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: space-around;
}

.player {
  width: 100%;
}

</style>