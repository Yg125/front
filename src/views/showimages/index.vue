<template>
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="image_id" label="镜像ID" align="center">
      </el-table-column>
      <el-table-column prop="image_name" label="镜像名称" align="center">
      </el-table-column>
      <el-table-column prop="tag" label="标签" align="center">
      </el-table-column>
      <el-table-column prop="mem" label="大小" align="center">
      </el-table-column>
      
    </el-table>
  </template>
    
  <script>
  import { getImageList,deleteImage } from '@/api/image'
  export default { 
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
        getImageList().then(response => {
          this.list = response.data.lists
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