<template>
  <div class="app-container">
    <el-input v-model="params.search" placeholder="请输入用户名、工号进行搜索" @change="fetchUsersList"/>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="Work_ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.work_id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="电话号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span v-show="(scope.row.role === 1)">
            学生
          </span>
          <span v-show="(scope.row.role === 2)">
            老师
          </span>
          <span v-show="(scope.row.role === 3)">
            超级管理员
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="visible = true; userForm = scope.row">修改</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteuser(scope.row)">
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
      :page-sizes="[2, 10, 20, 50, 100, 200, 300, 400]" :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="修改用户" :visible.sync="visible">
      <el-form :model="userForm">
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="userForm.username" autocomplete="off" size="small" class="input_width"
            disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off" size="small" class="input_width"
            disabled></el-input>
        </el-form-item>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="updateuser">确 定</el-button>
      </div>
    </el-dialog>

    <el-button type="primary" size="small" @click="pop_show = true">增加用户</el-button>
    <el-dialog title="增加用户" :visible.sync="pop_show" append-to-body>
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
import { getUsersList, deleteUser, updateUser, addUser } from '@/api/user'

export default {

  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空!'));
      } else {
        var reUser = /^\w{5,20}$/;
        if (reUser.test(value)) {
          callback()
        } else {
          callback(new Error('用户名是5到20位数字、字母或下划线'));
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
      list: null,
      listLoading: true,
      visible: false,
      pop_show: false,
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
      params: {
        'page': 1,
        'page_size': 10,
        'search':''
      },
      total: 0
    }
  },
  watch: {
    visible() {
      this.fetchUsersList()
      this.resetForm('userForm')
    },
    pop_show() {
      this.resetForm('userForm')
    }
  },
  created() {
    this.fetchUsersList()
  },
  methods: {
    handleSizeChange(page_size) {
      console.log(`每页 ${page_size} 条`);
      this.params.page_size = page_size
      this.fetchUsersList()
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.params.page = page
      this.fetchUsersList()
    },
    fetchUsersList() {
      this.listLoading = true
      getUsersList(this.params).then(response => { 
        console.log(response.data)
        this.list = response.data.lists
        this.total = response.data.count
        this.listLoading = false
      })
    },
    adduser() {
      addUser(this.userForm).then(response => {
        this.fetchUsersList()
        this.resetForm('userForm')
        this.pop_show = false
      })
    },
    deleteuser(row) {
      deleteUser(row.id).then(response => {
        console.log('deleteBook ========> ', response)
        this.fetchUsersList()
      })
    },
    updateuser() {
      console.log(this.userForm.id)
      updateUser(this.userForm.id, this.userForm).then(response => {
        this.fetchUsersList()
      })
      this.visible = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.input_width {
  width: 250px;
}
</style>
