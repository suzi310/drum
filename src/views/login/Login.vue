<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
      label-position="left"
    >
      <h3 class="title">Title</h3>
      <el-form-item prop="userName">
        <span class="icon-container">
          <v-icon name="user"/>
        </span>
        <el-input
          type="text"
          v-model="loginForm.userName"
          name="userName"
          autocomplete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="icon-container">
          <v-icon name="lock"/>
        </span>
        <el-input
          :type="pwdType"
          name="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          @keyup.enter="submitForm"
        />
        <span class="show-pwd" @click="showPwd">
          <v-icon name="eye" :class="showPwdClass"/>
        </span>
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
  computed:{
    showPwdClass(){
      if(this.pwdType === "password"){
        return "";
      }else {
        return "pwd-see";
      }
    }
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
    showPwd(){
      if(this.pwdType === "password") {
        this.pwdType = "text";
      }else {
        this.pwdType = "password";
      }
    },
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
$bg: #5c8d89;
$dark: #74b49b;
$light: #f4f9f4;
$input-bg: #537F7B;
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
    width: 85%;
    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      -webkit-appearance: none;
      color: $light;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $input-bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid $input-bg;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.icon-container {
  display: inline-block;
  width: 30px;
  padding-left: 15px;
  vertical-align: middle;
  font-size: 1.5em;
  color: $light;
}

.show-pwd {
    position: absolute;
    right: 15px;
    top: 3px;
    font-size: 1.5em;
    color: $dark;
    cursor: pointer;
    user-select: none;
}

.pwd-see {
  color: $light;
}
</style>


