<template>
  <div v-loading="isLoading">
    <div id="wave"></div>
    <div class="controls">
      <el-button @click="showDrum">乐谱</el-button>
      <el-button @click="playPause">播放/暂停</el-button>
      <el-button @click="playRegion">区间播放</el-button>
      <el-switch v-model="isLoop" active-text="循环" @change="regionLoop"></el-switch>
    </div>
    <el-button type="" @click="test">test</el-button>
    <div class="test" v-show="isShow">
      <el-button type="default" @click="isShow=false">关闭</el-button>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";
export default {
  name: "Player",
  data() {
    return {
      isLoop: false,
      isShow: false,
      isLoading: true
    };
  },
  props: ["songUrl"],
  watch:{
    // 监听歌曲url，切换歌曲时销毁并重新创建wavesufer实例
    songUrl(){
      this.destroyAudio();
      this.initAudio();
      this.initRegion();
    }
  },
  mounted() {
    this.initAudio();
    this.initRegion();
  },
  destroyed(){
    this.wavesurfer.destroy();    
  },
  methods: {
    initAudio() {
      this.wavesurfer = WaveSurfer.create({
        container: "#wave",
        // maxCanvasWidth: 300,
        responsive: true,
        plugins: [Regions.create({})]
      });
      this.wavesurfer.load(this.songUrl);
    },

    initRegion() {
      this.wavesurfer.on('loading', ()=>{
        console.log('loading...')
      });
      this.wavesurfer.on("ready", () => {
        this.region = this.wavesurfer.addRegion({
          id: "region1",
          start: 3,
          end: 50,
          drag: false,
          color: "rgba(0, 205, 205, 0.4)"
        });
        this.isLoading = false;
      });
    },

    destroyAudio(){
      this.wavesurfer.destroy();
    },

    showDrum() {
      this.$emit("showDrum");
    },

    playPause() {
      this.wavesurfer.playPause();
    },
    
    playRegion(){
      this.region.play();
    },

    regionLoop(){
      this.region.loop = this.isLoop;
    },

    test(){
      this.isShow = ! this.isShow;
    }
  }
};
</script>

<style scoped lang="scss">
#wave {
  min-width: 300px;
}
.controls {
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(5, 5, 5, 0.5) url('../images/drum.jpg') no-repeat top center;
  background-size: contain;
  z-index: 100;
  text-align: right;
}
</style>