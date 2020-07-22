<template>
    <div ref="chart2" style="width:800%;height:600px"></div>
</template>
<script>
    export default {
        data () {
            return {
                rainfallAmount:[],
                rainfallDay:[],
                listRainfallAmount:{},
                listRainfallDay:{},
                rainYear:[],
                myChart:null,
                option : {
                    title: {
                        text: '每年降雨情况',
                        subtext: '基于Hadoop大数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['降雨天数','降水量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis:
                        {
                            type: 'category',
                            data: []
                        },
                    yAxis:
                        {
                            type: 'value'
                        },
                    series: [
                        {
                            name: '降雨天数',
                            type: 'bar',
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
                            name: '降水量',
                            type: 'bar',
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
            getEchartData () {
                this.$http.get('http://localhost:80/rainfall').then(response => {
                    this.listRainfallAmount=response.body.data
                    for(let i in this.listRainfallAmount){
                        this.rainYear.push(i)
                        this.rainfallAmount.push(this.listRainfallAmount[i])
                    }
                    window.console.log(this.rainYear)
                    window.console.log(this.rainfallAmount)
                },function (err) {
                    window.console.log(err)
                })
                this.$http.get('http://localhost:80/rainday').then(response => {
                    this.listRainfallDay = response.body.data
                    for(let i in this.listRainfallDay){
                        this.rainfallDay.push(this.listRainfallDay[i])
                    }
                    window.console.log(this.rainfallDay)
                },function (err) {
                    window.console.log(err)
                })
                this.option.xAxis.data = this.rainYear;
                this.option.series[0].data = this.rainfallDay;
                this.option.series[1].data = this.rainfallAmount;
                let chart2 = this.$refs.chart2
                this.myChart = this.$echarts.init(chart2)
                this.myChart.setOption(this.option,true)
            }
        }
    }
</script>