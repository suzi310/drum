<template>
  <div v-loading="isLoading">
    <div id="wave"></div>
    <div class="controls-bar">
      <div class="controls" v-show="!isLoading">
        <el-button @click="playPause" type="primary">
          <span class="icon-container">
            <v-icon :name="isPlaying ? 'pause' : 'play'"></v-icon>
          </span>
        </el-button>
        <el-button @click="playRegion">区间播放</el-button>
        <el-switch v-model="isLoop" active-text="区间循环" @change="regionLoop"></el-switch>
      </div>
      <p>start: {{regionStart | timeFormatter}} end:{{regionEnd | timeFormatter}}</p>
      <el-button type @click="showSpectrum">鼓谱</el-button>

      <div class="timer">{{currentTime | timeFormatter}}/{{duration | timeFormatter}}</div>
    </div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="机器人">
        <el-select 
          v-model="robots" 
          multiple 
          placeholder="请选择机器人">
          <el-option
            v-for="item in robotList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.state ==='离线'"
          >{{item.label}} <el-tag :type="item.state === '在线'?'success': 'danger'">{{item.state}}</el-tag></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleDownload">下载</el-button>
      </el-form-item>
    </el-form>
    <div class="spectrum-box" v-show="isShow">
      <div class="spectrum">
        <div class="line" :style="lineMove"></div>
      </div>
      <el-button type="default" @click="isShow=false">关闭</el-button>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";

const INIT_LEFT = 5; // 鼓谱进度线距离最左端的初始值
const INIT_TOP = 7; // 鼓谱进度线距离最顶端的初始值
const ROW_END = 73.5;  // 鼓谱一行结束时进度线left的百分值
const SPACE = 11; // 鼓谱的行距
const ROW_TIME = 30; // 一行鼓谱等于歌曲时长的秒数 30
const RATE = ROW_END / ROW_TIME; // 倍率 鼓谱进度线移动距离比歌曲进度 

export default {
  name: "Player",
  data() {
    return {
      isLoop: false,
      isShow: false,
      isLoading: true,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      regionStart: 10,
      regionEnd: 40,
      robotList: [
        {
          value: "robot1",
          label: "机器人1",
          state: "在线"
        },
        {
          value: "robot2",
          label: "机器人2",
          state: "在线"
        },
        {
          value: "robot3",
          label: "机器人3",
          state: "在线"
        },
        {
          value: "robot4",
          label: "机器人4",
          state: "离线"
        },
        {
          value: "robot5",
          label: "机器人5",
          state: "离线"
        }
      ],
      robots: []
    };
  },

  props: ["songUrl"],

  watch: {
    // 监听歌曲url，切换歌曲时销毁并重新创建wavesufer实例
    songUrl() {
      this.isLoading = true;
      this.destroyAudio();
      this.initAudio();
      this.readyAudio();
    }
  },

  computed: {
    lineMove() {
      let process = (this.currentTime / this.duration) * 100; // 歌曲进度百分值
      let left = INIT_LEFT + (this.currentTime % ROW_TIME) * RATE;
      let top = INIT_TOP + SPACE * Math.floor(this.currentTime / ROW_TIME);
      return {
        top: `${top}%`,
        left: `${left}%`
      };
    }
  },

  mounted() {
    this.initAudio();
    this.readyAudio();
  },

  beforeDestroy() {
    this.destroyAudio();
  },
  methods: {
    initAudio() {
      this.wavesurfer = WaveSurfer.create({
        container: "#wave",
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

      this.wavesurfer.on("audioprocess", () => {
        this.currentTime = this.wavesurfer.getCurrentTime();
      });

      this.wavesurfer.on("seek", progress => {
        this.currentTime = this.duration * progress;
      });

      this.wavesurfer.on("play", () => {
        this.isPlaying = true;
      });

      this.wavesurfer.on("pause", () => {
        this.isPlaying = false;
      });
    },

    initRegion() {
      this.regionStart = this.duration * 0.3;
      this.regionEnd = this.duration * 0.6;
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

    destroyAudio() {
      if (this.wavesurfer) {
        this.wavesurfer.destroy();
      }
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
    },

    handleDownload(){
      console.log("下载！")
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
  background-color: rgba(0, 0, 0, 0.4);

  .spectrum {
    width: 800px;
    height: 1000px;
    margin: 0 auto;
    position: relative;
    background: url("../../../images/rock.jpg") no-repeat;
    background-size: contain;
  }
  .line {
    width: 10px;
    height: 100px;
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