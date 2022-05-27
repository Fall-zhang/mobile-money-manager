<template>
  <div class="setting__tag">
    <van-nav-bar title="标签设置"
                 left-text="返回"
                 right-text="新建"
                 left-arrow
                 @click-left="$router.go(-1)"
                 @click-right="createNewTag" />
    <h1>标签设置</h1>
    <div class="wrap">
      <van-swipe-cell v-for="(item, index) in tags"
                      :key="item.id">
        <van-field v-model="item.text"
                   :readonly="!item.isEdit"
                   placeholder="在此输入标签"
                   :rules="[{ required: true,
                      message: '请输入正确内容' }]">
          <template #button
                    v-if="item.isEdit">
            <van-button size="small"
                        @click="saveThisTag(index)"
                        type="primary">保存</van-button>
          </template>
        </van-field>
        <template #right
                  v-if="!item.isEdit">
          <div>
            <van-button @click="editTag(index)"
                        type="primary"
                        text="编辑" />
            <van-button @click="deleteTag(index)"
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
                  block
                  type="info"
                  native-type="submit">保存</van-button>
    </div>
    <joker-tag :tagger="$attrs" foo="foo" coo="coo" name="11313" @click="createNewTag"></joker-tag>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import Joker from './Joker.vue'
Vue.use(Toast)
export default {
  components:{
    'joker-tag':Joker
  },
  data () {
    return {
      tags: [{
        text: "默认内容",// 表示tag中的内容
        isEdit: true, // 表示 tag 当前是否为保存状态
        id: "c7s5cW", // 表示标识该 tag 的唯一字段值
      }],
      id: 0,
    };
  },
  created () {
    this.tags = this.$getStorage("settingTags")
  },
  methods: {
    createNewTag () {
      var stateTags = true // 可以添加新 Tag 的指示符
      this.tags.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateTags = false
          Toast({
            message: "请全部保存后再进行新增操作"
          })
        }
      })
      if (stateTags) {
        this.tags.push({ text: "", isEdit: true, id: this.createID(10) });
      }
    },
    saveThisTag (index) {
      // console.log(index);
      this.tags[index].isEdit = false;
    },
    deleteTag (idx) {
      // console.log(idx);
      if (this.tags.length != 1) {
        this.tags.splice(idx, 1);
      } else {
        Toast({
          message: "最少保留一个标签"
        })
      }
    },
    // 编辑单个元素时，执行的内容
    editTag (idx) {
      var stateTags = true // 可以添加新 Tag 的指示符
      this.tags.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateTags = false
          Toast({
            message: "请全部保存后再进行操作"
          })
        }
      })
      if (stateTags == true) {
        this.tags[idx].isEdit = !this.tags[idx].isEdit;
      }
    },
    save () {
      var stateTags = true // 可以添加新 Tag 的指示符
      this.tags.forEach((item) => {
        // console.log(item)
        if (item.isEdit == true) {
          stateTags = false
          Toast({
            message: "请保存所有标签后再进行操作"
          })
        }
      })
      if (stateTags == true) {
        this.$setStorage("settingTags", this.tags)
        this.$router.push("/setting");
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
  z-index: 99;
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