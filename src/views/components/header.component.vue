<template>
  <header id="header">
    <div class="thin-container d-flex justify-content-between">

      <!-- logo -->
      <div id="logo">
        <img src="@/assets/images/logo.png" alt="Logo">
      </div>

      <!-- nav-bar -->
      <div id="nav-btn" @click="sideBarStore.activateSideBar">
        <img id="cruiser" src="@/assets/images/space-cruiser.png" alt="cruiser">
        <img id="portal" src="@/assets/images/portal.png" alt="portal">
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar.store';
const sideBarStore = useSidebarStore();
</script>

<style scoped lang="scss">
header {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100px;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.9);
  box-shadow: rgba(0, 0, 0) 0px 8px 15px;

  @media (max-width: 576px) {
    height: 90px;
    padding: 20px 0;
  }

  .thin-container {
    height: 100%;
    max-width: 900px;
    margin: 0 auto;

    @media (max-width: 900px) {
      width: 100%;
      padding: 0 2rem !important;
    }
  }

  #logo, #nav-btn {
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  #nav-btn {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;

    #cruiser {
      position: absolute;
      left: -5px;
      padding: 0 0 0 10px;
      transform: rotateY(180deg);
    }
  }
}
</style>