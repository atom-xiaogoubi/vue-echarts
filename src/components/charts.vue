<template>
    <div ref="chart" style="width:100%;height:376px"></div>
</template>
<script>
 export default {
data () {
return {
    weatherDataMax:[],
    weatherDataMin:[],
    listMax:{},
    listMin:{},
    year:[],
    myChart:null,
    option :{
        title: {
            text: '气温变化',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高气温', '最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.year
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: this.weatherDataMax,
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
                name: '最低气温',
                type: 'line',
                data: this.weatherDataMin,
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: '最大值'
                            },
                            type: 'max',
                            name: '最高点'
                        }]
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
        this.$http.get('http://localhost:80/temperature/max').then(response => {
            this.listMax=response.body.data
            for(let i in this.listMax){
                this.year.push(i)
                this.weatherDataMax.push(this.listMax[i])
            }
            window.console.log(this.year)
            window.console.log(this.weatherDataMax)
        },function (err) {
            window.console.log(err)
        })
        this.$http.get('http://localhost:80/temperature/min').then(response => {
            this.listMin = response.body.data
            for(let i in this.listMin){
                this.weatherDataMin.push(this.listMin[i])
            }
            window.console.log(this.weatherDataMin)
        },function (err) {
            window.console.log(err)
        })
        let chart = this.$refs.chart
        this.myChart = this.$echarts.init(chart)
        this.myChart.setOption(this.option,true)
    }
 }
 }
</script>