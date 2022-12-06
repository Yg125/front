<template>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="image_id"
        label="镜像ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="image_name"
        label="镜像名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mem"
        label="大小"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small" plain>修改</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  import { getImagesList } from '@/api/table'
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
      this.fetchImagesList()
    },
    methods: {
      fetchImagesList() {
        this.listLoading = true
        getImagesList().then(response => {
          this.list = response.data.lists
          this.listLoading = false
        })
      }
    }
  }
  </script>