<template>

  <!-- GLOBAL-ERROR-HANDLER -->
  <Alert :show="alert.show" :message="alert.message" :new-class="alert.newClass" :position="alert.position"></Alert>

  <!-- MAIN-TEMPLATE -->
  <div id="main-template" class="d-flex min-vh-100 flex-column flex-lg-row m-0 bg-700">

    <!-- Aside -->
    <Aside class="col-lg-3 p-0" @search="searchCharacters($event)"></Aside>

    <!-- Infinite-scroll -->
    <div ref="$scrollContainer" class="col-lg-9 p-0 position-relative">    
      <InfiniteScroll :stop-scroll="stopScroll" :loading="showScrollLoading" class="center py-5" @scroll-end="onScrollEnd">
        <div class="thin-container">
      
          <!-- Loading... -->
          <template v-if="showLoadingScreen">
            <RickMortyLoading/>
          </template>

          <transition name="fade">
            <div v-if="!showLoadingScreen">

              <!-- Home-view -->
              <template v-if="characters.length > 0">
                <Home :characters="characters"/>
              </template>
              
              <!-- Not-found-view -->
              <template v-else>
                <NotFound/>
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

//Pages
import NotFound from '@/views/not-found.view.vue';
import Home from '@/views/home/home.view.vue';

//Components
import Alert from '@/shared/components/alert/alert.component.vue';
import Aside from '@/shared/components/aside.component.vue';
import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';
import RickMortyLoading from '@/shared/components/rick-morty-loading.component.vue';

//Composables
import useCharacters from '@/shared/composables/useCharacters.composable';
import useAlert from '@/shared/components/alert/useAlert.composable'

//Types
import type { ICharactersParams } from '@/api/api';


  const { characters, getCharacters, loadMoreCharacters } = useCharacters();
  const { alert, setMessage, showAlert } = useAlert();

  const $scrollContainer = ref<HTMLElement|null>(null);
  const stopScroll = ref<boolean>(false);
  const showScrollLoading = ref<boolean>(false);
  const showLoadingScreen = ref<boolean>(true);

  let totalPages: number;
  let params: ICharactersParams = { page: 1 }

  onBeforeMount( async () => {
    await getCharacters( params )
      .then( pages => totalPages = pages )
      .catch( err => {
        setMessage(err);
        showAlert();
      });

      showLoadingScreen.value = false;
  });

  const onScrollEnd = async () => {
    if( params.page >= totalPages ) return;

    showScrollLoading.value = true;
    params.page++;
    
    await loadMoreCharacters( params )
      .then( () => showScrollLoading.value = false )
      .catch( err => {
        setMessage(err);
        showAlert();
      });
    
    checkScrollStatus();
  }

  const searchCharacters = async (newParams: ICharactersParams) => {
    showLoadingScreen.value = true;
    params = newParams;
    scrollTop();

    await getCharacters( params )
      .then( pages => totalPages = pages )
      .catch( err => {
        alert.message = err;
        alert.show = !alert.show;
      });
    
    setTimeout(() => {
      showLoadingScreen.value = false;
    }, 500);
    checkScrollStatus();
  }

  const scrollTop = () => {
    const infiniteContainer = $scrollContainer.value!.firstChild as HTMLElement;
    infiniteContainer.scrollTop = 0;
  }

  const checkScrollStatus = () => {
    if( params.page >= totalPages ) stopScroll.value = true;
    else stopScroll.value = false;
  }

</script>

<style scoped lang="scss">
#main-template {
  #aside-component {
    @media (max-width: 992px) {
      display: none !important;
    }
  }

  .infinite-scroll {
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
}
</style>