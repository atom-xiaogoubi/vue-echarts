<template>
    <div id="home">
        <transition name="el-fade-in-linear">
            <div>
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
                                    <div class="transition-box"> <el-menu-item  index="1" @click="componentName='Temperature'"><i class="el-icon-s-home"></i>气温</el-menu-item></div>
                                    <div class="transition-box"><el-menu-item  index="2" @click="componentName='Forecast'"><i class="el-icon-s-data"></i>预报</el-menu-item></div>
                                    <div class="transition-box"><el-menu-item  index="3" @click="componentName='Rainfall'"><i class="el-icon-s-grid"></i>降雨</el-menu-item></div>
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
    import Temperature from './temperature'
    import Forecast from './forecast'
    import Rainfall from './rainfall'

    // fade/zoom 等
    import 'element-ui/lib/theme-chalk/base.css';
    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import Vue from 'vue'
    Vue.component(CollapseTransition.name, CollapseTransition)
    export default {
        name: 'home',
        components: {Temperature,Forecast,Rainfall},
        methods: {
        },
        data: () => ({
            componentName:'Temperature',
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
