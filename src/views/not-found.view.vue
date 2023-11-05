<template>
  <div id="not-found-view" class="vh-min-100 center justify-content-center">
    <Header class="d-none"></Header>

    <div id="not-found-container" class="d-flex flex-column">
      <img class="not-found-img" src="@/assets/images/not-found-img.png" alt="Not found img">
      <img class="not-found-text" src="@/assets/images/not-found-text.png" alt="Not found text">
      <h2 class="text-center h5">It seems that this character does not exist in this universe.</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/components/header.component.vue';
</script>

<style scoped lang="scss">
#not-found-view {
  #header {
    @media (max-width: 992px) {
      display: block !important;
    }
  }

  #not-found-container {
    width: 40%;

    @media (max-width: 992px) {
      margin-top: 100px;
      width: 30%;
      
      h2 {
        margin-top: 10px;
        font-size: 18px !important;
      }
    }
    @media (max-width: 768px) {
      width: 40%;
    }
    @media (max-width: 576px) {
      width: 60%;
      h2 {
        font-size: 16px !important;
      }
    }
  }
}
</style>