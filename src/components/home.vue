<template>
    <div id="home">
        <div v-show="unshow" align="center">
            <div>
            <video autoplay muted loop style="width:100%;height:100%;overflow:hidden;z-index:-999">
                <source src="../assets/front.mp4" type="video/mp4">
            </video>
            </div>
            这是atom的个人主页测试版
            <img alt="atom logo" src="../assets/atom.jpg"  style="position:absolute;top:30%;left:42%;width:200px;height:200px;opacity:0.7;">
            <el-button style="position:absolute;top:75%;left:42%" type="info" plain @click="show = !show,unshow=!unshow" icon="el-icon-s-promotion
">进入Atom的个人主页</el-button>
        </div>
        <transition name="el-fade-in-linear">
            <div v-show="show">
                <el-container>
                    <el-header align="center" width="100%">
                        <el-row type="flex" class="row-bg" style="background: black">
                            <el-col><div class="grid-content bg-purple"><el-button type="text" @click="open1">点击打atom</el-button></div></el-col>
                            <el-col><div class="grid-content bg-purple-light"><el-button type="text" disabled style="color: gray !important;">不让你点</el-button></div></el-col>
                            <el-col><div class="grid-content bg-purple"><el-button type="text" @click="open2">点击看看好东西</el-button></div></el-col>
                            <el-col><div class="grid-content bg-purple-light"><el-button type="text" disabled style="color: gray !important;">不让你点</el-button></div></el-col>
                            <el-col><div class="grid-content bg-purple"><el-button type="text" @click="open3">点击对atom表示赞美</el-button></div></el-col>
                        </el-row>
                    </el-header>
                    <el-container>
                        <el-aside width="23%">
                            <el-menu>
                                <el-menu-item  index="0-1" @click="componentName='Hello'">欢迎来到atom的主页！</el-menu-item>
                                <el-submenu index="1">
                                    <template slot="title"><i class="el-icon-user-solid"></i><span style="color: white !important;">个人信息</span></template>
                                    <el-menu-item-group>
                                        <template slot="title">性别</template>
                                        <el-menu-item index="1-1">男</el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="年龄">
                                        <el-menu-item index="1-2">20</el-menu-item>
                                    </el-menu-item-group>
                                    <el-submenu index="1-3">
                                        <template slot="title"><i class="el-icon-star-on"></i><span style="color: white !important;">兴趣爱好</span></template>
                                        <el-menu-item index="1-3-1" @click="componentName='Game'"><i class="el-icon-aim"></i>游戏</el-menu-item>
                                        <el-menu-item index="1-3-2" @click="componentName='Basketball'"><i class="el-icon-basketball"></i>篮球</el-menu-item>
                                        <el-menu-item index="1-3-3" @click="componentName='Movie'"><i class="el-icon-video-camera-solid"></i>电影</el-menu-item>
                                        <el-menu-item index="1-3-4" @click="componentName='Fish'"><i class="el-icon-moon-night"></i>摸鱼</el-menu-item>
                                        <el-menu-item index="1-3-5" @click="componentName='Anime'"><i class="el-icon-picture"></i>动漫</el-menu-item>
                                    </el-submenu>
                                </el-submenu>
                                <el-submenu index="2">
                                    <template slot="title"><i class="el-icon-message"></i><span style="color: white !important;">我的邮箱</span></template>
                                    <el-menu-item-group>
                                        <el-menu-item index="2-1">1679243134@qq.com</el-menu-item>
                                        <el-menu-item index="2-2">atom.xiaogoubi@gmail.com</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="3">
                                    <template slot="title"><i class="el-icon-headset"></i><span style="color: white !important;">听听音乐</span></template>
                                    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=270 height=100 src="//music.163.com/outchain/player?type=2&id=691506&auto=1&height=70"></iframe>
                                    <el-menu-item index="3-1"> <el-link href="https://music.163.com/song?id=691504&userid=275067744" target="_blank" type="primary">秋姉妹のなく顷に</el-link></el-menu-item>
                                </el-submenu>
                                <el-menu-item index="5-1" @click="show = !show,unshow=!unshow">回到初始页</el-menu-item>
                            </el-menu>
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
    import Game from './game'
    import Anime from './anime'
    import Basketball from './basketball'
    import Movie from './movie'
    import Fish from './fish'
    var hit=0;
    export default {
        name: 'home',
        components: {Hello,Game,Anime,Basketball,Movie,Fish},
        methods: {
            open1() {
                hit++;
                this.$message({
                    message: '你打了atom ' + hit + ' 次! 别打了！',
                    type: 'error'
                });
            },
            open2() {
                const h = this.$createElement;

                this.$notify({
                    title: '你想啥呢？',
                    message: h('i', {style: 'color: teal'}, '富强民主和谐自由平等公正法治爱国敬业诚信友善')
                });
            },

            open3() {
                this.$prompt('请输入你要对atom表达的赞美', '不愧是你', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    //inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    this.$message({
                        type: 'success',
                        message: '你对atom说: ' + value + '，atom表示很赞'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        },
        data: () => ({
            componentName:'Hello',
            show: false,
            unshow: true,
            value1: null,
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        })
    }
</script>
<style>
    * {

    }
    .el-button{color: orange !important;}
    .el-menu{color: white !important;background: black}
    .el-menu.is-active{color: white !important;background: orange !important;}
    .el-menu-item-group{color: white !important;background: black}
    .el-menu-item-group.is-active{color: white !important;background: orange !important;}
    .el-submenu{color: white !important;background: black}
    .el-submenu.is-active{color: white !important;background: orange !important;}
    .el-menu-item{color: white !important;background: black}
    .el-menu-item.is-active{color: white !important;background: orange !important;}
    body{color: white !important;background: black;}
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
        border-radius: 1px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: black;
    }
    .bg-purple-light {
        background: black;
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
        color:white;
        margin-top: 60px;
    }
</style>
