<template>
  <div class="song-info">
    <div class="main" v-show="!isShow">
      <div class="song-msg">
        <h3>{{song.name}}</h3>
        <p>{{song.author}}</p>
      </div>
      <div class="player">
        <player :songUrl="song.url" @showDrum="show"></player>
      </div>
    </div>
    <div class="music" v-show="isShow">
      <div class="drum">
        <div class="line"></div>
      </div>
      <el-button @click="isShow=false">关闭</el-button>
    </div>
  </div>
</template>

<script>
import Player from "./Player";

export default {
  name: "SongInfo",
  data() {
    return {
      isShow: false,
      // songName: "歌曲",
      // songUrl: "http://localhost:3000/public/lg.mp3"
    };
  },
  props: [ "song"],
  computed: {

  },
  components: {
    Player: Player
  },
  mounted() {},
  methods: {
    show() {
      this.isShow = true;
    }
  }
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

.music {
  height: 100%;
  display: flex;
  flex-direction: column;
  .drum {
    position: relative;
    width: 100%;
    flex: 1;
    background-color: #ddd;
    background-image: url("../images/drum.jpg");
    background-repeat: no-repeat;
    background-size: contain ;
    .line {
      position: absolute;
      top: 70px;
      left: 30px;
      width: 3px;
      height: 50px;
      background-color: green;
      animation: move 5s linear;
      // transition: all 10s linear;
    }
  }
  .el-button {
      // width: 30px;
    }
}
@keyframes move {
  to {left: 500px;}
}
</style>