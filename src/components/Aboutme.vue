<template>
  <div class="aboutme">
    <el-card :body-style="{ padding: '0px' }">
        <!-- <el-divider content-position="center"></el-divider> -->
      <div class="image__preview">
        <el-image style="width: 21em; height: 21em" :src="url" :preview-src-list="srcList"></el-image>
      </div>
      <div style="padding: 14px;">
         <el-divider content-position="center">CreateBy © 刘俊超[点击图片查看简历]</el-divider>
        <br/>
        <span>***********</span>
        <el-link :underline="false">
          <i class="el-icon-view el-icon--left"></i>
          <a href="https://github.com/ledtwo" target="_blank">GitHub</a> 
        </el-link>
        <el-link :underline="false">
          <i class="el-icon-view el-icon--left"></i>
          <a href="https://www.platonic.xyz" target="_blank">个人博客</a> 
        </el-link>
        <span>**********</span>
      </div>
      <!-- <h2>来自一封信</h2> -->
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Aboutme",
  data() {
    return {
      msg: "关于我",
      url:
        "/static/images/light.jpeg",
      srcList: [
        "/static/images/introduce.png",
        "/static/images/bg.jpg",
      ],
      value: null,
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"]
    };
  }
};
</script>
<style lang="less" scoped>
.aboutme {
  background-image: url("/static/images/bgnezha.jpg");
  position: fixed;
  top: 60px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  a{
      text-decoration: none;
      color: black
  }
  .el-divider--horizontal{
      margin: 0.5em 0 0.2em 0;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
