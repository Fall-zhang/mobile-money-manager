<template>
  <div class="home__above__page">
    <van-nav-bar title="修改"
                 left-text="返回"
                 right-text="删除"
                 left-arrow
                 @click-left="$router.go(-1)"
                 @click-right="deleteThisConsume" />
    <!-- <h1>创建新的</h1> -->
    <van-form @submit="handleEditConsume">
      <van-cell-group>
        <van-field v-model="consumeList.amount"
                   label="输入消费金额"
                   placeholder="消费金额"
                   :rules="[{ required: true, message: '请输入金额',pattern:/^[0-9]+\.?[0-9]{1,2}$|^[0-9]\.?$/}]" />
        <van-field label="支出成员"
                   placeholder="选择消费对象"
                   v-model="consumeList.person"
                   right-icon="arrow"
                   @click="showSelectTags = true" />
        <van-field label="记录时间"
                   placeholder="数据错误"
                   v-model="consumeList.recordTime" />
        <van-field label="支出时间"
                   placeholder="数据错误"
                   v-model="consumeList.date" />
        <van-field label="备注"
                   placeholder=""
                   rows="2"
                   type="textarea"
                   v-model="consumeList.note" />
        <!-- 选择家庭成员 -->
        <van-action-sheet v-model="showSelectTags">
          <van-picker title=""
                      show-toolbar
                      @confirm="selectMemberConfirm"
                      @cancel="selectMemberCancel"
                      :columns="familyConsumer" />
        </van-action-sheet>
      </van-cell-group>
      <van-button type="info"
                  block
                  native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editable: false,
      // 要提交的数据
      consumeList: {
        id: "fdasdfafdxccxx", // 表示流水 id ，用于获取唯一值
        amount: "", // 表示【消费金额】
        tag: [], // 表示数据添加时的标签【消费标签】
        person: "", // 表示使用资金的人【支出成员】
        date: "", // 表示支出的时间【消费时间】， 格式 YYYY-MM-DD，精确到小时即可
        recordTime: "", // 表示数据记录的时间， 格式同上
        note: "", // 【备注信息】
      },
      // 要获取的数据，现在是假数据
      showSelectTags: false, // 是否展示家庭数据
      familyConsumer: [], // 所有家庭成员数据
    }
  },
  watch: {
    // consumeList: {
    //   deep: true
    // }
  },
  mounted () {
    this.handleStorage()
    // console.log(this.consumeList);
  },
  methods: {
    // 获取数据，渲染到组建中
    handleStorage () {
      var familyConsumerStorage = this.$getStorage("familyConsumer")
      console.log(familyConsumerStorage);
      familyConsumerStorage.forEach(item => {
        this.familyConsumer.push(item.text)
      })
      console.log(this.familyConsumer);
      this.consumeList = JSON.parse(this.$route.query.consume);

    },
    handleEditConsume () {
      var allConsumeStorage = this.$getStorage("historyPay")
      allConsumeStorage.forEach((item, index) => {
        if (item.id == this.consumeList.id) {
          allConsumeStorage[index] = this.consumeList
        }
      })
      this.$setStorage("historyPay", allConsumeStorage)
      this.$router.push("/home")
    },
    // 选择家庭成员的确认按钮事件
    selectMemberConfirm (ev) {
      console.log(ev);
      this.consumeList.person = ev
      // console.log(this.consume.familyConsumer)
      this.showSelectTags = false
    },
    selectMemberCancel () {
      this.showSelectTags = false
    },
    deleteThisConsume () {
      // console.log(this.consumeList.id);
      var allConsumeStorage = this.$getStorage("historyPay")
      allConsumeStorage.forEach((item, index) => {
        if (item.id == this.consumeList.id) {
          // console.log(item.id);
          // console.log(item.amount);
          // console.log(this.consumeList.id);
          // console.log("trda");
          // console.log(allConsumeStorage[index]);
          // console.log(allConsumeStorage.length);
          allConsumeStorage.splice(index, 1)
          // console.log(allConsumeStorage.length);
          // console.log(ccc);
        }
      })
      this.$setStorage("historyPay", allConsumeStorage)
      this.$router.push("/home")
    }
  }
}
</script>
<style lang="less" scoped>
.home__above__page {
  position: fixed;
  background-color: #f8f8f8;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  .van-cell-group {
    margin: 5vw 0;
  }
  .van-button {
    position: fixed;
    bottom: 0;
  }
}
</style>