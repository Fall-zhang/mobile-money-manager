<template>
  <div class="about__chart__cycle">
    <van-button type="primary">按月生成图表</van-button>
    <div id="myCharts"></div>
    <!-- {{msg}} -->
    <!-- <button @click="cccxc">什么都没有</button> -->
    <van-button type="primary">点击选择生成区间</van-button>
  </div>
</template>
<script>
import * as echarts from 'echarts';
// import moment from 'moment'
export default {
  data () {
    return {
      tags: [],// 标签
      option: {},
      historyPay: [], // 所有历史记录
      tagsData: [],
      startDate:'',// 生成数据的区间
      endDate:'',
      msg:'try nothing'
    }
  },
  mounted () {
    // 从缓存内获取数据
    this.getAllData()
    // 编辑数据
    this.handleData()
    // 对于数据进行二次筛选操作
    this.handleDataRender()
    // 创建图表
    this.createChart()
  },
  methods: {
    // 从缓存内获取数据
    getAllData () {
      this.historyPay = this.$getStorage("historyPay")
      // console.log(this.historyPay);
      var middleTags = this.$getStorage("settingTags")
      var tags = []
      middleTags.forEach(item => {
        tags.push(item.text)
      });
      this.tags = tags
      // console.log(tags);
    },
    // 将取得的数据进行渲染读取，并存储成接受的格式
    handleData () {
      this.tagsData = []
      var renderInChart = []
      for (let i = 0; i < this.tags.length; i++) {
        renderInChart.push(0)
      }
      this.tags.forEach(renderTags => {
        var oneTagConsume = {
          value: 0,
          name: renderTags,
        }
        this.historyPay.forEach(dataTags => {
          if (dataTags.tag[0] == renderTags) {
            oneTagConsume.value += Number(dataTags.amount)
            // console.log("有");
          }
        })
        this.tagsData.push(oneTagConsume)
      })
      // console.log(this.tagsData);
    },
    // 对于数据进行二次筛选操作
    handleDataRender () {
      this.tagsData.forEach((item, index) => {
        if (item.value == 0) {
          this.tagsData.splice(index, 1)
        }
      })
    },
    // 创建图表
    createChart () {
      var chartDom = document.getElementById('myCharts');
      var myChart = echarts.init(chartDom);
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '1%',
          left: 'center'
        },
        series: [{
          name: '支出数据',
          type: 'pie',
          radius: ['30%', '45%'],
          avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: 'center'
          // },
          // 强调效果，点击后的效果
          // emphasis: {
          //   label: {
          //     show: true,
          //     // fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          // labelLine: {
          //   show: false
          // },
          data: this.tagsData
        }]
      }
      myChart.setOption(this.option)
    },
    cccxc(){
      this.msg = 'ngngngn'
      // this.$nextTick(()=>{
      //   // console.log(this.$route.path);
      // })
    }
  }
}

</script>
<style lang="less" scoped>
#myCharts {
  width: 90vw;
  height: 50vh;
}
</style>