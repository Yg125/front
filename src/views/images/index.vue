<template>
  <div>
    <el-input v-model="params.search" placeholder="请输入镜像名称或者镜像ID进行搜索" @change="fetchImagesList"/>
  <el-table :data="list" border style="width: 100%">
    <el-table-column fixed prop="image_id" label="镜像ID" align="center">
    </el-table-column>
    <el-table-column prop="image_name" label="镜像名称" align="center">
    </el-table-column>
    <el-table-column prop="tag" label="标签" align="center">
    </el-table-column>
    <el-table-column prop="mem" label="大小" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-popconfirm title="您确定删除该镜像吗？" @onConfirm="deleteimage(scope.row.id)">
          <el-button type="danger" size="small" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
      :page-sizes="[2, 10, 20, 50, 100, 200, 300, 400]" :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
  
<script>
import { getImageList,deleteImage } from '@/api/image'
export default { 
  data() {
    return {
      list: null,
      listLoading: true,
      params: {
        'page': 1,
        'page_size': 10,
        'search':''
      },
      total: 0
    }
  },
  created() {
    this.fetchImagesList()
  },
  methods: {
    handleSizeChange(page_size) {
      console.log(`每页 ${page_size} 条`);
      this.params.page_size = page_size
      this.fetchImagesList()
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.params.page = page
      this.fetchImagesList()
    },
    fetchImagesList() {
      this.listLoading = true
      getImageList(this.params).then(response => {
        this.list = response.data.lists
        this.total = response.data.count
        this.listLoading = false
      })
    },
    deleteimage(id){
      deleteImage(id).then(response =>{
        if (response.data.error === undefined)
        {
          this.$message('镜像删除成功')
        }
        else{
          this.$message(response.data.error)
        }
        this.fetchImagesList()
      })
    }
  }
}
</script>