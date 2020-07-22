<template>
  <div ref="chart" style="width:800%;height:600px"></div>
</template>
<script>
  export default {
    data () {
      return {
        weatherDataMax:[],
        weatherDataMin:[],
        weatherDataMean:[],
        listMax:{},
        listMin:{},
        listMean:{},
        year:[],
        myChart:null,
        option :{
          title: {
            text: '每年气温变化',
            subtext: '基于Hadoop大数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温','平均气温']
          },
          toolbox: {
            show: true,
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
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: '最高气温',
              type: 'line',
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
              name: '最低气温',
              type: 'line',
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
              name: '平均气温',
              type: 'line',
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
        this.$http.get('http://localhost:80/temperature/mean').then(response => {
          this.listMean = response.body.data
          for(let i in this.listMean){
            this.weatherDataMean.push(this.listMean[i])
          }
          window.console.log(this.weatherDataMean)
        },function (err) {
          window.console.log(err)
        })
        this.option.xAxis.data = this.year;
        this.option.series[0].data = this.weatherDataMax;
        this.option.series[1].data = this.weatherDataMin;
        this.option.series[2].data = this.weatherDataMean;
        let chart = this.$refs.chart
        this.myChart = this.$echarts.init(chart)
        this.myChart.setOption(this.option,true)
      }
    }
  }
</script>