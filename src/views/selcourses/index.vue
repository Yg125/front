<template>
    <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column prop="name" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="env" label="实验环境" align="center">
        </el-table-column>
        <el-table-column prop="image.image_name" label="所用镜像" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="sel(scope.row)">选择</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { selectCourse,select } from '@/api/courses';

export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.fetchCourse()
    },
    methods: {
        fetchCourse() {
            selectCourse().then(response => {
                this.list = response.data.lists
            })
        },
        sel(row){
            select(row.name).then(response => {
                this.fetchCourse()
            })
        }
    }
}
</script>
 
  