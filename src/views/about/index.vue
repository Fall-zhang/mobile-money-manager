<template>
  <div class="about">
    <h1>消费详情</h1>
    <van-tabs v-model="activeTab" animated sticky>
      <van-tab title="折线图"
               name="lineChart">
        <line-chart ref="lineChart" />
      </van-tab>
      <van-tab title="图表数据"
               name="Linechart">
        <cycle-chart />
      </van-tab>
    </van-tabs>
    <div class="tag_data_suggest"
         v-if="consumeBig>0">
      <div class="suggestion__title">
        留意 <span> 一点</span>
      </div>
      <div>
        本月存在 {{consumeBig}} 天，当天支出超过300元，建议您留意您的支出情况。
      </div>
    </div>
    <!-- <self-tabbar /> -->
  </div>
</template>
<script>
// import SelfTabbar from '@/components/common/Tabbar.vue'
import LineChart from '@/views/about/LineChart.vue'
import CycleChart from '@/views/about/CycleChart.vue'

export default {
  name: 'About',
  components: {
    // "self-tabbar": SelfTabbar,
    "line-chart": LineChart,
    "cycle-chart": CycleChart,
  },
  data () {
    return {
      activeTab: 2,
      consumeList: [],
      consumeBig: 0
    }
  },
  mounted () {
    // 查询本月共有几天支出超过300
    setTimeout(
      () => {
        this.overConsume()
      }
      , 200)
  },
  methods: {
    overConsume () {
      // console.log()
      this.$refs['lineChart'].thisMonthData.forEach(item => {
        if (item > 300) {
          this.consumeBig += 1
        }
      });

    }
  }
}
</script>
<style lang="less" scoped>
.about {
  .tag__data {
    border-top: 1px solid #858585;
  }
  padding: 2vh;
  #myCharts {
    width: 100%;
    height: 600px;
  }
  .tag_data_suggest {
    text-align: left;
    border: 2px #7e818a solid;
    border-radius: 4vw;
    padding: 5vw 2vh;
    margin: 12vh 8vw 20vh 8vw;
    overflow: hidden;
    .suggestion__title {
      border: 2px #ff3b3b solid;
      display: inline;
      position: absolute;
      background: #f8f8f8;
      padding: 0.5vw 3vw;
      transform: translate(4vw, -9vw);
      border-radius: 3vw;
      color: #ff3b3b;
    }
  }
}
</style>