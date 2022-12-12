<template>
    <div>
        <el-input v-model="params.search" placeholder="请输入课程名称进行搜索" @change="fetchCourse" />
        <el-table :data="list" border style="width: 100%" stripe v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
            <el-table-column prop="name" label="课程名称" align="center">
            </el-table-column>
            <el-table-column prop="env" label="实验环境" align="center">
            </el-table-column>
            <el-table-column prop="image.image_name" label="所用镜像" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" plain @click="createcontainer(scope.row.id)">运行容器</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
            :page-sizes="[2, 10, 20, 50, 100]" :page-size="params.page_size"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { selectedCourse } from '@/api/courses';
import { CreateContainer } from '@/api/container';

export default {
    data() {
        return {
            list: [],
            ip: '',
            user: '',
            password: '',
            str: '',
            params: {
                'page': 1,
                'page_size': 10,
                'search': ''
            },
            total: 0,
            loading: true,
        }
    },
    mounted() {
        this.fetchCourse()
    },
    methods: {
        handleSizeChange(page_size) {
            console.log(`每页 ${page_size} 条`);
            this.params.page_size = page_size
            this.fetchCourse()
        },
        handleCurrentChange(page) {
            console.log(`当前页: ${page}`);
            this.params.page = page
            this.fetchCourse()
        },
        fetchCourse() {
            this.loading = true
            selectedCourse(this.params).then(response => {
                console.log(response.data)
                this.loading = false
                this.list = response.data.lists
                this.total = response.data.count
            })
        },
        createcontainer(id) {
            console.log(id);
            CreateContainer(id).then(response => {
                this.ip = response.data.ip_address
                this.user = response.data.user
                this.password = response.data.password
                this.str =
                    this.$alert('ip地址为 ' + this.ip + `<br>`
                        + '默认用户名为 ' + this.user + `<br>`
                        + '默认密码为 ' + this.password + `<br>`
                        + '详情信息请进入我的容器界面查看', {
                        dangerouslyUseHTMLString: true
                    }
                    );
            })
        },
    }

}
</script>
 
  