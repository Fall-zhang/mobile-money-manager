<template>
  <div id="app">
    <transition name="fei-page-change">
      <router-view />
    </transition>
    <tab-bar />
  </div>
</template>
<script>
import Tabbar from '@/components/common/TabBar.vue'
export default {
  data () {
    return {
      msg: "Empty String"
    }
  },
  components: {
    "tab-bar": Tabbar
  }
}
</script>
<style>
.fei-page-change-enter-active {
  animation: change-page-in 0.5s;
}
.fei-page-change-leave {
  display: none;
  /* animation: change-page-out 0.5s; */
}
@keyframes change-page-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
