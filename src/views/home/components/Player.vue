<template>
  <div v-loading="isLoading">
    <div id="wave"></div>
    <div class="controls-bar">
      <div class="controls">
        <el-button @click="playPause">播放/暂停</el-button>
        <el-button @click="playRegion">区间播放</el-button>
        <el-switch v-model="isLoop" active-text="区间循环" @change="regionLoop"></el-switch>
      </div>
      <div class="timer">{{currentTime | timeFormatter}}/{{duration | timeFormatter}}</div>
    </div>
    <p>start: {{regionStart | timeFormatter}} end:{{regionEnd | timeFormatter}}</p>
    <el-button type @click="showSpectrum">鼓谱</el-button>
    <div class="spectrum-box" v-show="isShow">
      <div class="spectrum">
        <div class="line" :style="lineMove"></div>
      </div>
      <!-- <img src="../../../images/drum.jpg" alt="鼓谱"> -->
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
      isLoading: true,
      currentTime: 0,
      duration: 0,
      lineMove: {
        top: "10%",
        left: "5%",
      }

      // regionStart: 0,
      // regionEnd: 0
    };
  },
  props: ["songUrl"],
  watch: {
    // 监听歌曲url，切换歌曲时销毁并重新创建wavesufer实例
    songUrl() {
      this.destroyAudio();
      this.initAudio();
      this.readyAudio();
      this.processAudio();
    }
  },

  computed: {
    regionStart() {
      return this.duration * 0.3;
    },

    regionEnd() {
      return this.duration * 0.5;
    },
  },

  mounted() {
    this.initAudio();
    this.readyAudio();
    this.processAudio();
  },

  destroyed() {
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

    readyAudio() {
      this.wavesurfer.on("ready", () => {
        this.isLoading = false;
        this.duration = this.wavesurfer.getDuration();
        this.initRegion();
      });
    },

    initRegion() {
      this.region = this.wavesurfer.addRegion({
        id: "region1",
        start: this.regionStart,
        end: this.regionEnd,
        drag: false,
        color: "rgba(0, 205, 205, 0.4)"
      });
      this.region.on("update-end", () => {
        this.regionStart = this.region.start;
        this.regionEnd = this.region.end;
      });
    },

    processAudio() {
      this.wavesurfer.on("audioprocess", () => {
        this.currentTime = this.wavesurfer.getCurrentTime();
      });

      this.wavesurfer.on("seek", progress => {
        this.currentTime = this.duration * progress;
      });
    },

    destroyAudio() {
      this.wavesurfer.destroy();
      this.isLoading = true;
    },

    playPause() {
      this.wavesurfer.playPause();
    },

    playRegion() {
      this.region.play();
    },

    regionLoop() {
      this.region.loop = this.isLoop;
    },

    showSpectrum() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped lang="scss">
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  .controls {
    max-width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
#wave {
  min-width: 300px;
}

.spectrum-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0,0,0, 0.4);

  .spectrum {
    width: 800px;
    height: 1000px;
    margin: 0 auto;
    position: relative;
    background: url("../../../images/drum.jpg") no-repeat;
    background-size: cover;
  }
  .line {
    width: 10px;
    height: 60px;
    background-color: #f00;
    position: absolute;
  }
  .el-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>