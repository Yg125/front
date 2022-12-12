<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">容器云平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <div class="tips">
        <el-button type="text" @click="dialogFormVisible = true">注册用户</el-button>
        <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span> -->
      </div>

    </el-form>
    <!-- <el-dialog title="注册" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="增加用户" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="userForm" status-icon :rules="rulesUserForm" ref="userForm" label-width="100px">
        <el-form-item label="角色:" prop="role">
          <el-select v-model="userForm.role" size="small" class="input_width">
            <el-option value="1" label="学生">学生</el-option>
            <el-option value="2" label="老师">老师</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号/职工号:" prop="work_id">
          <el-input type="text" v-model="userForm.work_id" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="userForm.username" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="passcheck">
          <el-input type="password" v-model="userForm.passcheck" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="专业:" prop="department">
          <el-input type="text" v-model="userForm.department" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input type="text" v-model="userForm.phone" autocomplete="off" size="small" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input type="text" v-model="userForm.email" autocomplete="off" size="small" class="input_width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="adduser">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { addUser } from '@/api/user'

export default {
  name: 'Login',
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空!'));
      } else {
        var reUser = /^\w{3,20}$/;
        if (reUser.test(value)) {
          callback()
        } else {
          callback(new Error('用户名是3到20位数字、字母或下划线'));
        }
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空!'));
      } else {
        var rePass = /^[\w!@#$%^&*]{8,20}$/;
        if (rePass.test(value)) {
          callback()
        } else {
          callback(new Error('密码是8到20位数字、字母或下划线以及特殊!@#$%^&*符号'));
        }
      }
    };
    var validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空!'));
      } else {
        var rePhone = /^1[34578]\d{9}$/;
        if (rePhone.test(value)) {
          callback()
        } else {
          callback(new Error('手机格式不正确'));
        }
      }
    };
    
   
    return {
      loginForm: {
        username: 'admin',
        password: 'yg125125'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUserName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassWord }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      userForm: {
        username: '',
        password: '',
        passcheck: '',
        phone: '',
        email: '',
        role: '',
        work_id: '',
        department: '',
      },
      rulesUserForm: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassWord, trigger: 'blur' }
        ],
        passcheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  watch:{
    dialogFormVisible(){
      this.resetForm('userForm')
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    adduser() {
      addUser(this.userForm).then(response => {
        this.resetForm('userForm')
        this.dialogFormVisible = false
      })
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
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

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
