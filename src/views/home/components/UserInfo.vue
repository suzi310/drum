<template>
  <div class="user-info-container">
    <img class="avatar" src="../../../images/drum.jpg">
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
        avatarPath: "../../../images/drum.jpg"
      }
    };
  }
};
</script>

<style lang="scss" scoped>

.user-info-container {
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