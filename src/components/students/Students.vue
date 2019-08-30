<template>
  <div class="students">
    <div class="handle">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>学生查询</h4>
              <el-input placeholder="请输入姓名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加学生</h4>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="studentForm"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="入学时间" required>
                  <el-col :span="11">
                    <el-form-item prop="date1">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.date1"
                        style="width: 100%;"
                      >></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="ruleForm.date2"
                        style="width: 100%;"
                        format="HH:mm"
                        value-format="HH:mm"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="类型" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择学生类型">
                    <el-option label="Junior" value="0"></el-option>
                    <el-option label="Senior" value="1"></el-option>
                  </el-select>
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
              <el-link :underline="false" style="padding-left:8em" @click="handleCourses">
                查看选课表
                <i class="el-icon-view el-icon--right"></i>
              </el-link>
              <!-- <el-button type="primary" icon="el-icon-edit" circle></el-button> -->
              <!-- <h4>Created by @刘俊超</h4> -->
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
        :data="studentData.filter(data => !searchName || data.Name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        min-height="650"
        max-height="650"
      >
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column
          prop="EnrollmentDate"
          sortable
          label="入学时间"
          width="250"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column prop="Name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="StudentType" label="类型" width="100"></el-table-column>
        <el-table-column label="课程管理" width="150">
          <template slot-scope="scope">
            <el-tooltip content="选课表中查看" placement="right" effect="light" :hide-after="2000">
              <el-button @click="handleCourses(scope.row)" type="success" size="small">
                已选
                <strong>{{scope.row.Enrollments.length}}</strong>
                门
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="信息管理">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="warning" size="small">修改</el-button>
            <el-tooltip content="删除这位同学？" placement="right" effect="light" :hide-after="2000">
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
      <el-dialog title="学生信息" :visible.sync="dialogFormVisible" class="dialogOne">
        <el-form :model="updateForm" class="content">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="updateForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="时间" required :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="updateForm.date1"
                  style="width: 100%;"
                >></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="updateForm.date2"
                  style="width: 100%;"
                  format="HH:mm"
                  value-format="HH:mm"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="类型" prop="sex" :label-width="formLabelWidth">
            <el-select v-model="updateForm.sex" placeholder="请选择学生">
              <el-option label="Junior" value="0"></el-option>
              <el-option label="Senior" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 关于进阶版的课程管理 -->
    <el-dialog title="管理选课表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column property="coursesName" label="课程名" width="150"></el-table-column>
        <el-table-column property="gridName" label="学生姓名" width="200"></el-table-column>
        <el-table-column property="grade" label="成绩等级" width="200"></el-table-column>
        <!-- <el-table-column property="address" label="地址" width="200"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="删除这个课程？" placement="right" effect="light" :hide-after="2000">
              <el-button
                @click="deleteCourse(scope.$index,scope.row)"
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
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "student",
  data() {
    return {
      name: "liudaxia",
      searchName: "",
      searchStudent: [],
      studentData: [],
      loading: true,
      delay: parseInt(200),
      // 增加学生 表单项设置
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
        sex: ""
      },
      // 修改时学生信息 表单项设置
      updateForm: {
        name: "",
        date1: "",
        date2: "",
        sex: "",
        id: "",
        checkName: ""
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: "请输入学生姓名", trigger: "change" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择学生类型", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "5em",

      //存储当前行的课程数据
      gridData: [],

      dialogTableVisible: false
    };
  },
  methods: {
    // 实现后台的课程管理
    handleCourses(row) {
      this.dialogTableVisible = true;
      this.gridName = row.Name;
      this.gridData = []
      row.Enrollments.forEach(item => {
        var newCourse = {
          Id: item.Id,
          gridName: row.Name,
          grade: item.Grade,
          // 严正声明，原本想根据coursesId去发送get请求转换成课程名，结果返回的是个网页,经过尝试，现有水平无法完美解决
          // 所以，这个版本的id 就暂且直接放出来显示吧
          coursesName: item.CourseId
        };
        this.gridData.push(newCourse);
        // 这是未成功的尝试
        // this.axios.get("http://localhost:8004/Courses/Edit?id="+item.CourseId).then(result=>{
        //   console.log(result.data)
        // })
      });
    },

    // 删除对应的课程
    deleteCourse(index, row) {
      console.log(row);
      this.$confirm("此操作将删除该同学选修的此门课程, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://localhost:8004/Enrollments/Delete?id=" + row.Id)
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                this.gridData.splice(index, 1);
                this.getStudentData();
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

    // 实现查询功能
    findSomeOne(name) {
      if ((name = "")) {
        this.searchStudent = this.studentData;
      }
      this.searchStudent = this.studentData.filter(item => {
        if (item.Name.indexOf(name) != -1) {
          return item;
        }
      });
    },

    // 实现删除功能
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将删除该同学所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://localhost:8004/Students/Delete?id=" + row.Id)
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                this.getStudentData();
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

    // 实现添加功能
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证成功
          var strData = {
            Name: this.ruleForm.name,
            StudentType: parseInt(this.ruleForm.sex),
            EnrollmentDate: this.sendAddTime(
              this.ruleForm.date1,
              this.ruleForm.date2
            )
          };
          // 改变post的编码格式，适应后台
          this.axios
            .post(
              "http://localhost:8004/Students/create",
              qs.stringify(strData)
            )
            .then(result => {
              if (result.status == 200 || result.status == 302) {
                this.$message({
                  message: "添加成功(*￣︶￣)，",
                  type: "success"
                });
                this.getStudentData();
                this.resetForm("ruleForm");
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: "添加失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        } else {
          this.$message.error("阁下填写不完整喔！刘大侠我快马加鞭前来提示！");
          // console.log("error submit!!");
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

    //实现修改功能
    handleClick(row) {
      // 数据回显
      this.dialogFormVisible = true;
      this.updateForm.id = row.Id;
      this.updateForm.name = row.Name;
      // 用于提交修改时的校验，由于name被双向绑定了，这里未来防止 name被恶意清空，派出幕后英雄checkName
      this.updateForm.checkName = row.Name;
      this.updateForm.date1 = this.getDateOne(row.EnrollmentDate);
      this.updateForm.date2 = this.getDateTwo(row.EnrollmentDate);
      this.updateForm.sex = row.StudentType;
      console.log(row);
    },
    // 提交修改
    updateStudent() {
      this.dialogFormVisible = false;
      var updateData = {
        Id: this.updateForm.id,
        // 在这里，对于修改，我们做一下无声的表单校验
        Name:
          this.updateForm.name == " "
            ? this.updateForm.checkName
            : this.updateForm.name,
        StudentType: parseInt(
          this.updateForm.sex == "Junior" || this.updateForm.sex == "0" ? 0 : 1
        ),
        EnrollmentDate: this.sendAddTime(
          this.updateForm.date1,
          this.updateForm.date2
        )
      };
      // 改变post的编码格式，适应后台做修改！
      this.axios
        .post("http://localhost:8004/Students/Edit", qs.stringify(updateData))
        .then(result => {
          if (result.status == 200 || result.status == 302) {
            this.$notify({
              id: "",
              title: "修改成功",
              message: "信息已修改完成！请查看",
              type: "success"
            });
            this.getStudentData();
          }
        })
        .catch(err => {
          this.$message({
            message: "添加失败o(╥﹏╥)o",
            type: "danger"
          });
        });
    },

    // 获取全部学生数据
    getStudentData() {
      this.$http.get("http://localhost:8004/Students").then(result => {
        if (result.status == 200) {
          // console.log(result.data);
          result.data.forEach(item => {
            item.StudentType == 0
              ? (item.StudentType = "Junior")
              : (item.StudentType = "Senior");
          });
          this.studentData = result.data;
          this.loading = false;
        }
      });
    },

    // 绑定入学日期，格式化时间
    formatter(row, colum) {
      return this.GetTimeByTimeStr(row.EnrollmentDate);
    },
    // 修改时获得对应的日期（date1）和时间(date2)
    getDateOne(time) {
      var timeArr = time.split("T");
      var d = timeArr[0].split("-");
      return new Date(d[0], d[1] - 1, d[2]);
    },
    getDateTwo(time) {
      var timeArr = time.split("T");
      var t = timeArr[1].split(":");
      return t[0] + ":" + t[1];
    },
    // 时间处理函数
    GetTimeByTimeStr(dateString) {
      var timeArr = dateString.split("T");
      var d = timeArr[0].split("-");
      var t = timeArr[1].split(":");
      var newTime =
        d[0] + "年" + d[1] + "月" + d[2] + "日" + " " + t[0] + ":" + t[1];
      // 生成new Date 的月份取值0-11 需要处理
      // var date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
      return newTime;
    },

    // 将新添加的学生入学时间进行格式转换（注：data1是日期 date2是时间）
    sendAddTime(date, date2) {
      var Y = date.getFullYear();
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var MT = parseInt(M) + 1;
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var addTime = Y + "-" + M + "-" + D + "T" + date2;
      return addTime;
    }
  },
  //页面数据初始化
  // 增加loading
  mounted() {
    this.getStudentData();
  }
};
</script>
<style lang="less" scoped>
.students {
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