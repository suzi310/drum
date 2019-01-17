<template>
  <div class="song-list">
    <el-table
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
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'SongList',
    data() {
        return {
          isShowHeader: false,
          tableData: [{
            name: '歌曲1',
            state: '已下载',
            url: 'http://localhost:3000/public/lg.mp3',
            author: '音乐家a'
          }, {
            name: '歌曲2',
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

<style scoped>

</style>