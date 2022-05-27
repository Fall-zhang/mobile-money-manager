import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Icon, Button, Cell, NavBar, Tabbar, TabbarItem, CellGroup, Field, Form, Picker, ActionSheet, SwipeCell, Calendar, Popup, Checkbox, CheckboxGroup, List, Switch, Tab, Tabs } from 'vant';
import { Dialog } from "vant";
import less from 'less';
import './assets/global/index.css';
import storage from './utils/storage' // 引入浏览器缓存的存储方法


Vue.use(Icon);
Vue.use(Button);
Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Form);
Vue.use(Picker);
Vue.use(ActionSheet)
Vue.use(SwipeCell)
Vue.use(Calendar)
Vue.use(Popup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(List)
Vue.use(Switch)
Vue.use(Tab)
Vue.use(Tabs)


Vue.use(Dialog)

Vue.use(less)
Vue.use(storage);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
