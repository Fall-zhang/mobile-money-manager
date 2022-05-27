<template>
  <div class="setting__tag">
    <van-nav-bar title="人员设置"
                 left-text="返回"
                 right-text="新建"
                 left-arrow
                 @click-left="$router.go(-1)"
                 @click-right="createNewMember" />
    <h1>人员设置</h1>
    <div class="wrap">
      <van-swipe-cell v-for="(item, index) in familyConsumer"
                      :key="item.id">
        <van-field v-model="item.text"
                   :readonly="!item.isEdit"
                   placeholder="在此输入标签"
                   :rules="[{ required: true,
                      message: '请输入正确内容' }]">
          <template #button
                    v-if="item.isEdit">
            <van-button size="small"
                        @click="saveFamilyMember(index)"
                        type="primary">保存</van-button>
          </template>
        </van-field>
        <template #right>
          <div v-if="!item.isEdit">
            <van-button @click="editFamilyMember(index)"
                        type="primary"
                        text="编辑" />
            <van-button @click="deleteFamilyMember(index)"
                        square
                        type="danger"
                        text="删除" />
          </div>
        </template>
      </van-swipe-cell>
    </div>
    <div style="margin: 16px"
         class="save-btn">
      <van-button @click="save"
                  round
                  block
                  type="info"
                  native-type="submit">保存成员配置</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      familyConsumer: [{
        text: "默认成员",// 表示tag中的内容
        isEdit: true, // 表示 tag 当前是否为保存状态
        id: "c7s5cW", // 表示标识该 tag 的唯一字段值
      }],
      id: 0,
    };
  },
  created () {
    this.familyConsumer = this.$getStorage("familyConsumer")
  },
  methods: {
    createNewMember () {
      var stateFamilyConsumer = true // 可以添加新 Tag 的指示符
      this.familyConsumer.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateFamilyConsumer = false
          Toast({
            message: "请全部保存后再进行新增操作"
          })
        }
      })
      if (stateFamilyConsumer) {
        this.familyConsumer.push({ text: "", isEdit: true, id: this.createID(10) });
      }
    },
    saveFamilyMember (index) {
      // console.log(index);
      this.familyConsumer[index].isEdit = false;
    },
    deleteFamilyMember (idx) {
      var familyMemberCount = this.familyConsumer.length
      if (familyMemberCount <= 1) {
        Toast({
          message: "成员数量不能小于1"
        })
      }
      if (familyMemberCount > 1) {
        this.familyConsumer.splice(idx, 1);
      }
    },
    // 编辑单个元素时，执行的内容
    editFamilyMember (idx) {
      var stateFamilyConsumer = true // 可以添加新 Tag 的指示符
      this.familyConsumer.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateFamilyConsumer = false
          Toast({
            message: "请全部保存后再进行操作"
          })
        }
      })

      if (stateFamilyConsumer == true) {
        this.familyConsumer[idx].isEdit = !this.familyConsumer[idx].isEdit;
      }
    },
    save () {
      var stateFamilyConsumer = true // 可以添加新 Tag 的指示符
      this.familyConsumer.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateFamilyConsumer = false
          Toast({
            message: "请保存所有标签后再进行操作"
          })
        }
      })
      if (stateFamilyConsumer == true) {
        this.$setStorage("familyConsumer", this.familyConsumer)
        this.$router.go(-1);
      }
    },
    createID (num) {
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
      return arr.join("")
    },
  },
};
</script>

<style lang="less" scoped>
.setting__tag {
  position: fixed;
  background-color: #f8f8f8;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}
.wrap {
  padding-bottom: 80px;
}
.save-btn {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 90%;
}
</style>