<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt />
      <h1>学生课程管理系统</h1>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-nav"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="/aboutme">
        <template slot="title">MENU</template>
        <el-menu-item index="/aboutme">君且听风吟</el-menu-item>
      </el-submenu>
      <el-menu-item index="/courses">
        <el-badge value="admin" class="item" type="warning">课程管理</el-badge>
      </el-menu-item>
      <el-menu-item index="/students">
        <el-badge value="admin" class="item" type="warning">学生管理</el-badge>
      </el-menu-item>
      <el-menu-item index="/enrollments">
        <el-badge value="student" class="item">我要选课</el-badge>
      </el-menu-item>
      <!-- </el-menu-item> -->
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "liudaxia"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
body {
  .header {
    position: relative;
    .el-menu-nav {
      // padding-right: %;
      li {
        float: right;
        padding-right: 3em;
      }
    }
    .logo {
      position: absolute;
      z-index: 999;
      left: 2em;
      top: 0.7em;
      img {
        width: 2.2em;
        vertical-align: bottom;
      }
      h1 {
        display: inline;
        vertical-align: center;
        color: #fff;
        font-size: 1.7em;
        font-weight: 300;
        font-family: "Courier New", Courier, monospace;
      }
    }
  }
}
</style>