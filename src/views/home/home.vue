<template>
  <div class="row m-0 bg-700">
    <!-- Aside -->
    <Aside class="col-3 p-0"></Aside>
    
    <!-- Infinite-scroll -->
    <div class="col-9 p-0">    
      <InfiniteScroll id="home-view" :stop-scroll="stopScroll" :loading="true" class="center py-5" @scroll-end="onScrollEnd">
        <div class="thin-container row row-gap-5">
      
          <div v-for="(character, index) in characters" :key="index" class="col-6 col-md-4 col-lg-3 center">
            <Card :character="character"></Card>
          </div>
      
        </div>
      </InfiniteScroll>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';
import Aside from './components/aside.component.vue';
import Card from './components/card.component.vue';
import useCharacters from './composables/useCharacters.composable';

  const { characters, getCharacters, updateCharacters } = useCharacters();
  const stopScroll = ref<boolean>(false);

  let totalPages: number;
  let currentPage: number = 1;

  onBeforeMount( async () => {
    await getCharacters(currentPage)
      .then( pages => totalPages = pages )
      .catch( err => console.log(err));
  });

  const onScrollEnd = async () => {
    if( currentPage >= totalPages ) return;
    currentPage++;
    
    await updateCharacters(currentPage)
      .catch( err => console.log(err) );
    
    if( currentPage >= totalPages ) stopScroll.value = true;
  }

</script>

<style scoped lang="scss"></style>