<template>
    <el-table :data="list" border style="width: 100%" stripe>
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
            str:'',
        }
    },
    mounted() {
        this.fetchCourse()
    },
    methods: {
        fetchCourse() {
            selectedCourse().then(response => {
                this.list = response.data.lists
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
                + '详情信息请进入我的容器界面查看',{
                    dangerouslyUseHTMLString: true
                }
                );
            })
        },
    }

}
</script>
 
  