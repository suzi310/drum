<template>
  <div class="song-list">
    <ul>
      <li v-for="song in songList" :key="song.name">
        <router-link :to="'/song/'+song.name">{{song.name}}</router-link>
        <div>
          <el-button type="primary" size="mini" v-if="song.state === '购买'">购买</el-button>
          <el-tag type="success" size="mini" v-else>{{song.state}}</el-tag>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongList",
  data() {
    return {
      isShowHeader: false,
      songList: [
        {
          name: "lg",
          state: "已下载",
          url: "http://localhost:3000/public/lg.mp3",
          author: "音乐家a"
        },
        {
          name: "Light",
          state: "已下载",
          url: "http://localhost:3000/public/song.ogg",
          author: "音乐家b"
        },
        {
          name: "rock",
          state: "购买",
          url: "http://localhost:3000/public/rock.mp3",
          author: "音乐家a"
        },
        {
          name: "歌曲4",
          state: "购买",
          url: "http://localhost:3000/public/lg.mp3",
          author: "音乐家a"
        }
      ]
    };
  },
  methods: {
    // 单击歌曲事件
    selectSong(row, event, column) {
      this.$store.commit("selectSong", {
        name: row.name,
        url: row.url,
        author: row.author
      });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style-type: none;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(45, 126, 126);
  &:hover {
    background-color: darkslategray;
  }
  a {
    padding: 0 10px;
    flex: 1;
  }
}
</style>
