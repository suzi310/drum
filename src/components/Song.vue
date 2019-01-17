<template>
  <div>{{this.$route.params.name}}</div>
</template>

<script>
export default {
  name: "Song",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(from,to)
    }
  }
};
</script>

<style scoped>
</style>