<template>
  <div>
    <div id="wave"></div>
    <div class="controls">
      <el-button @click="showDrum">乐谱</el-button>
      <el-button @click="playPause">播放/暂停</el-button>
      <el-button @click="playRegion">区间播放</el-button>
      <el-switch v-model="isLoop" active-text="循环" @change="regionLoop"></el-switch>
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
      isLoop: false
    };
  },
  props: ["songUrl"],
  mounted() {
    this.initAudio();
    this.initRegion();
  },
  destroyed(){
    this.region.destroy();
    this.wavesurfer.destroy();
  },
  methods: {
    initAudio() {
      this.wavesurfer = WaveSurfer.create({
        container: "#wave",
        plugins: [Regions.create({})]
      });
      this.wavesurfer.load(this.songUrl);
    },

    initRegion() {
      this.wavesurfer.on("ready", () => {
        this.region = this.wavesurfer.addRegion({
          id: "region1",
          start: 3,
          end: 50,
          drag: false,
          color: "rgba(0, 205, 205, 0.4)"
        });
      });
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
    }
  }
};
</script>

<style scoped>
.controls {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>