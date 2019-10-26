<template>
  <div class="hello" align="center">
    <el-main width="77%">
      <img alt="back" src="../assets/pic1.jpg" style="z-index:-1;position: relative; width:100%;background-size: cover"/>
      <div style="position: absolute;top:15%;left:48%;font-size: 50px;color: white">这是欢迎页！</div>
      <div style="position: absolute;top:25%;left:40%;font-size: 50px;color: white">欢迎来到atom的主页</div>
      <!--<img alt="atom logo" src="../assets/atom.png" style="position: absolute;top:310%;left:55%;width: 100px;height: 100px;"/>-->
    </el-main>
    <el-footer>
      <div class="block">
        <span class="demonstration">请给我评分</span>
        <el-rate
                v-model="value2"
                :colors="colors">
        </el-rate>
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  methods:
          {

          },
  props: {
    msg: String
  },
  data() {
    return {
      value1: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
