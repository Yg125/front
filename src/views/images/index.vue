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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteimage(scope.row)">
            <el-button type="danger" size="small" slot="reference" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  import { getImagesList } from '@/api/image'
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