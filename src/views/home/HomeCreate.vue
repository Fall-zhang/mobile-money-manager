<template>
  <div class="home__above__page">
    <van-nav-bar title="新建消费"
                 left-text="返回"
                 right-text=""
                 left-arrow
                 @click-left="$router.go(-1)" />
    <!-- <h1>创建新的</h1> -->
    <van-form @submit="handleCreateConsume">
      <van-cell-group>
        <!-- 消费金额 -->
        <van-field v-model="consume.amount"
                   label="消费金额"
                   placeholder="消费金额"
                   :rules="[
            {
              required: true,
              message: '请输入正确金额',
              pattern: /^[0-9]+\.?[0-9]{1,2}$|^[0-9]\.?$/,
            },
          ]" />
        <!-- 消费成员 -->
        <van-field label="支出成员"
                   placeholder="选择消费对象"
                   readonly
                   :rules="[{required:true,
                   message:'必须选择谁进行了消费'}]"
                   v-model="consume.person"
                   right-icon="arrow"
                   @click="showSelectFalg = true" />
        <!-- <self-tag-select label="标签"
                         placeholder="请选择"
                         v-model="consume.tag"
                         :columns="tags"
                         label-width="100"
                         :option="{ label: 'text', value: 'id' }"
                         @confirm="confirm" /> -->
        <!-- 复选框，选择tag -->
        <van-checkbox-group v-model="consume.tag"
                            :max="5">
          <van-checkbox v-for="(item,index) in tags"
                        :key="index"
                        :name="item.text">{{item.text}}</van-checkbox>
        </van-checkbox-group>
        <van-field label="消费时间"
                   placeholder="选择消费时间（选填）"
                   readonly
                   v-model="consume.date"
                   right-icon="arrow"
                   @click="showCalendar = true" />
        <van-calendar v-model="showCalendar"
                      @confirm="onConfirm"
                      :min-date="new Date(2021, 4, 1)"
                      :max-date="new Date()"
                      :show-confirm="false" />
        <van-field rows="2"
                   type="textarea"
                   autosize
                   label="备注信息"
                   v-model="consume.note"
                   maxlength="50"
                   placeholder="请输入留言"
                   show-word-limit />
        <!-- 选择家庭成员 -->
        <van-action-sheet v-model="showSelectFalg">
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
import moment from 'moment'
export default {
  components: {
    // selfTagSelect,
  },
  data () {
    return {
      // 是否展示日历插件
      // moment: moment,
      showCalendar: false,
      // 展示的数据和提交的数据
      consume: {
        id: "", // 表示流水 id ，用于获取唯一值
        amount: "23", // 表示【消费金额】
        tag: [], // 表示数据添加时的标签【消费标签】
        person: "我", // 表示使用资金的人【支出成员】
        date: "", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
        recordTime: "", // 表示数据记录的时间， 格式同上
        note: "", // 【备注信息】
      },
      showSelectFalg: false,
      // 要获取的数据，现在是假数据
      familyConsumer: [], //家庭消费的人员
      tags: [], // 标签
      payHistory: [],
    };
  },
  watch: {
    consume: {
      deep: true,
      handler (val) {
        this.consume = val;
      },
    },
  },
  created () {
    this.getAllStorage()
  },
  methods: {
    // 获取标签和成员缓存
    getAllStorage () {
      // 获取人员和标签
      this.familyConsumer = this.$getStorage("familyConsumer");
      // 获取标签缓存
      this.tags = this.$getStorage("settingTags")
    },
    // 提交 payHistory 单条【消费流水】
    handleCreateConsume () {
      this.consume.recordTime = moment().format("YYYY-MM-DD HH:mm");
      // console.log(this.consume.recordTime)
      if (this.consume.date == "") {
        this.consume.date = this.consume.recordTime
      }
      this.consume.id = this.createID(7)
      this.$store.state.payHistory.push(this.consume);
      var allConsume = this.$getStorage("historyPay")
      allConsume.unshift(this.consume)
      // console.log(this.consume);
      this.$setStorage("historyPay", allConsume)
      this.$router.push("/home")
    },
    // 随机生成一定唯一字符串
    createID (num) {
      let mydate = new Date()
      var uuid = "" + mydate.getDay() * 17 + mydate.getHours() * 23 + mydate.getMinutes() * 13 + mydate.getSeconds() * 7 + mydate.getMilliseconds() * 19;
      var arr = []
      for (let i = 0; i < num; i++) {
        var n = parseInt(Math.random() * 62)
        if (n >= 0 && n <= 9)
          arr.push(n)
        else if (n >= 10 && n < 36) {
          arr.push(String.fromCharCode(87 + n))//生成小写字母
        }
        else if (n >= 36 && n < 62) {
          arr.push(String.fromCharCode(29 + n))//生成大写字母
        }
        else (
          alert("该方法无法输出部分不合法数据")
        )
      }
      return uuid + arr.join("")
    },
    // 选择家庭成员的确认按钮事件
    selectMemberConfirm (ev) {
      // console.log(ev.text)
      this.consume.person = ev.text;
      this.showSelectFalg = false;
    },
    // 取消选择消费人员
    selectMemberCancel () {
      this.showSelectFalg = false;
    },
    // 确认选择时间
    onConfirm (date) {
      this.showCalendar = false;
      this.consume.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      // console.log(this.consume.date)
    },
  },

};
</script>
<style lang="less" scoped>
.home__above__page {
  position: fixed;
  background-color: #f8f8f8;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  .van-cell-group {
    margin: 1vh 4vw;
    .van-checkbox-group {
      margin: 1vh 4vw;
      // display: flex;
      flex-flow: row nowrap;
      .van-checkbox {
        margin: 0.5vh 1vw;
        // background: blue;
        // float: right;
        // margin: 0 50px 10px 0;
        // margin-left: 40px;
        // padding: ;
        // text-decoration-style: double;
      }
    }
  }
  .van-button {
    position: fixed;
    bottom: 0;
  }
}
</style>