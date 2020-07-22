<template>
    <el-container>
        <el-main style="margin: auto;width:100%">
            <el-carousel :interval="6000" type="card" style="margin: auto;">
                <el-carousel-item v-for="(img,index) in imgList" :key="index" style="height: 293px !important;">
                    <img v-bind:src="img.url">
                </el-carousel-item>
            </el-carousel>
            <!--<img alt="atom logo" src="../assets/atom.png" style="position: absolute;top:310%;left:55%;width: 100px;height: 100px;"/>-->
            <el-carousel :interval="3000" height="800px" style="margin: auto;">
                <el-carousel-item v-for="(img,index) in imgList_nogif" :key="index" style="position:absolute;left:16%;width:600px !important;height: 800px !important;">
                    <img v-bind:src="img.url">
                </el-carousel-item>
            </el-carousel>
        </el-main>
        <el-footer style="margin: auto">
            <el-container>
                <el-rate style="width:100%;"
                         v-model="value2"
                         :colors="colors">
                </el-rate>
            </el-container>
        </el-footer>
        </el-container>
</template>
<script>
    export default {
        name: 'anime',
        data(){
            return{
                value1: null,
                value2: null,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900'
                imgList:[
                    {url:require('../assets/waifu1.gif')},
                    {url:require('../assets/waifu5.jpg')},
                    {url:require('../assets/waifu2.gif')},
                    {url:require('../assets/waifu7.jpg')}
                ],
                imgList_nogif:[
                    {url:require('../assets/waifu3.jpg')},
                    {url:require('../assets/waifu4.jpg')},
                    {url:require('../assets/waifu6.jpg')},
                ]
            }
            }
    }
</script>
<style>
    .el-carousel{width:880px;}
    .el-carousel__item{height: 293px}
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
