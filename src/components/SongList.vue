<template>
  <div class="song-list">
    <ul>
      <li v-for="song in songList" :key="song.name">
        <router-link :to="'/song/'+song.name">{{song.name}}</router-link>
        <div>
                  <el-button type="primary" size="mini" v-if="song.state === '购买'">购买</el-button>
        <el-tag type="success"  size="mini" v-else>{{song.state}}</el-tag>

        </div>
      </li>
    </ul>
    <!-- <el-table
      :data="tableData"
      :show-header="isShowHeader"
      style="width: 100%"
      @row-click="selectSong">
      <el-table-column
        prop="name"
        label="歌曲名"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
        <template slot-scope="scope">
        <el-button v-if="scope.row.state === '购买'"
          type="primary" size="mini">{{scope.row.state}}</el-button>
          <el-tag v-else type="success" size="mini">{{scope.row.state}}</el-tag>
          </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
  export default {
    name: 'SongList',
    data() {
        return {
          isShowHeader: false,
          songList: [{
            name: 'lg',
            state: '已下载',
            url: 'http://localhost:3000/public/lg.mp3',
            author: '音乐家a'
          }, {
            name: 'Light',
            state: '已下载',
            url: 'http://localhost:3000/public/song.ogg',
            author: '音乐家b'
          }, {
            name: '歌曲3',
            state: '购买',
            url: 'http://localhost:3000/public/lg.mp3',
            author: '音乐家a'
          }, {
            name: '歌曲4',
            state: '购买',
            url: 'http://localhost:3000/public/lg.mp3',
            author: '音乐家a'
          }]
        }
      },
      methods:{
        // 单击歌曲事件
        selectSong(row, event, column){
          this.$store.commit('selectSong', {name: row.name, url: row.url, author: row.author});
        }
      }
  }
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
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(45, 126, 126);
  &:hover {
    background-color: darkslategray;
  }
  a {
    flex: 1;
  }
}
</style>