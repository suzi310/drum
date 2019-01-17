<template>
  <div class="user-info">
    <img class="avatar" src="../assets/logo.png">
    <span class="username">{{this.$store.state.user.userName}}</span>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        userName: "admin",
        avatarPath: "./../assets/logo.png"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.user-info {
    height: 90px;
    display: flex;
    align-items: center;
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .username {
        padding-left: 10px;
    }
}
</style>