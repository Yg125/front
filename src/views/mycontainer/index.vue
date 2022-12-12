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
            <el-table-column prop="image.image_name" label="相关镜像" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="300px">
                <template slot-scope="scope">
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
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
            :page-sizes="[2, 10, 20, 50, 100]" :page-size="params.page_size"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-tag size="large">总容器数 {{ number }}</el-tag>
    </div>
</template>
  
<script>
import { getMyContainersList, getTotalContainers, StartContainer, StopContainer, RemoveContainer } from '@/api/container'
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
            total: 0
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
            getMyContainersList(this.params).then(response => {
                this.list = response.data.lists
                this.Loading = false
                this.total = response.data.count
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
        }
    }
}
</script>