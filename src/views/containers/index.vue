<template>
  <div>
    <el-input v-model="params.search" placeholder="请输入容器名称或者容器ID进行搜索" @change="fetchContainersList" />
    <el-table :data="list" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
      <el-table-column fixed prop="container_id" label="容器ID" align="center">
      </el-table-column>
      <el-table-column prop="name" label="容器名称" align="center">
      </el-table-column>
      <!-- <el-table-column
        prop="ip_address"
        label="使用IP"
        align="center">
      </el-table-column> -->
      <el-table-column prop="port" label="端口号" align="center">
      </el-table-column>
      <el-table-column prop="status" label="容器状态" align="center">
      </el-table-column>
      <el-table-column prop="courses.name" label="使用课程" align="center">
      </el-table-column>
      <el-table-column prop="image.image_id" label="相关镜像id" align="center">
      </el-table-column>
      <el-table-column prop="users.username" label="使用者" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <div>
            <el-link v-show="(scope.row.status !== 'exited')"
              :href="'http://127.0.0.1:8888/?hostname=127.0.0.1&username=root&password=' + pass + '&port=' + scope.row.port"
              target="_blank" type="primary" width="100px">连接</el-link>
          </div>
          <el-button v-show="(scope.row.status !== 'exited')" @click="stopcontainer(scope.row.container_id)"
            type="primary" size="mini" plain>停止</el-button>
          <el-button v-show="(scope.row.status === 'exited')" @click="startcontainer(scope.row.container_id)"
            type="primary" size="mini" plain>启动</el-button>
          <el-popconfirm v-show="scope.row.status !== 'exited'" title="该容器还在运行，确定删除吗？"
            @onConfirm="removecontainer(scope.row.id)">
            <el-button type="danger" size="mini" slot="reference" plain>删除</el-button>
          </el-popconfirm>
          <el-popconfirm v-show="(scope.row.status === 'exited')" title="确定删除吗？"
            @onConfirm="removecontainer(scope.row.id)">
            <el-button type="danger" size="mini" slot="reference" plain>删除</el-button>
          </el-popconfirm>
          <el-button type="primary" size="mini"
            @click="pop_show = true; commitForm.container_id = scope.row.container_id">构建镜像</el-button>
          <el-dialog title="构建镜像" :visible.sync="pop_show" append-to-body>
            <el-form :model="commitForm" ref="commitForm" status-icon label-width="100px">
              <el-form-item label="容器id:">
                <el-input type="text" v-model="commitForm.container_id" autocomplete="off" size="small"
                  class="input_width" disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="repository:">
                <el-input type="text" v-model="commitForm.repository" autocomplete="off" size="small"
                  class="input_width"></el-input>
              </el-form-item>
              <el-form-item label="tag:">
                <el-input type="text" v-model="commitForm.tag" autocomplete="off" size="small"
                  class="input_width"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="commitImage">提交</el-button>
                <el-button @click="resetForm('commitForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
      :page-sizes="[2, 10, 20, 50, 100, 200, 300, 400]" :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-tag size="large">总容器数 {{ number }}</el-tag>
  </div>
</template>
  
<script>
import { getContainersList, getTotalContainers, StartContainer, StopContainer, RemoveContainer, CommitContainer } from '@/api/container'
export default {
  data() {
    return {
      list: null,
      Loading: true,
      number: 0,
      params: {
        'page': 1,
        'page_size': 10,
        'search': ''
      },
      commitForm: {
        container_id: '',
        tag: '',
        repository: ''
      },
      total: 0,
      pop_show: false,
      pass: btoa('123456'),
    }
  },
  mounted() {
    this.fetchContainersList(),
      this.fetchAllContainers()
  },
  methods: {
    handleSizeChange(page_size) {
      console.log(`每页 ${page_size} 条`);
      this.params.page_size = page_size
      this.fetchContainersList()
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.params.page = page
      this.fetchContainersList()
    },
    fetchContainersList() {
      this.Loading = true
      getContainersList(this.params).then(response => {
        this.list = response.data.lists
        this.total = response.data.count
        this.Loading = false
      })
    },
    fetchAllContainers() {
      getTotalContainers().then(response => {
        this.number = response.data.number
      })
    },
    startcontainer(id) {
      StartContainer(id).then(response => {
        this.fetchContainersList()
        this.$message('开启容器成功')
      })
    },
    stopcontainer(id) {
      StopContainer(id).then(response => {
        this.fetchContainersList()
        this.$message('停止容器成功')
      })
    },
    removecontainer(id) {
      RemoveContainer(id).then(response => {
        this.fetchContainersList()
        this.fetchAllContainers()
        this.$message('删除容器成功')
      })
    },
    commitImage() {
      console.log(this.commitForm)
      CommitContainer(this.commitForm).then(response => {
        this.resetForm('commitForm')
        this.pop_show = false
        this.$message('构建镜像成功')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>