<template>
  <div class="enrollments">
    <div class="content">
      <el-col :span="8">
        <el-card shadow="always">
          <el-divider>
            <i class="el-icon-mobile-phone"></i>
          </el-divider>
          <el-form ref="selectForm" :model="selectForm" label-width="130px" :rules="rules">
            <el-form-item label="姓名" prop="students">
              <el-select v-model="selectForm.students" filterable placeholder="少侠如何称呼?">
                <el-option
                  v-for="item in students"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-divider content-position="center">欲上青天揽明月</el-divider>
            <el-form-item label="课程" prop="courses">
              <el-select v-model="selectForm.courses" filterable placeholder="请选修一本我有的秘籍">
                <el-option
                  v-for="item in courses"
                  :key="item.Id"
                  :label="item.Title"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="等级" prop="grade">
              <el-select v-model="selectForm.grade" filterable placeholder="请选择您的成绩等级">
                <el-option
                  v-for="item in grade"
                  :key="item.value"
                  :label="item.grade"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定了</el-button>
              <el-button @click="resetForm('selectForm')">重填</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "enrollments",
  data() {
    return {
      name: "liudaxia",
      students: [],
      courses: [],
      grade: [
        { grade: "A", value: 0 },
        { grade: "B", value: 1 },
        { grade: "C", value: 2 },
        { grade: "D", value: 3 },
        { grade: "E", value: 4 }
      ],
      selectForm: {
        students: "",
        courses: "",
        grade: ""
      },
      rules: {
        students: [
          { required: true, message: "请阁下留下您的名字", trigger: "change" }
        ],
        courses: [
          {
            required: true,
            message: "好武功配英雄，请选择一门课程！",
            trigger: "change"
          }
        ],
        grade: [
          { required: true, message: "请输入平时成绩", trigger: "change" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.selectForm.students == "") {
        return this.$message({
          message: "请阁下留下您的名字",
          type: "warning"
        });
      }
      if (this.selectForm.courses == "") {
        return this.$message({
          message: "好武功配英雄，请选择一门课程！",
          type: "warning"
        });
      }
      if (this.selectForm.grade === "" ) {
        return this.$message({
          message: "选择您的能力等级",
          type: "warning"
        });
      }
      var strData = {
        CourseId: this.selectForm.courses,
        StudentId: this.selectForm.students,
        Grade: this.selectForm.grade
      };
      this.axios
        .post("http://localhost:8004/Enrollments/Create", qs.stringify(strData))
        .then(result => {
          if (result.status == 200 || result.status == 302) {
            this.$notify({
              id: "",
              title: "添加成功(*￣︶￣)，",
              message: "课程已经添加完成！请在学生页查看",
              position: 'top-left',
              type: "success"
            });
            this.getStudentData();
            this.resetForm("selectForm");
          }
        })
        .catch(err => {
          this.$message({
            message: "添加失败o(╥﹏╥)o",
            type: "danger"
          });
        });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 获取全部学生数据
    getStudentData() {
      this.$http.get("http://localhost:8004/Students").then(result => {
        if (result.status == 200) {
          console.log(result);
          this.students = result.data;
        }
      });
    },

    // 获取全部的课程数据
    getAllcourses() {
      this.axios.get("http://localhost:8004/Courses").then(result => {
        if (result.status == 200) {
          this.courses = result.data;
        }
      });
    }
  },
  created() {
    this.getStudentData();
    this.getAllcourses();
  }
};
</script>
<style lang="less" scoped>
.enrollments {
  background-image: url("/static/images/bgnezha.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: rgba(0, 0, 0, 0.5);
  background-repeat: repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  .content {
    display: flex;
    // 调整选课框位置
    margin: 13% 0 0 0;
    justify-content: center;
    overflow: hidden;
  }
}
</style>