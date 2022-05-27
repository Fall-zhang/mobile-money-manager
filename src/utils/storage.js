// 为浏览器添加默认缓存
function setSomeStorage () {
  // 添加数据记录缓存
  let payArray = [{
    id: "111111", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["零食"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-04-26 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }, {
    id: "111111", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["蔬菜"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-04-26 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  },
  {
    id: "222222", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["零食"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-04-27 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }, {
    id: "333333", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["游戏"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-04-28 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }, {
    id: "444444", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["零食"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-04-29 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }, {
    id: "7777", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["蔬菜"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-05-05 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }, {
    id: "44454312444", // 表示流水 id ，用于获取唯一值
    amount: (Math.random() * 99).toFixed(2), // 表示【消费金额】
    tag: ["学习"], // 表示数据添加时的标签【消费标签】
    person: "某某", // 表示使用资金的人【支出成员】
    date: "2021-05-05 00:05", // 表示支出的时间【消费时间】， 格式 yyyy-mm-dd，精确到小时即可
    recordTime: "", // 表示数据记录的时间， 格式同上
    note: "", // 【备注信息】
  }]
  // for (let i = 0; i < 2; i++) {
  //   payArray.push();
  // }
  var str = JSON.stringify(payArray)
  localStorage.setItem("historyPay", str)
  // 添加成员缓存
  var settingMembers = [{
    text: "我",// 表示tag中的内容
    isEdit: false, // 表示 tag 当前是否为保存状态
    id: "c7s5cW", // 表示标识该 tag 的唯一字段值
  }]
  localStorage.setItem("familyConsumer", JSON.stringify(settingMembers))
  // 添加标签缓存
  var settingTags = [{
    isEdit: false, // 当前元素是否为编辑状态
    id: '4xE5bnc',// 当前元素的唯一标识符
    text: "零食",// 表示tag中的内容
  }, {
    isEdit: false, // 当前元素是否为编辑状态
    id: '4xEgd5c',// 当前元素的唯一标识符
    text: "蔬菜",// 表示tag中的内容
  }, {
    isEdit: false, // 当前元素是否为编辑状态
    id: '9xEzz5c',// 当前元素的唯一标识符
    text: "水果",// 表示tag中的内容
  }, {
    isEdit: false, // 当前元素是否为编辑状态
    id: '4xEcv5c',// 当前元素的唯一标识符
    text: "游戏",// 表示tag中的内容
  }, {
    isEdit: false, // 当前元素是否为编辑状态
    id: '6xExczc',// 当前元素的唯一标识符
    text: "学习",// 表示tag中的内容
  }, {
    isEdit: false, // 当前元素是否为编辑状态
    id: '2xE5cvcc',// 当前元素的唯一标识符
    text: "借出",// 表示tag中的内容
  }]
  localStorage.setItem("settingTags", JSON.stringify(settingTags))
  // 添加默认配置缓存
  localStorage.setItem("moreFunctionState", JSON.stringify(false))
  var budgetHistory = [
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
  ]
  localStorage.setItem("budgetHistory", JSON.stringify(budgetHistory))
}
// 浏览器添加缓存
const setStorage = (name, value) => {
  if (value) {
    value = JSON.stringify(value);
  }
  localStorage.setItem(name, value);
}
//获取浏览器缓存
const getStorage = (name) => {
  let value = null
  // 如果没有任何缓存，创建初始缓存
  if (localStorage.getItem("setItem") == null) {
    value = setSomeStorage()
    localStorage.setItem("setItem", true)
  }
  if (localStorage.getItem(name)) {
    value = JSON.parse(localStorage.getItem(name))
  }
  return value
}
// 按照 id 删除浏览器中的某个资金缓存
function deleteArryItem (arr, deleteItem) {
  var eventArr = []
  arr.forEach((item, index) => {
    if (item.id == deleteItem) {
      var str = []
      var str1 = arr.slice(0, index)
      var str2 = arr.slice(index + 1, arr.length)
      str = str.concat(str1, str2)
      eventArr = str
    }
  });
  return eventArr
}
const deleteStorage = (name, id) => {
  var storage = JSON.parse(localStorage.getItem(name))
  var eventArr = deleteArryItem(storage, id)
  JSON.stringify(eventArr)

}
export default (Vue) => {
  //添加全局API
  Vue.prototype.$setStorage = setStorage
  Vue.prototype.$getStorage = getStorage
  Vue.prototype.$deleteStorage = deleteStorage
}

