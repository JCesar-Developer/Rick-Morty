<template>
  <div id="home-view">
    <InfiniteScroll :stop-scroll="stopScrolling" :loading="showLoader" class="center py-5" @scroll-end="onScrollEnd">
      <div class="thin-container">

        <Header class="d-none"></Header>

        <div id="title" class="h5 sm-h3 bolder mb-5 d-none">
          Character list
        </div>

        <!-- Card-component -->
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
import Header from '@/views/components/header.component.vue';
import Card from './components/card-component/card.component.vue';
import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';
import useScroll from './composables/useScroll.composable';

import type { ICharacter } from '@/models/character.interface';
import type { PropType } from 'vue';
import { watch } from 'vue';

  const props = defineProps({
    characters: { type: Array as PropType<ICharacter[]>, required: true },
  });

  const emit = defineEmits(['scroll-end']);
  const { stopScrolling, showLoader, showScrollLoading, hideScrollLoading, checkScrollStatus, noMorePages } = useScroll();

  const onScrollEnd = async () => {
    if ( noMorePages() ) return;
    showScrollLoading();
    emit('scroll-end');
  }

  watch(() => props.characters, () => {
    hideScrollLoading();
    checkScrollStatus();
  });
</script>

<style src="./home.view.scss" scoped lang="scss"></style>