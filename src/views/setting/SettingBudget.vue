<template>
  <div class="setting_budget">
    <van-nav-bar title=""
                 left-text="返回"
                 right-text="新建"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <h1>预算和支出</h1>
    <h3>本月预算</h3>
    <van-cell title="本月预算"
              @click="showEditBudgetWindow"
              is-link
              placeholder="请输入本月预算"
              :value="thisMonthBudget+'元'" />
    <h3>历史记录</h3>
    <!-- 预算的弹出框 -->
    <van-dialog v-model="showEditBudget"
                title="请输入预算"
                show-cancel-button
                @confirm="handleConfirmBudget">
      <van-field v-model="thisMonthBudget"
                 validate-trigger="onChange"
                 :rules="[
                  {
                    require:true,
                    pattern:/^[0,9]$/,
                    message:'请输入正确预算'
                  }]" />
    </van-dialog>
    <div :key="key"
         v-for="(item,key) in budgetHistory">
      <van-cell-group :title="item.budgetMonth">
        <van-cell center
                  title="本月预算"
                  value="本月支出" />
                  {{item.consume}}
        <van-cell :title="item.amount"
                  :value="item.consume" />
      </van-cell-group>
    </div>

  </div>
</template>
<script>
// import Vue from 'vue'
// import {Dialog} from "vant"
import moment from "moment"
// Vue.use(Dialog)
export default {
  // components:{
  //    [Dialog.Component.name]: Dialog.Component,
  // },
  data () {
    return {
      thisMonthBudget: 230,// 预算的数量
      showEditBudget: false,// 是否显示编辑预算的页面
      budgetHistory: [
        {
          id: "csvxzcadf",    		// 表示预算的唯一值
          amount: 1400,			// 表示预算
          budgetMonth: "2021-04", // 表示预算存的月份
          consume: 1600, // 表示该月份的花销
        },
        {
          id: "fsxcvxadf",    		// 表示预算的唯一值
          amount: 1400,			// 表示预算
          budgetMonth: "2021-03", // 表示预算存的月份
          consume: 1200, // 表示该月份的花销
        },
      ],
      consumeList: [] // 表示所有的消费
    }
  },
  mounted () {
    this.getAllStorage()
    this.handleLastMonthConsume()
  },
  methods: {
    getAllStorage () {
      this.consumeList = this.$getStorage("historyPay")
      if(this.$getStorage("thisMonthBudget")){
        this.thisMonthBudget = this.$getStorage("thisMonthBudget")
        console.log(this.thisMonthBudget);
      }
      // console.log(this.consumeList);
    },
    showEditBudgetWindow () {
      this.showEditBudget = true
    },
    handleConfirmBudget () {
      // console.log(this.thisMonthBudget)
      this.$setStorage("thisMonthBudget",this.thisMonthBudget)
    },
    // 处理上个月的所有花销，因为上个月可以添加花销
    handleLastMonthConsume () {
      var consumeLastMonth = 0
      const addLastMonthConsume = () => {
        var cc = moment().subtract(1, 'months').format("YYYY-MM")
        this.consumeList.forEach((item) => {
          // console.log(item.date);
          // console.log(moment(item.date).isSame(cc, "months"));
          if (moment(item.date).isSame(cc, "months")) {
            consumeLastMonth += Number(item.amount)
          }
        })
        // console.log();
      }
      // 把上个月的开销进行存储
      const storeLastMonthConsume = () => {
        var cc = moment().subtract(1, 'months').format("YYYY-MM")
        // console.log("113213");
        this.budgetHistory.forEach((item) => {
          // console.log();
          if (moment(item.budgetMonth).isSame(cc)) {
            item.consume = Math.round(consumeLastMonth * 100) / 100
          }
        })
      }
      addLastMonthConsume()
      storeLastMonthConsume()
      this.$setStorage("budgetHistory", this.budgetHistory)
      // console.log(this.$getStorage("budgetHistory"));
    }

  }
}
</script>
<style lang="less" scoped>
.setting_budget {
  z-index: 100;
  position: absolute;
  background-color: #f8f8f8;
  left: 0;
  top: 0;
  min-height: 100vh;
  height: 130vh;
  width: 100vw;
}
.van-cell {
  .van-cell__title {
    text-align: left;
  }
  .van-cell__value {
    color: #323233;
  }
}
</style>