<template>
    <div id="home">
        <div v-show="unshow" align="center">
            <div>
            <video autoplay muted loop style="width:100%;height:100%;overflow:hidden;z-index:-999">
                <source src="../assets/front.mp4" type="video/mp4">
            </video>
            </div>
            <img alt="atom logo" src="../assets/atom.jpg"  style="position:absolute;top:30%;left:42%;width:200px;height:200px;opacity:0.7;">
            <el-button style="position:absolute;top:75%;left:42%" type="info" plain @click="show = !show,unshow=!unshow" icon="el-icon-s-promotion
">进入Atom的个人主页</el-button>
        </div>
        <transition name="el-fade-in-linear">
            <div v-show="show">
                <el-container>
                    <el-header width="100%">
                        <el-row type="flex" class="row-bg">
                            <el-col style="margin-left: 0%;width: 20%;"><el-button @click="showlist = !showlist" icon="el-icon-s-fold" circle></el-button></el-col>
                            <el-col style="text-align: center;width: 80%;"><p>大数据项目</p></el-col>
                        </el-row>
                    </el-header>
                    <el-container>
                        <el-aside>
                            <el-collapse-transition>
                                <div v-show="showlist">
                                    <el-menu>
                                    <div class="transition-box"> <el-menu-item  index="1" @click="componentName='Hello'"><i class="el-icon-s-home"></i>主页</el-menu-item></div>
                                    <div class="transition-box"><el-menu-item  index="2" @click="componentName='Anime'"><i class="el-icon-s-data"></i>动漫</el-menu-item></div>
                                    <div class="transition-box"><el-menu-item  index="3" @click="componentName='Charts'"><i class="el-icon-s-grid"></i>图表</el-menu-item></div>
                                    <div class="transition-box"> <el-menu-item  index="4" @click="show = !show,unshow=!unshow"><i class="el-icon-s-order"></i>返回首页</el-menu-item></div>
                                    </el-menu>
                                </div>
                            </el-collapse-transition>
                        </el-aside>
                        <el-container>
                            <component :is="componentName"></component>
                        </el-container>
                    </el-container>
                </el-container>
            </div>
        </transition>
    </div>
</template>

<script>
    import Hello from './hello'
    import Charts from './charts'
    import Anime from './anime'
    // fade/zoom 等
    import 'element-ui/lib/theme-chalk/base.css';
    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import Vue from 'vue'
    Vue.component(CollapseTransition.name, CollapseTransition)
    var hit=0;
    export default {
        name: 'home',
        components: {Hello,Anime,Charts},
        methods: {
            open1() {
                hit++;
                this.$message({
                    message: '你打了atom ' + hit + ' 次! 别打了！',
                    type: 'error'
                });
            },
        },
        data: () => ({
            componentName:'Hello',
            show: false,
            unshow: true,
            showlist:true,
            value1: null,
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        })
    }
</script>
<style>
    * {

    }
    .transition-box {

    }
    body{color:black !important;background: white;}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color:white;
        margin-top: 60px;
    }
</style>
