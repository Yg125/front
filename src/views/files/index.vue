<template>
    <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="文件名" align="center">
        </el-table-column>
        <el-table-column prop="size" label="文件大小" align="center">
        </el-table-column>

    </el-table>
</template>

<script>
import { getFileList } from '@/api/files'
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
        getfilelist() {
            getFileList().then(response => {
                this.list = response.data.lists
            })
        }
    }
}
</script>