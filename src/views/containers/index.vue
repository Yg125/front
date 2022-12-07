<template>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="container_id"
        label="容器ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="容器名称"
        align="center">
      </el-table-column>
      <!-- <el-table-column
        prop="ip_address"
        label="使用IP"
        align="center">
      </el-table-column> -->
      <el-table-column
        prop="port"
        label="端口号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="容器状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop="courses.name"
        label="使用课程"
        align="center">
      </el-table-column>
      <el-table-column
        prop="image.image_name"
        label="相关镜像"
        align="center">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini" plain>停止</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="mini" plain>启动</el-button> 
          <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button type="danger" size="mini" slot="reference" plain>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  import { getContainersList } from '@/api/container'
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchContainersList()
    },
    methods: {
      fetchContainersList() {
        this.listLoading = true
        getContainersList().then(response => {
          this.list = response.data.lists
          this.listLoading = false
        })
      }
    }
  }
  </script>