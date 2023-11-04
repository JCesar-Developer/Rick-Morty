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
import { useParamsStore } from '@/stores/params.store';
import { useSidebarStore } from '@/stores/sidebar.store';
import useAlert from './composables/useAlert.composable';
import useCharacters from './composables/useCharacters.composable';
import useScroll from './composables/useScroll.composable';
import useSwipe from './composables/useSwipe.composable';

//Types
import type { ICharactersParams } from '@/api/api';

export default defineComponent({

  components: { Alert, SideBar, Loading, NotFound, Home, BlackCurtain },

  setup() {
    const showLoadingScreen = ref<boolean>(false);

    const paramsStore = useParamsStore();
    const sideBarStore = useSidebarStore();
    const { characters, getCharacters, loadMoreCharacters } = useCharacters();
    const { alert, setMessage, showAlert } = useAlert();
    const { stopScrolling, showLoader, showScrollLoading, hideScrollLoading } = useScroll();
    const { startSwipe, swipe, endSwipe } = useSwipe();

    onBeforeMount(async () => {
      showLoadingScreen.value = true;

      await getCharacters( paramsStore.params )
        .then( tPages => paramsStore.setTotalPages( tPages ) )
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

    const searchCharacters = async (closeSideBar?: boolean) => {
      showLoadingScreen.value = true;

      await getCharacters( paramsStore.params )
        .then( tPages => paramsStore.setTotalPages( tPages ) )
        .catch( err => {
          alert.message = err;
          alert.show = !alert.show;
        });

      setTimeout(() => {
        showLoadingScreen.value = false;
        if( closeSideBar && sideBarStore.isSideBarActive ) {
          sideBarStore.deactivateSideBar();
        }
      }, 500);
      checkScrollStatus();
    };

    const loadMore = async () => {
      if ( paramsStore.params.page >= paramsStore.totalPages ) return;

      showScrollLoading();
      paramsStore.increasePage(1);

      await loadMoreCharacters( paramsStore.params )
        .then( () => hideScrollLoading() )
        .catch( err => {
          setMessage(err);
          showAlert();
        });

      checkScrollStatus();
    };

    const checkScrollStatus = () => {
      stopScrolling.value = ( paramsStore.params.page >= paramsStore.totalPages );
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
      startSwipe,
      swipe,
      endSwipe,
    };
  },
});