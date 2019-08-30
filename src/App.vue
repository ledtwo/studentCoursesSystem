<template>
  <div id="app">
    <topbar></topbar>
    <transition mode="out-in" name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import topbar from "./components/Topbar.vue";
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    topbar
  }
};
</script>

<style lang="less" scoped>
html,
body {
  margin: 0 !important;
  padding: 0;
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .header {
    position: relative;
    .el-menu-nav {
      padding-right: 5%;
      li {
        float: right;
      }
    }
    .logo {
      position: absolute;
      z-index: 999;
      left: 0;
      top: 0;
      img {
        width: 3em;
        height: 100%;
        vertical-align: bottom;
      }
      h1 {
        display: inline;
        font-size: 1.5em;
        font-family: "Courier New", Courier, monospace;
      }
    }
  }
  .el-zoom-in-center-enter-active {
    transition: all 0.1s;
  }
}
</style>
