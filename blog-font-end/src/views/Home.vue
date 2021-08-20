<template>
   <courousel :delayTime="500" :imageChangeTime="4000" :contents="true" ></courousel>
</template>

<script lang='ts'>
import { defineComponent , reactive} from 'vue'
import Courousel from "../components/Couruousel/Courousel.vue"
export default defineComponent({
  name: 'Home',
  components:{
    Courousel
  },
  props:{

  },
  setup(props){

  },
  methods:{

  }
})
</script >

<style scoped>

</style>

