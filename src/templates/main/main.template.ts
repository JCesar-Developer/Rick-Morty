import { defineComponent, ref, onBeforeMount, onMounted } from 'vue';

//Pages
import NotFound from '@/views/not-found.view.vue';
import Home from '@/views/home-view/home.view.vue';
import Loading from '@/views/loading.view.vue';

//Components
import Alert from '@/shared/components/alert/alert.component.vue';
import BlackCurtain from '@/shared/components/black-curtain.component.vue';
import SideBar from './components/side-bar/side-bar.component.vue';

//Composables
import { useSidebarStore } from '@/stores/sidebar.store';
import useAlert from '@/shared/components/alert/useAlert.composable';
import useCharacters from './composables/useCharacters.composable';
import useScroll from './composables/useScroll.composable';

//Types
import type { ICharactersParams } from '@/api/api';

export default defineComponent({

  components: { Alert, SideBar, Loading, NotFound, Home, BlackCurtain },

  setup() {
    const showLoadingScreen = ref<boolean>(false);

    let totalPages: number;
    let params: ICharactersParams = { page: 1 };

    const sideBarStore = useSidebarStore();
    const { characters, getCharacters, loadMoreCharacters } = useCharacters();
    const { alert, setMessage, showAlert } = useAlert();
    const { stopScrolling, showLoader, showScrollLoading, hideScrollLoading } = useScroll();

    onBeforeMount(async () => {
      showLoadingScreen.value = true;

      await getCharacters( params )
        .then( tPages => totalPages = tPages )
        .catch( err => {
          setMessage(err);
          showAlert();
        });

      showLoadingScreen.value = false;
    });

    onMounted(() => {
      if ( getViewportWidth() > 992 ) return;
      setTimeout(() => {
        sideBarStore.activateSideBar();
      }, 1500);
    });

    const searchCharacters = async (newParams: ICharactersParams) => {
      //if( params.name !== newParams.name ) console.log('new search');

      console.log('local params name', params);
      console.log('new params name', newParams);
      

      showLoadingScreen.value = true;
      params = newParams;


      await getCharacters( params )
        .then( tPages => totalPages = tPages )
        .catch( err => {
          alert.message = err;
          alert.show = !alert.show;
        });

      setTimeout(() => {
        showLoadingScreen.value = false;
      }, 500);
      checkScrollStatus();
    };

    const loadMore = async () => {
      if ( params.page >= totalPages ) return;

      showScrollLoading();
      params.page++;

      await loadMoreCharacters( params )
        .then( () => hideScrollLoading() )
        .catch( err => {
          setMessage(err);
          showAlert();
        });

      checkScrollStatus();
    };

    const checkScrollStatus = () => {
      stopScrolling.value = ( params.page >= totalPages );
    };

    const getViewportWidth = (): number => {
      return window.innerWidth;
    };

    return {
      alert,
      characters,
      loadMore,
      searchCharacters,
      showLoader,
      showLoadingScreen,
      sideBarStore,
      stopScrolling,
    };
  },
});