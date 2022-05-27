<template>
  <div class="home__above__page">
    <van-nav-bar title="消费详情"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell title="消费金额"
                :value="consumeListItem.amount + ' 元 '" />
      <van-cell title="支出成员"
                :value="consumeListItem.person" />
      <van-cell title="消费时间"
                :value="consumeListItem.date" />
      <van-cell title="记录时间"
                :value="consumeListItem.recordTime" />
      <van-cell title="标签">
        <template>
          <span :key="index"
                v-for="(item,index) in consumeListItem.tag">
            {{item}}
          </span>
        </template>
      </van-cell>
      <van-cell title="备注"
                :value="consumeListItem.note"
                autosize
                type="textarea"
                rows="3" />
    </van-cell-group>

    <div id="soso"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      consume: [],
      // 列表内数据
      consumeListItem: {
        id: "",				// 表示流水 id ，用于获取唯一值
        amount: "", 		// 表示【消费金额】
        tag: [], 			// 表示数据添加时的标签【消费标签】
        person: "", 		// 表示使用资金的人【支出成员】
        date: "",			// 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
        recordTime: "",// 表示数据记录的时间， 格式同上
        note: ""       // 【备注信息】
      },
    }
  },
  mounted () {
    // 将路由传过来的值，赋给
    this.consumeListItem = JSON.parse(this.$route.query.consumeListItem)
    // console.log(this.consumeListItem.person)
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.home__above__page {
  position: fixed;
  background-color: #f8f8f8;
  text-align: left;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
}
#soso {
  height: 200px;
  width: 100px;
  background-color: blueviolet;
  visibility: hidden;
}
#soso:hover {
  visibility: visible;
}
</style>