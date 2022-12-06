<template>
  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="课程名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="env"
      label="实验环境"
      align="center">
    </el-table-column>
    <el-table-column
      prop="number"
      label="所选人数"
      align="center">
    </el-table-column>
    <el-table-column
      prop="create_by"
      label="创建者"
      align="center">
    </el-table-column>
    <el-table-column
      prop="image"
      label="所用镜像"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small" plain>修改</el-button>
        <span></span>
        <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getCoursesList } from '@/api/table';
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
    this.fetchCoursesList()
  },
  methods: {
    fetchCoursesList() {
      this.listLoading = true
      getCoursesList().then(response => {
        this.list = response.data.lists
        this.listLoading = false
      })
    }
  }
}
</script>