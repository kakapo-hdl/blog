<template>
  <div class="switch-btn" @click='ClickSwitch(isActive)'>
    <div :class="`${isActive ? 'switch-btn-active':''} switch-btn-cover `"></div>
    <div :class="`${isActive ? 'btn-cycle-active':''} switch-btn-cycle `"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive,ref} from 'vue'
export default defineComponent( {
name:"SwitchBtn",
props:{
  isClick:{
    type:Boolean,
    defalut:false,
    require:true
  },
},
setup(props,context){
    const isActive = ref(props.isClick);
    const methods = ({
    ClickSwitch(){ 
    isActive.value = !isActive.value
    context.emit('getStatus',isActive.value);
    }
    }

    );
    return {
      isActive,
      ...methods
    }
    
},


})
</script>

<style>
.switch-btn{
  position: relative;
  border-radius: 14px;
  width: 48px;
  height: 28px;
  overflow: hidden;
  cursor:pointer;
}
.switch-btn-active{
  background: currentColor  !important;
}
.switch-btn-cover{
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: rgba(0,0,0,.38);
}

.switch-btn-cycle{
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position:absolute;
  transition: transform .35s; 
}

.btn-cycle-active{
    transform: translateX(20px);
    background: currentColor;
}
</style>