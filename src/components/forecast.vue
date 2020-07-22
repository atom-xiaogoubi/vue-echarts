<template>
    <div>
    <div v-show="show">
        <el-form :model="date" :rules="rules" ref="date" label-width="100px" class="demo">
            <el-form-item label="贴子时间" prop="Time">
                <el-date-picker v-model="date.Time" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmDate('date')">立即预测</el-button>
                <el-button @click="resetForm('date')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-show="unshow">
        <div ref="chart3" style="width:1600%;height:600px"></div>
    </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                show:true,
                unshow:false,
                date: {
                    Time: '',
                    Month:'',
                    Day:''
                },
                rules: {
                    Time: [
                        { type: 'date', required: true, message: '请选择日期及时间', trigger: 'change' }
                    ]
                },
                list: [],
                preciseDate:[],
                year: [],
                month: [],
                day: [],
                station: [],
                temperature: [],
                maxTemperature: [],
                minTemperature: [],
                rainfall: [],
                isRain: [],
                myChart:null,
                option : {
                    title: {
                        text: '未来7天天气预测',
                        subtext: '基于Hadoop大数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['温度', '最高温度', '最低温度']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '温度',
                            type: 'line',
                            stack: '总量',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最高温度',
                            type: 'line',
                            stack: '总量',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低温度',
                            type: 'line',
                            stack: '总量',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                }
            }
        },
        mounted(){
            // 由于已经导入了 Vue-resource这个包，所以 ，可以直接通过  this.$http 来发起数据请求
            this.getEchartData()
        },
        watch: {
            //观察option的变化
            option: {
                handler(newVal, oldVal) {
                    if (this.myChart) {
                        if (newVal) {
                            this.myChart.setOption(newVal);
                        } else {
                            this.myChart.setOption(oldVal);
                        }
                    } else {
                        this.init();
                    }
                },
                deep: true //对象内部属性的监听，关键。
            }
        },
        methods: {
            formatDate () {
                let date = new Date(this.date.Time)
                /*let y = date.getFullYear()*/
                let M = date.getMonth() + 1
                M = M < 10 ? (M) : M
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d
                /*let h = date.getHours()
                h = h < 10 ? ('0' + h) : h*/
                /*let m = date.getMinutes()
                m = m < 10 ? ('0' + m) : m
                let s = date.getSeconds()
                s = s < 10 ? ('0' + s) : s*/
                this.date.Month=M
                this.date.Day=d
            },
            confirmDate (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.formatDate ()
                        window.console.log(this.date.Month)
                        window.console.log(this.date.Day)
                        this.show = !this.show,this.unshow=!this.unshow
                        this.$http.get('http://localhost:80/weather/nextweek/' + "?month="+this.date.Month+"&day="+this.date.Day).then(response => {
                            // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
                            if (response.status === 200) {
                                // 成功了
                                let jsonObj = JSON.parse(JSON.stringify(response.body.data))
                                for(let i in jsonObj){
                                    this.year.push(jsonObj[i].year)
                                    this.month.push(jsonObj[i].month)
                                    this.day.push(jsonObj[i].day)
                                    this.preciseDate.push(jsonObj[i].year+"-"+jsonObj[i].month+"-"+jsonObj[i].day)
                                    this.station.push(jsonObj[i].station)
                                    this.temperature.push(jsonObj[i].temperature)
                                    this.maxTemperature.push(jsonObj[i].maxTemperature)
                                    this.minTemperature.push(jsonObj[i].minTemperature)
                                    this.rainfall.push(jsonObj[i].rainfall)
                                    this.isRain.push(jsonObj[i].isRain)
                                }
                                this.list=response.body.data
                                window.console.log(this.preciseDate)
                            } else {
                                // 失败了
                                alert('获取数据失败！')
                            }
                        })
                    }
                })
            },
            resetForm (formName) {
                this.$refs[formName].resetFields()
            },
            getEchartData () {
                this.option.xAxis.data = this.preciseDate;
                this.option.series[0].data = this.temperature;
                this.option.series[1].data = this.maxTemperature;
                this.option.series[2].data = this.minTemperature;
                let chart3 = this.$refs.chart3
                this.myChart = this.$echarts.init(chart3)
                this.myChart.setOption(this.option,true)
            }
        }
    }
</script>
