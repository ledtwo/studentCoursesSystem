<template>
  <div class="courses">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="handle">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>课程查询</h4>
              <el-input placeholder="请输入课程名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加课程</h4>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="coursesForm"
              >
                <el-form-item label="课程名" prop="Title">
                  <el-input v-model="ruleForm.Title" placeholder="请输入课程名"></el-input>
                </el-form-item>

                <el-form-item label="课程简介" prop="Introduction">
                  <el-input
                    type="textarea"
                    v-model="ruleForm.Introduction"
                    placeholder="请填写课程信息"
                    maxlength="50"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    show-word-limit
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>created by©刘俊超 &nbsp;<span style="font-weight:100;font-size:0.7em">深自缄默，如云漂泊</span></h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="formData">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="coursesData.filter(data => !searchName || data.Title.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        min-height="650"
        max-height="650"
      >
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="Title" label="课程名" width="150"></el-table-column>
        <el-table-column prop="Enrollments.length" sortable label="选修人数" width="120"></el-table-column>
        <el-table-column prop="Introduction" label="课程简介" :formatter="checkNull"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="warning" size="small">修改</el-button>
            <el-tooltip
              content="删除这门课程？"
              placement="top"
              effect="light"
              :hide-after="1000"
              :enterable="false"
            >
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" class="content" :rules="rules" ref="updateForm">
          <el-form-item label="课程名" prop="Title" :label-width="formLabelWidth">
            <el-input v-model="updateForm.Title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="Introduction" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="updateForm.Introduction"
              placeholder="请填写课程信息"
              maxlength="50"
              :autosize="{ minRows: 4, maxRows: 6}"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent('updateForm')">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "course",
  data() {
    return {
      name: "liudaxia",
      searchName: "",
      coursesData: [],
      loading: true,
      // 增加课程 表单项设置
      ruleForm: {
        Title: "",
        Number: "",
        Introduction: ""
      },
      // 修改时课程信息 表单项设置
      updateForm: {
        Id: "",
        Title: "",
        Introduction: ""
      },
      // 校验规则
      rules: {
        Title: [
          { required: true, message: "请输入课程名", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],
        Introduction: [
          {
            required: true,
            message: "请填写课程信息,否则无法通过喔~",
            trigger: "change"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "6em"
    };
  },
  methods: {
    // 实现添加功能
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证成功
          var strData = {
            Title: this.ruleForm.Title,
            Introduction: this.ruleForm.Introduction
          };
          // 改变post的编码格式，适应后台
          this.axios
            .post("http://localhost:8004/Courses/create", qs.stringify(strData))
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$message({
                  message: "添加成功(*￣︶￣)，",
                  type: "success"
                });
                this.getAllcourses();
              }
            })
            .catch(err => {
              this.$message({
                message: "添加失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        } else {
          this.$message.error("阁下填写不完整喔！刘大侠我快马加鞭前来提示！");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //为表格添加序号
    indexMethod(index) {
      return index + 1;
    },

    // 实现删除功能
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将删除该课程所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://localhost:8004/Courses/Delete?id=" + row.Id)
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                this.getAllcourses();
              }
            })
            .catch(err => {
              this.$message({
                message: "删除失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleClick(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.updateForm.Title = row.Title;
      this.updateForm.Introduction = row.Introduction;
      this.updateForm.Id = row.Id;
      this.dialogFormVisible = true;
    },
    // 提交修改
    updateStudent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var updateData = {
            Id: this.updateForm.Id,
            Title: this.updateForm.Title,
            Introduction: this.updateForm.Introduction
          };
          this.dialogFormVisible = false;
          //  改变post的编码格式，适应后台  修改！
          this.axios
            .post(
              "http://localhost:8004/Courses/Edit",
              qs.stringify(updateData)
            )
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$notify({
                  id: "",
                  title: "修改成功",
                  message: "信息已修改完成！请查看",
                  type: "success"
                });
                this.getAllcourses();
              }
            })
            .catch(err => {
              this.$message({
                message: "添加失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        } else {
          this.$message.error("阁下网络错误！刘大侠我快马加鞭前来提示！");
          return false;
        }
      });
    },

    // 查验简介是否为空
    checkNull(row, column) {
      // console.log(row)
      return row.Introduction == null
        ? "该课程暂无介绍信息 ￣□￣｜｜"
        : row.Introduction;
    },
    // 获取全部的课程数据
    getAllcourses() {
      this.axios.get("http://localhost:8004/Courses").then(result => {
        if (result.status == 200) {
          // console.log(result);
          this.coursesData = result.data;
          this.coursesData.forEach(item => {
            console.log(item.Id);
            if (item.Introduction == null) {
              item.Introduction == "欧尼酱";
            }
            // item.Introduction==null ? "0" : item.Introduction
          });
          this.loading = false;
        }
      });
    }
  },
  mounted() {
    this.getAllcourses();
  }
};
</script>
<style lang="less" scoped>
.courses {
  display: flex;
  height: 42em;
  .handle {
    flex: 2;
    // height: 50em;
    // background-color: lightblue;
    .searchName {
      width: 70%;
    }
    .menu {
      padding: 5% 10% 0 10%;
      h4 {
        margin: 0.2em;
        padding-bottom: 0.5em;
      }
      .stydentForm {
        .el-form-item__content {
          // margin: 0 !important;
          .el-input__suffix {
            right: 0 !important;
          }
          .el-input {
            width: 70%;
          }
        }
      }
    }
  }
  .formData {
    flex: 3;
    text-align: center;
    .el-table {
      text-align: center !important;
      float: right;
      // padding: 5%
      margin: 2%;
    }
    // background-color: lightpink;
  }
}
</style>