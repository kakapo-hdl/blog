<template>
  <div class="nav-btn">
    <!-- <hello-world :msg="sdfdsf"></hello-world> -->
    <router-link to="/HomePage"> Home</router-link>
    <router-link to="/MyProfile">Contact </router-link>
    <router-view></router-view>
    <button @click="menu">sdfsdf</button>
  </div>

  <teleport to="#sideMenu"
    ><aside-menu :asideFlag="isActive"></aside-menu
  ></teleport>
</template>

<script lang="ts">
import AsideMenu from "./components/AsideMenu.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    AsideMenu,
  },
  setup() {
    const store = useStore();
    const isActive = false;
    let event: ((this: Document, ev: MouseEvent) => any) | null = null;
    const bodyEl = document.getElementsByTagName("body")[0];
    const sideMenu = document.createElement("div");
    sideMenu.setAttribute("id", "sideMenu");
    bodyEl.appendChild(sideMenu);
    const targetEvent = (e: any) => {
      if (e.target.tagName === "ASIDE") {
      } else {
        document.removeEventListener("click", targetEvent);
        store.commit({
          type: "changeSideMenu",
          isActive: false,
        });
      }
    };
    const methods = {
      menu() {
        store.commit({
          type: "changeSideMenu",
          isActive: !store.state.sideMenu,
        });
        if (store.state.sideMenu) {
          setTimeout(() => {
            document.addEventListener("click",targetEvent);
          }, 0);
        }
      },
    };
    return {
      isActive: computed(() => store.state.sideMenu),
      event,
      ...methods,
    };
  },
});
</script>

<style scoped>
</style>
