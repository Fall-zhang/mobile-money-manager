<template>
  <div>
    <div id="line_chart"
         v-if="showThisChart"></div>
    <van-button type="primary"
                @click="createWeekData">周数据视图</van-button>
    <van-button type="info"
                @click="createMonthData">月数据视图</van-button>
  </div>
</template>
<script>
import moment from 'moment'
import * as echarts from 'echarts';
export default {
  data () {
    return {
      showThisChart: true, // 是否展示该图表
      consumeList: [], // 消费列表
      lastWeekData: [0, 0, 0, 0, 0, 0, 0], // 存放上周数据
      thisWeekData: [0, 0, 0, 0, 0, 0, 0], // 存放本周数据
      lastMonthData: [], // 上个月的数据
      thisMonthData: [], // 本月的数据
      lastYearData: [],// 去年的数据
      thisYearData: [],// 今年的数据
    }
  },
  mounted () {
    this.getAllData()
    this.createMonthData()
  },
  methods: {
    // 获取所有的数据
    getAllData () {
      this.consumeList = this.$getStorage("historyPay")
      // console.log(this.consumeList)
    },
    // 生成周的数据
    createWeekData () {
      // this.showThisChart = false
      // 管理上周的数据
      this.handleLastWeekData()
      // 管理本周的数据
      this.handleThisWeekData()
      // console.log(this.thisWeekData)
      // this.showThisChart = true
      this.createWeekEchart()
    },
    // 处理上周花销数据
    handleLastWeekData () {
      var lastWeek = moment().format("WW") // 将第几个星期，转化为对应日期
      for (let dayInWeek = 1; dayInWeek <= 7; dayInWeek++) {  // dayInWeek是几，代表是周几
        // console.log(moment(`${lastWeek}`, "ww").add(i, 'days').format("YYYY-MM-DD")) // 上周的周一是几月几日
        // if() // 判断日期是否和数据中的日期相等，如果想等，进行存储
        // console.log(cc);
        var dayConsume = 0
        var cc = moment(`${lastWeek}`, "ww").add(dayInWeek, 'days').format("YYYY-MM-DD") // 暂时存储每周的第几天的日期
        this.consumeList.forEach((item) => {
          if (moment(item.date, "YYYY-MM-DD").isSame(cc, "days")) {
            // console.log("这条数据是上周的");
            // console.log(item);
            dayConsume += Number(item.amount)
          }
        })
        this.lastWeekData[dayInWeek - 1] = dayConsume
      }
    },
    // 处理本周花销数据
    handleThisWeekData () {
      var weekOfDay = moment().format("E")
      for (let i = 1; i <= 7; i++) {
        var dayConsume = 0
        var dayInWeek = moment().subtract(weekOfDay - i, 'days').format('YYYY-MM-DD'); // 周一日期
        // console.log(moment(dayInWeek).isAfter(moment()))
        if (moment(dayInWeek).isAfter(moment())) {
          this.thisWeekData[i - 1] = null
        } else {
          this.consumeList.forEach(item => {
            if (moment(item.date, "YYYY-MM-DD").isSame(dayInWeek, "days")) {
              // console.log("本周有数据")
              dayConsume += Number(item.amount)
            }
          })
          this.thisWeekData[i - 1] = dayConsume
        }
      }
    },
    // 生成echart图表---周数据
    createWeekEchart () {
      var chartDom = document.getElementById('line_chart');
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          // bottom: '1%',
          // left: 'center',
          data: ["本周数据", "上周数据"]
        },
        series: [{
          name: "本周数据",
          data: this.thisWeekData,
          type: 'line'
        }, {
          name: "上周数据",
          data: this.lastWeekData,
          type: 'line'
        }]
      };
      option && myChart.setOption(option);
    },
    // 生成月的数据
    createMonthData () {
      // 生成上月数据
      this.handleLastMonthData()
      // 生成本月数据
      this.handleThisMonthData()
      // 生成本月Echart图表
      this.createMonthEchart()
    },
    // 处理上个月的数据
    handleLastMonthData () {
      let dayInLastMonth = moment().subtract(1, 'months').daysInMonth() // 上一个月的天数
      // 填充上个月的空数据
      for (let i = 0; i < dayInLastMonth; i++) {
        this.lastMonthData.push(0)
      }
      // console.log(lastMonth)
      for (let i = 0; i < dayInLastMonth; i++) {
        var oneDayConsume = 0
        // 上个月的第一天，第二天，第三天
        var cc = moment(i + 1, "DD").subtract(1, 'months').format("YYYY-MM-DD")
        // 判断有没有数据在当天，有对应的数据就进行添加
        this.consumeList.forEach((item) => {
          if (moment(item.date, "YYYY-MM-DD").isSame(cc, "day")) {
            // console.log("这条数据是上个月的");
            // console.log(item);
            oneDayConsume += Number(item.amount)
          }
        })
        this.lastMonthData[i] = oneDayConsume
      }
      // console.log(this.lastMonthData)
    },
    // 处理这个月的数据
    handleThisMonthData () {
      let dayInThisMonth = moment().daysInMonth()
      for (let i = 0; i < dayInThisMonth; i++) {
        var oneDayConsume = 0
        var cc = moment(i + 1, "DD").format("YYYY-MM-DD")
        if (moment(cc, "YYYY-MM-DD").isAfter()) {
          // console.log(cc);
          // console.log("在本日之后")
          this.thisMonthData.push(null)
        } else {
          // 存取，计算本日和本日之前的数据
          this.consumeList.forEach((item) => {
            if (moment(item.date, "YYYY-MM-DD").isSame(cc, "day")) {
              oneDayConsume += Number(item.amount)
              // console.log(oneDayConsume);
            }
          })
          this.thisMonthData.push(oneDayConsume)
        }
      }
      // console.log(this.thisMonthData);
    },
    // 生成Echart图表----月数据
    createMonthEchart () {
      let dayInLastMonth = moment().subtract(1, 'months').daysInMonth()
      let dayInThisMonth = moment().daysInMonth()
      var maxOne = Math.max(dayInLastMonth, dayInThisMonth)
      // console.log(maxOne);
      var daysInMonth = []
      for (let i = 0; i < maxOne; i++) {
        daysInMonth.push((i + 1).toString())
      }
      // console.log(daysInMonth);
      var chartDom = document.getElementById('line_chart');
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: 'category',
          data: daysInMonth
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          // bottom: '1%',
          // left: 'center',
          data: ["本月数据", "上月数据"]
        },
        series: [
          {
            name: "本月数据",
            data: this.thisMonthData,
            type: 'line'
          },
          {
            name: "上月数据",
            data: this.lastMonthData,
            type: 'line'
          }
        ]
      };
      option && myChart.setOption(option);
    },
  }
}
</script>
<style lang="less" scoped>
#line_chart {
  height: 50vh;
  width: 100%;
}
</style>