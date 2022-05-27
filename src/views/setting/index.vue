<template>
  <div class="setting">
    <div class="setting__top__blank">
      <h1>配置</h1>
    </div>
    <div class="setting__main">
      <van-cell title="标签配置"
                is-link
                @click="$router.push('./setting/tag')" />
      <van-cell title="成员设置"
                is-link
                @click="$router.push('./setting/member')" />
      <van-cell title="预算和支出统计"
                is-link
                @click="$router.push('./setting/budget')" />
      <van-cell title="更多功能">
        <template #right-icon>
          <van-switch v-model="moreFunction"
                      @change="changeMoreFunctionSwitch" />
        </template>
      </van-cell>
      <van-cell title="汇率转换">
      </van-cell>
      <van-cell title="利息计算">
      </van-cell>
      <van-cell title="固定性消费">
      </van-cell>
      <van-cell title="利息计算">
      </van-cell>
    </div>
    <div class="suggestion">
      <div class="suggestion__title">
        多知 <span> 一点</span>
      </div>
      {{suggestion[selectSuggestion]}}
    </div>
    <transition name="van-slide-right">
      <router-view />
    </transition>
    <div class="author__name">
      软件作者：张博飞|吕梁学院
    </div>
    <!-- 切换成高阶的功能控制模块 -->
    <!-- <self-tabbar /> -->
  </div>
</template>
<script>
// import selfTabbar from '@/components/common/Tabbar.vue'
export default {
  // components: {
  //   selfTabbar
  // },
  data () {
    return {
      moreFunction: false,
      suggestion: [
        '股市有风险，投资需谨慎',
        '股市有风险，投资需谨慎',
        "投入多只毫不相干的股票回报率更趋近于理想，比如说：医疗领域投入一个，教育投入一个，科技投入一个",
        "帕累托优化：在维持大部分人的生活状态下，保证一部分人能够得到利益的提升",
        "幸存者偏差：存活下来的企业往往被视为“传奇”，它们的做法被争相效仿。而其实有些也许只是因为偶然原因幸存下来了而已，因为你只能从幸存者口中得到数据",
        "战争后存活的飞机，哪里有弹孔，证明哪里设计的很脆弱，可以通过加强这些部位让存活率更高。结果证明加强保护后没有效果，这就是幸存者偏差。事实上，只是因为这些弹孔位置恰恰不在要害，才能使飞机活着回来。",
        "酒吧理论：由于所有人都凭借经验认为周六日酒吧里人很多，而不去酒吧，导致周六酒吧人很少。指所有人都偏信于自己的经验，导致事实结果和经验的结果相悖。也作为投资术语。",
        "投资看走势，如果像忽高忽低，尽量不去投资，投资这件事可以不赚钱，但少当接盘侠",
        "对于有历史的公司，如果不是夕阳产业，有自己的公司文化一般会更好",
        "低价买入股票的时候，分多次进行买入，不然就是投机游戏。有赚的更多的可能，也有亏损更多的可能",
        "不要尝试赚自己不懂的钱",
        "有足够多的时间，等得起，这时候的股票才会稳赚不赔"
      ],
      selectSuggestion: 0
    }
  },
  mounted () {
    this.randomSuggestion()
    // console.log(typeof ());
    this.moreFunction = this.$getStorage("moreFunctionState")

  },
  methods: {
    randomSuggestion () {
      let ran = Math.random() * (this.suggestion.length)
      // console.log(ran.toFixed(0))
      this.selectSuggestion = parseInt(ran)
    },
    changeMoreFunctionSwitch (ev) {
      this.$setStorage("moreFunctionState", ev)
    }
  }
}
</script>
<style lang="less" scoped>
.setting {
  // scroll-behavior: auto;
  height: 100hv;
  overflow-y: hidden;
  .setting__top__blank {
    margin: 5vh;
    overflow: hidden;
  }
  .setting__main {
    text-align: left;
    .setting__body {
      margin-top: 15vh;
    }
  }
  .suggestion {
    text-align: left;
    border: 2px #7e818a solid;
    border-radius: 4vw;
    padding: 5vw 2vh;
    margin: 26vh 8vw 20vh 8vw;
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
  .author__name {
    margin-bottom: 50px;
    color: rgb(146, 146, 146);
    font-size: 10px;
    text-align: center;
  }
}
</style>