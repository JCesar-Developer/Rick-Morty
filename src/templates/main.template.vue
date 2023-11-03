<template>
  <div id="main-template" class="d-flex flex-column flex-lg-row m-0 bg-700">

    <!-- Aside -->
    <Aside class="col-lg-3 p-0" @search="searchCharacters($event)"></Aside>

  </div>
</template>

<script setup lang="ts">
import useCharacters from '@/shared/composables/useCharacters.composable';

const { characters, getCharacters, loadMoreCharacters } = useCharacters();
</script>

<style scoped lang="scss">
#main-template {
  
}
</style>