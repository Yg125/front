<template>
  <div>
    <el-input v-model="params.search" placeholder="请输入课程名称进行搜索" @change="fetchCoursesList" />
    <el-table :data="list" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
      <el-table-column fixed prop="name" label="课程名称" align="center">
      </el-table-column>
      <el-table-column prop="env" label="实验环境" align="center">
      </el-table-column>
      <el-table-column prop="number" label="所选人数" align="center">
      </el-table-column>
      <el-table-column prop="create_by" label="创建者" align="center">
      </el-table-column>
      <el-table-column prop="image.image_name" label="所用镜像" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="visible = true; courseForm = scope.row">修改</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deletecourse(scope.row)">
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
      :page-sizes="[2, 10, 20, 50, 100, 200, 300, 400]" :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="修改课程信息" :visible.sync="visible">
      <el-form :model="courseForm">
        <el-form-item label="课程名:" prop="name">
          <el-input type="text" v-model="courseForm.name" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="实验环境:" prop="env">
          <el-input type="textarea" v-model="courseForm.env" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="所选人数" prop="number">
          <el-input type="text" v-model="courseForm.number" autocomplete="off" size="small" class="input_width"
            disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="create_by">
          <el-input type="text" v-model="courseForm.create_by" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="updatecourse">确 定</el-button>
      </div>
    </el-dialog>

    <el-button type="primary" size="small" @click="pop_show = true">新增课程</el-button>
    <el-dialog title="新增课程" :visible.sync="pop_show" append-to-body>
      <el-form :model="addForm" ref="addForm" status-icon label-width="100px">
        <el-form-item label="课程名:" prop="name">
          <el-input type="text" v-model="addForm.name" autocomplete="off" size="small" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="实验环境:" prop="env">
          <el-input type="textarea" v-model="addForm.env" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="创建人:" prop="create_by">
          <el-input type="text" v-model="addForm.create_by" autocomplete="off" size="small"
            class="input_width"></el-input>
        </el-form-item>

        <el-form-item label="使用镜像:" prop="image_id" required>
          <el-select v-model="addForm.image_id" size="small">
            <el-option v-for="item in images_list" :key="item.id" :label="item.image_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addcourse">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCoursesList, deleteCourse, updateCourse, addCourse } from '@/api/courses';
import { getImageList } from '@/api/image';
export default {
  data() {
    return {
      list: null,
      Loading: true,
      courseForm: {
        name: '',
        env: '',
        number: '',
        create_by: '',
        image_id: '',
      },
      addForm: {
        name: '',
        env: '',
        create_by: '',
        image_id: '',
        number: 0, // 默认为0 选课逻辑中后端需要一个int 
      },
      images_list: [],
      visible: false,
      pop_show: false,
      params: {
        'page': 1,
        'page_size': 10,
        'search': ''
      },
      total: 0
    }
  },
  watch: {
    visible() {
      this.resetForm('courseForm')
      this.fetchCoursesList()
    },
    // pop_show(){
    //   this.resetForm('addForm')
    // }
  },
  mounted() {
    this.fetchCoursesList(),
      this.fetchImageList()
  },
  methods: {
    handleSizeChange(page_size) {
      console.log(`每页 ${page_size} 条`);
      this.params.page_size = page_size
      this.fetchCoursesList()
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.params.page = page
      this.fetchCoursesList()
    },
    fetchCoursesList() {
      this.Loading = true
      getCoursesList(this.params).then(response => {
        this.list = response.data.lists
        this.total = response.data.count
        this.Loading = false
      })
    },
    fetchImageList() {
      getImageList().then(response => {
        this.images_list = response.data.lists
        console.log(images_list)
      })
    },
    addcourse() {
      addCourse(this.addForm).then(response => {
        this.fetchCoursesList()
        this.pop_show = false
        this.resetForm('addForm')
      })
    },
    updatecourse() {
      updateCourse(this.courseForm.id, this.courseForm).then(response => {
        this.fetchCoursesList()
      })
      this.visible = false
    },
    deletecourse(row) {
      deleteCourse(row.id).then(response => {
        if (response.data.error === undefined) {
          this.$message('课程删除成功')
        }
        else {
          this.$message(response.data.error)
        }
        this.fetchCoursesList()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>