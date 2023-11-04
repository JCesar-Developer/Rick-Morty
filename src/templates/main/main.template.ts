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

export default defineComponent({

  components: { Alert, SideBar, Loading, NotFound, Home, BlackCurtain },

  setup() {
    const showLoadingScreen = ref<boolean>(false);

    const paramsStore = useParamsStore();
    const sideBarStore = useSidebarStore();
    const { characters, getCharacters, loadMoreCharacters } = useCharacters();
    const { alert, setAlertMessage, showAlert } = useAlert();
    const { stopScrolling, showLoader, showScrollLoading, hideScrollLoading, checkScrollStatus, noMorePages } = useScroll();
    const { startSwipe, swipe, endSwipe } = useSwipe();

    onBeforeMount(async () => {
      showLoadingScreen.value = true;

      await getCharacters( paramsStore.params )
        .then( tPages => paramsStore.setTotalPages( tPages ) )
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
        });

      showLoadingScreen.value = false;
    });

    onMounted(() => {
      autoActivateSideBar();
    });

    const autoActivateSideBar = () => {
      if ( getViewportWidth() > 992 ) return;
      setTimeout(() => {
        sideBarStore.activateSideBar();
      }, 1500);
    }

    const searchCharacters = async (closeSideBar?: boolean) => {
      showLoadingScreen.value = true;

      await getCharacters( paramsStore.params )
        .then( tPages => paramsStore.setTotalPages( tPages ) )
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
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
      if ( noMorePages() ) return;

      showScrollLoading();
      paramsStore.increasePage(1);

      await loadMoreCharacters( paramsStore.params )
        .then( () => hideScrollLoading() )
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
        });

      checkScrollStatus();
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