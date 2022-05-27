<template>
  <div class="home">
    <div class="layout__head">
      <div class="layout__baseinfo">
        <div class="layout__date">
          <div class="layout__date__day">{{ moment().format('DD') }}</div>
          <div class="layout__date__right">
            <div class="layout__date__month">{{moment().format('MMMM')}}</div>
            <div class="layout__date__year">{{ moment().format('YYYY') }}</div>
          </div>
        </div>
        <div class="layout__time">
          <div class="layout__time__text">
            <div>您总共</div>
            <div>记录了</div>
          </div>
          <div class="layout__time__total">
            {{consumeList.length}}
          </div>
          <div class="layout__time__right-text">
            次
          </div>
        </div>
        </div>
      <div class="layout__consume"
           v-if="moreFunctionState">
        <div class="month__consume">
          本月支出
          <div>{{monthlyConsumeTatal}}元</div>
        </div>
        <div class="month__budget">
          本月预算
          <div>{{thisMonthBudget}}元</div>
        </div>
        <div class="month__consume__last">
          上月支出
          <div>{{lastMonthConsume}}元</div>
        </div>
        <div class="month__consume_increase">
          支出{{consumeIncrease>0?"增长":"减少"}}
          <div>{{Math.abs(consumeIncrease)}}元</div>
        </div>
      </div>
    </div>
    <!-- 页面主体内容 -->
    <div class="layout__content">
      <van-list v-model="listLoading"
                :finished="listLoadingFinished"
                finished-text="没有更多数据了"
                @load="loadMoreData">
        <ul class="content__data">
          <li class="data__list"
              v-for="(item,index) in consumeList"
              :key="index">
            <van-cell-group @click.stop="clickConsumeGroup(item)">
              <van-cell :label="item.person">
                <template #title>
                  {{item.amount}}元
                </template>
                <template #right-icon>
                  <van-icon name="edit"
                            @click.stop="toHomeEdit(item)"
                            class="search-icon" />
                </template>
              </van-cell>
            </van-cell-group>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 底部的添加按钮 -->
    <div class="add__btn">
      <router-link to="/home/create">
        <van-button type="info"
                    icon="plus"
                    round />
      </router-link>
    </div>
    <!-- 路由界面 -->
    <transition name="van-slide-right">
      <router-view />
    </transition>
    <!-- <self-tabbar /> -->
  </div>
</template>
<script>
import moment from 'moment'
// import selfTabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'Home',
  // components: {
  //   selfTabbar,
  // },
  data () {
    return {
      moment: moment,
      listLoading: false, // 列表是否在加载
      listLoadingFinished: true, // 列表是否加载完成
      consumeList: [
        //   {
        //   id: "1231", // 表示流水 id ，用于获取唯一值
        //   amount: "3123", // 表示【消费金额】
        //   tag: [], // 表示数据添加时的标签【消费标签】
        //   person: "mm", // 表示使用资金的人【支出成员】
        //   date: "", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
        //   recordTime: "", // 表示数据记录的时间， 格式同上
        //   note: "", // 【备注信息】
        // }
      ],
      monthlyConsume: [{
        id: "",    		// 表示预算的唯一值
        amount: "999",			// 表示预算的数量
        budgetMonth: "2021-03" // 表示预算的月份
      },
      ],
      moreFunctionState: false, // 默认不提供高等方法
      thisMonthBudget:1500
    }
  },
  watch: {
    "$route" () {
      // console.log(from)
      this.reRenderPage()
    }
  },
  computed: {
    monthlyConsumeTatal () {
      var sumAllConusme = 0
      this.consumeList.forEach(item => {
        sumAllConusme += Number(item.amount)
      })
      return sumAllConusme.toFixed(2)
    },
    lastMonthConsume () {
      var consumeLastMonth = 0
      var lastMonth = moment().subtract(1, 'months')
      // console.log(lastMonth);
      this.consumeList.forEach(item => {
        // console.log(moment(item.date, "YYYY-MM-DD").isSame(lastMonth, "month"));
        if (moment(item.date, "YYYY-MM-DD").isSame(lastMonth, "month")) {
          consumeLastMonth += Number(item.amount)
        }
      })
      return consumeLastMonth.toFixed(2)
    },
    consumeIncrease () {
      var middleNum = this.monthlyConsumeTatal - this.lastMonthConsume
      return Math.round(middleNum * 100) / 100
      // return this.monthlyConsumeTatal - this.lastMonthConsume
    }
  },
  mounted () {
    this.moreFunctionState = this.$getStorage("moreFunctionState")
    // console.log();
    this.thisMonthBudget = this.$getStorage('thisMonthBudget')
    this.reRenderPage()
  },
  methods: {
    toHomeEdit (item) {
      let consume = JSON.stringify(item)
      // console.log(item)
      this.$router.push({ path: '/home/edit', query: { consume } })
    },
    // 渲染 home 页面
    reRenderPage () {
      this.consumeList = this.$getStorage("historyPay")
    },
    // 异步更新数据
    loadMoreData () {
      // setTimeout 用作生成假数据
      setTimeout(() => {
        // 生成假数据
        // for (let i = 0; i < 10; i++) {
        //   this.consumeList.push({
        //     id: "1231", // 表示流水 id ，用于获取唯一值
        //     amount: (Math.random()*99).toFixed(2), // 表示【消费金额】
        //     tag: [], // 表示数据添加时的标签【消费标签】
        //     familyConsumer: "某某", // 表示使用资金的人【支出成员】
        //     date: "", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
        //     recordTime: "", // 表示数据记录的时间， 格式同上
        //     note: "", // 【备注信息】
        //   });
        // }
        // // 加载状态结束
        // this.listLoading = false;
        // // 数据全部加载完成
        // if (this.consumeList.length >= 50) {
        //   this.listLoadingFinished = true;
        // }
      }, 1000);
    },
    clickConsumeGroup (item) {
      // console.log(item)
      let consumeListItem = JSON.stringify(item)
      this.$router.push({ path: '/home/details', query: { consumeListItem } })
      // let consume = JSON.stringify(item)
      // this.$router.push({ path: '/home/edit', query: { consume } })
    }
  }
}
</script>
<style scoped lang="less">
.home {
  display: flex;
  flex-flow: column nowrap;
  .layout__head {
    min-height: 24vh;
    max-height: 40vh;
    .layout__baseinfo {
      display: flex;
      position: relative;
      background: #f8f8f8;
      justify-content: space-between;
      flex: 0 0 auto;
      z-index: 100;
      padding: 16vw 4.267vw 10.667vw 4.267vw;
      position: relative;
      .layout__date {
        display: flex;
        justify-content: space-between;
        .layout__date__day {
          font-size: 10vw;
        }
        .layout__date__right {
          padding-left: 1vw;
          border-left: 1px solid gray;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          font-size: 100%;
          color: gray;
          box-sizing: content-box;
          text-align: start;
        }
      }
      .layout__time {
        .layout__time__text {
          color: #969799;
          float: left;
          font-size: 100%;
          padding-right: 0.8vw;
        }
        .layout__time__total {
          font-size: 10vw;
          float: left;
        }
        .layout__time__right-text {
          float: left;
          color: #9697a1;
          position: relative;
          top: 50%;
        }
      }
    }
    .layout__consume {
      margin-top: 2px;
      margin-bottom: 14px;
      background-color: #ffffff;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .month__consume {
        flex-grow: 1;
      }
      .month__budget {
        flex-grow: 1;
      }
      .month__consume__last {
        flex-grow: 1;
      }
      .month__consume_increase {
        flex-grow: 1;
      }
      > div {
        // border-style: ridge;
        border-top: 1px solid #808080;
        border-bottom: 1px solid #808080;
        border-right: 1px solid #808080;
        padding: 12px 2px;
        > div {
          font-size: 14px;
        }
      }
      > div:last-child {
        border-right: 0px solid transparent;
      }
    }
  }
  .layout__content {
    flex: 0 1 100%;
    height: 100%;
    margin-bottom: 40px;
    .content__data {
      margin: 0 4vw 4vw 4vw;
      text-align: left;
      .data__list {
        .van-icon {
          font-size: 30px;
          line-height: 45.6px;
        }
      }
      // .data__list {
      //   background-color: #ffffff;
      //   border-radius: 2vw;
      //   margin-top: 4vw;
      //   box-shadow: 1px 1px 5px #858585;
      //   padding: 2vw;
      //   display: flex;
      //   justify-content: space-between;
      // }
    }
  }
  .add__btn {
    .van-button {
      position: fixed;
      height: 15vw;
      width: 15vw;
      font-size: 5vw;
      line-height: 5vw;
      border-radius: 50%;
      right: 3vw;
      bottom: 10vh;
    }
  }
}
</style>