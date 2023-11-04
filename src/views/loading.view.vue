<template>
  <div id="loading-view" class="black-curtain center justify-content-center" :class="{'side-bar-active': sideBarStore.isOpen}">
    <img class="loading" src="@/assets/images/loading.png" alt="Loading...">
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar.store'
const sideBarStore = useSidebarStore();
</script>

<style scoped lang="scss">
#loading-view {

  &.side-bar-active {
    @media (max-width: 992px) and (min-width: 576px) {
      position: absolute;
      top: 0;
      left: 380px;
      width: 100%;
      width: calc(100% - 380px);
    }
  }

  .loading {
    width: 200px;
    animation: blink .5s linear infinite;
  }
  .not-found-img,
  .not-found-text {
    width: 40%;
  }

  @keyframes blink {
    0% {opacity: 1;}
    50% {opacity: 0.5;}
    100% {opacity: 1;}
  }
}
</style>