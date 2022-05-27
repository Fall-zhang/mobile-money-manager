<template>
  <div>
纯粹是占位置{{$attrs}}
<Kidding v-bind="$attrs"></Kidding>
  </div>
</template>
<script>
import Kidding from './Kidding.vue'
export default {
  components:{
    Kidding
  },
  data(){
    return{

    }
  },
  created(){
    console.log(this.$attrs);
  }
}
</script>