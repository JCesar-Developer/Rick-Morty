<template>
  <div id="home-view" class="row m-0 bg-700">

    <Alert></Alert>

    <!-- Aside -->
    <Aside class="col-3 p-0" @search="showSearchText($event)"></Aside>
    
    <!-- Infinite-scroll -->
    <div class="col-9 p-0 position-relative" ref="$scrollContainer">    
      <InfiniteScroll :stop-scroll="stopScroll" :loading="showScrollLoading" class="center py-5" @scroll-end="onScrollEnd">
        <div class="thin-container">
      
          <template v-if="showLoadingScreen">
            <div class="black-curtain center justify-content-center">
              <img class="loading" src="/src/assets/images/loading.png" alt="Loading...">
            </div>
          </template>

          <transition name="fade">
            <div v-if="!showLoadingScreen" class="row row-gap-5">
              <template v-if="characters.length > 0">
                <div v-for="(character, index) in characters" :key="index" class="col-6 col-md-4 col-lg-3 center">
                  <Card :character="character"></Card>
                </div>
              </template>
              <template v-else>
                <div class="col-12 center my-5">
                  <!--<h1 class="text-center h3 bold">¡Oh, cielos!</h1>-->
                  <img class="not-found-img" src="/src/assets/images/not-found-img.png" alt="Not found img">
                  <img class="not-found-text" src="/src/assets/images/not-found-text.png" alt="Not found text">
                  <h2 class="text-center h5">Tal parece que ese personaje no existe en este universo.</h2>
                </div>
              </template>
            </div>
          </transition>
      
        </div>
      </InfiniteScroll>

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import Alert from '@/shared/components/alert.component.vue';
import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';
import Aside from './components/aside.component.vue';
import Card from './components/card.component.vue';
import useCharacters from './composables/useCharacters.composable';

  const { characters, getCharacters, loadMoreCharacters, updateCharacters } = useCharacters();
  const $scrollContainer = ref<HTMLElement|null>(null);
  const stopScroll = ref<boolean>(false);
  const showScrollLoading = ref<boolean>(false);
  const showLoadingScreen = ref<boolean>(true);

  let totalPages: number;
  let currentPage: number = 1;
  let paramName: string = '';

  onBeforeMount( async () => {
    await getCharacters(currentPage)
      .then( pages => totalPages = pages )
      .catch( err => console.log(err));

      showLoadingScreen.value = false;
  });

  const onScrollEnd = async () => {
    if( currentPage >= totalPages ) return;

    showScrollLoading.value = true;
    currentPage++;
    
    await loadMoreCharacters(currentPage, paramName)
      .then( () => showScrollLoading.value = false )
      .catch( err => console.log(err) );
    
    checkScrollStatus();
  }

  const showSearchText = async (searchText: string) => {
    showLoadingScreen.value = true;
    paramName = searchText;
    currentPage = 1;

    await updateCharacters(currentPage, searchText)
      .then( pages => {
        totalPages = pages 
      })
      .catch( err => console.log(err) );
    
    setTimeout(() => {
      showLoadingScreen.value = false;
    }, 500);
    checkScrollStatus();
  }

  const checkScrollStatus = () => {
    if( currentPage >= totalPages ) stopScroll.value = true;
    else stopScroll.value = false;
  }
</script>

<style scoped lang="scss">
#home-view {
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
}
</style>