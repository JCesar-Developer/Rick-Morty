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
import useSwipe from './composables/useSwipe.composable';

export default defineComponent({

  components: { Alert, SideBar, Loading, NotFound, Home, BlackCurtain },

  setup() {
    const showLoadingScreen = ref<boolean>(false);

    const paramsStore = useParamsStore();
    const sideBarStore = useSidebarStore();
    const { characters, getCharacters, loadMoreCharacters } = useCharacters();
    const { alert, setAlertMessage, showAlert } = useAlert();
    const { startSwipe, swipe, endSwipe } = useSwipe();

    /**
     * He decidido no encapsular los ciclos de vida principales en un webhook (composable function en vue),
     * principalmente para evitar uno de los principales smell-codes modernos en el desarrollo web front-end:
     * "TOO MUCH MAGIC", que es cuando el componente no expresa individualmente su comportamiento. Haciendo que,
     * futuros desarrolladores, sean incapaces de entender de donde vienen las asignaciones de las variables. 
     */

    //Ciclo principal
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

    //ciclo principal
    onMounted(() => {
      autoActivateSideBar();
    });

    //sidebar-handler
    const autoActivateSideBar = () => {
      if ( getViewportWidth() > 992 ) return;
      setTimeout(() => {
        sideBarStore.activateSideBar();
      }, 1500);
    }
    
    const getViewportWidth = (): number => {
      return window.innerWidth;
    };

    //ciclo principal
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

        //sidebar-handler
        if( closeSideBar && sideBarStore.isSideBarActive ) {
          sideBarStore.deactivateSideBar();
        }
      }, 500);
    };

    //ciclo principal
    const loadMore = async () => {
      paramsStore.increasePage(1);

      await loadMoreCharacters( paramsStore.params )
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
        });
    };

    return {
      alert,
      characters,
      loadMore,
      searchCharacters,
      showLoadingScreen,
      sideBarStore,
      startSwipe,
      swipe,
      endSwipe,
    };
  },
});