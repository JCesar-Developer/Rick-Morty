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

//types
import type { resultToReturn } from './composables/useCharacters.composable';

//Helpers
import { getViewportWidth } from '@/shared/helpers';

export default defineComponent({

  components: { Alert, SideBar, Loading, NotFound, Home, BlackCurtain },

  setup() {
    const showLoadingScreen = ref<boolean>(false);

    const paramsStore = useParamsStore();
    const sideBarStore = useSidebarStore();
    const { characters, getCharacters, loadMoreCharacters } = useCharacters();
    const { alert, setAlertMessage, showAlert } = useAlert();
    const { startSwipe, swipe, endSwipe } = useSwipe(  );

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
        .then( (resoult: resultToReturn) => {
          paramsStore.setTotalPages( resoult.totalPages );
          sideBarStore.setTotalResults( resoult.totalResults );
        })
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
        });

      showLoadingScreen.value = false;
    });

    //ciclo principal
    const searchCharacters = async () => {
      showLoadingScreen.value = true;

      await getCharacters( paramsStore.params )
        .then( (resoult: resultToReturn) => {
          paramsStore.setTotalPages( resoult.totalPages );
          sideBarStore.setTotalResults( resoult.totalResults );
        })
        .catch( err => {
          setAlertMessage(err.toString());
          showAlert();
        });

      setTimeout(() => {
        if( (getViewportWidth() < 576) && sideBarStore.isSideBarActive ) {
          sideBarStore.deactivateSideBar();
        }
  
        setTimeout(() => {
          showLoadingScreen.value = false;
        }, 500);
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