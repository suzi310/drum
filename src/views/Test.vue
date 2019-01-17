<template>
  <div class="test">
    <el-container>
      <el-aside>
        <ul>
          <li v-for="(song, index) in list" :key="index">
            <router-link :to="'/test/song/'+song.name">{{song.name}}</router-link>
          </li>
        </ul>
      </el-aside>
      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      list: []
    };
  },
  created() {
    // 请求歌曲列表数据...
    this.list = [
      {
        name: "歌曲1",
        state: "已下载",
        url: "http://localhost:3000/public/lg.mp3",
        author: "音乐家a"
      },
      {
        name: "歌曲2",
        state: "已下载",
        url: "http://localhost:3000/public/song.ogg",
        author: "音乐家b"
      },
      {
        name: "歌曲3",
        state: "购买",
        url: "http://localhost:3000/public/lg.mp3",
        author: "音乐家a"
      },
      {
        name: "歌曲4",
        state: "购买",
        url: "http://localhost:3000/public/lg.mp3",
        author: "音乐家a"
      }
    ];
  }
};
</script>

<style scoped>
.el-container {
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
.test {
  height: 100%;
}

li {
    list-style-type: none;
    height: 30px;
}
</style>