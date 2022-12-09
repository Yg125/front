<template>
    <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="文件名" align="center">
        </el-table-column>
        <el-table-column prop="size" label="文件大小" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-popconfirm title="您确定构建该镜像吗？" @onConfirm="buildimage(scope.row.name)">
          <el-button type="primary" size="small" slot="reference" plain>构建镜像</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
</template>

<script>
import { getFileList } from '@/api/files'
import { BuildImage } from '@/api/image'
export default {
    data() {
        return {
           list: null, 
        }
    },
    mounted() {
        this.getfilelist()
    },
    methods: {
        getfilelist(){
            getFileList().then(response => {
                this.list = response.data.lists
            })
        },
        buildimage(name){
            BuildImage(name).then(response =>{
                this.$message('构建镜像完成，该镜像可供选择')
            })
        }
    }
}
</script>