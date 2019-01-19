<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
      label-position="left"
    >
      <h3 class="title">Title</h3>
      <el-form-item prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          name="userName"
          autocomplete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          name="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          @keyup.enter="submitForm"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submitForm" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ]
      },
      loading: false,
      pwdType: "password",
      redirect: null
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loding = true;
          this.$router.push({ path: this.redirect || "/" });
          this.$store.commit("setUserName", this.loginForm.userName);
          console.log("登录成功");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylescheet/scss" lang="scss" scope>
$bg: #2d3a4b;
$dark: #889aa4;
$light: #eee;
.login-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: $bg;
  .login-form {
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 120px 20px;
  }
  .title {
    font-size: 2.6rem;
    color: $light;
    text-align: center;
  }
  .el-input {
    display: inline-block;
    // height: 100%;
    width: 85%;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      padding: 12px 5px;
      color: $light;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
      .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
}
</style>


