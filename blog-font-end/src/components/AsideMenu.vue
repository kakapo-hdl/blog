<template>
<aside class="asdie-menu" ref="asideMenu"></aside>
</template>

<script>
export default {
name:'AsideMenu',
data(){
  return{
  }
},
props:{
  asideFlag:{
    type:Boolean,
    default:true,
  }
},
  watch: {
    asideFlag: function () {
      if (this.asideFlag) {
        this.$refs.asideMenu.style.transform = "translateX(0%)";
      } else {
        this.$refs.asideMenu.style.transform = "translateX(-100%)";
      }
    },
  },
  methods: {
    clickMenu() {
      if (!this.asideFlag) {
        this.$refs.asideMenu.style.transform = "translateX(0%)";
      } else {
        this.$refs.asideMenu.style.transform = "translateX(-100%)";
      }
      setTimeout(() => {
        this.asideFlag = !this.asideFlag;
      }, 0);
    },


  }
}
</script>

<style>
.asdie-menu {
  position: fixed;
  top: 0;
  height: 100%;
  width: 255px;
  z-index: 999;
  background-color: #1a1d53;
  transition-duration: 0.5s;
  transform: translateX(-100%);
}
</style>