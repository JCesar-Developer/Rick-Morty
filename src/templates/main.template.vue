<template>

  <!-- GLOBAL-ERROR-HANDLER -->
  <Alert :show="alert.show" :message="alert.message" :new-class="alert.newClass" :position="alert.position"></Alert>

  <!-- MAIN-TEMPLATE -->
  <div id="main-template" class="d-flex min-vh-100 flex-column flex-lg-row m-0 bg-700">

    <!-- Aside -->
    <Aside class="col-lg-3 p-0" @search="searchCharacters($event)"></Aside>

    <div class="col-lg-9 p-0 position-relative">

      <Transition name="fade">
        <!-- Loading-view -->
        <template v-if="showLoadingScreen">
          <Loading/>
        </template>
  
        <template v-else>
          <!-- Home-view -->
          <template v-if="characters.length > 0">
            <Home :characters="characters"/>
          </template>

          <!-- Not-found-view -->
          <template v-else>
            <NotFound/>
          </template>
        </template>
      </Transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

//Pages
import NotFound from '@/views/not-found.view.vue';
import Home from '@/views/home/home.view.vue';
import Loading from '@/views/loading.view.vue';

//Components
import Alert from '@/shared/components/alert/alert.component.vue';
import Aside from '@/shared/components/aside.component.vue';

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
  const showLoadingScreen = ref<boolean>(false);

  let totalPages: number;
  let params: ICharactersParams = { page: 1 }

  onBeforeMount( async () => {
    showLoadingScreen.value = true;

    await getCharacters( params )
      .then( pages => totalPages = pages )
      .catch( err => {
        setMessage(err);
        showAlert();
      });

    showLoadingScreen.value = false;
  });

  const searchCharacters = async (newParams: ICharactersParams) => {
    showLoadingScreen.value = true;
    params = newParams;
    //scrollTop();

    await getCharacters( params )
      .then( pages => totalPages = pages )
      .catch( err => {
        alert.message = err;
        alert.show = !alert.show;
      });
    
    setTimeout(() => {
      showLoadingScreen.value = false;
    }, 500);
    //checkScrollStatus();
  }

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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
}
</style>