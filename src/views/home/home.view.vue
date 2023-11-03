<template>
  <div id="home-view" ref="$scrollContainer">    
    <InfiniteScroll :stop-scroll="stopScroll" :loading="showScrollLoading" class="center py-5" @scroll-end="onScrollEnd">
      <div class="thin-container">

        <div class="row row-gap-5">
          <div v-for="(character, index) in characters" :key="index" class="col-6 col-sm-4 col-xxl-3 center">
            <Card :character="character"></Card>
          </div>
        </div>

      </div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';

import Card from './components/card.component.vue';
import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';

import type { ICharacter } from '@/models/character.interface';

  defineProps({
    characters: {
      type: Array as PropType<ICharacter[]>,
      required: true
    }
  });

  const $scrollContainer = ref<HTMLElement|null>(null);
  const stopScroll = ref<boolean>(false);
  const showScrollLoading = ref<boolean>(false);

  const onScrollEnd = async () => {

  }

</script>

<style scoped lang="scss">
#home-view {
  .thin-container {
    width: 900px;

    @media (max-width: 1200px) {
      width: 100%;
      padding: 0 3rem !important;
    }
    @media (max-width: 992px) {
      width: 900px;
      padding: 0 2rem !important;
    }
    @media (max-width: 900px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      padding: 0 1rem !important;
    }
    @media (max-width: 680px) and (min-width: 576px){
      .card { width: 100%; }
    }
  }
}
</style>