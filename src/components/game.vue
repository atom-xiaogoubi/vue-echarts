<template>
    <div class="game" align="center">
        <el-main width="77%">
            <img alt="atom ow" src="../assets/ow.gif"  style="width:800px;height:500px;">
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
        name: "game",
        data() {
            return {
                value1: null,
                value2: null,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
            }
        }
    }
</script>

<style scoped>

</style>
