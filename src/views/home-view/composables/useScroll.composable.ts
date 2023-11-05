import { ref } from 'vue';
import { useParamsStore } from '@/stores/params.store';

export default function useScroll() {
  const paramsStore = useParamsStore();
  const stopScrolling = ref<boolean>(false);
  const showLoader = ref<boolean>(false);

  const showScrollLoading = () => {
    console.log('showScrollLoading');
    showLoader.value = true;
  }
  const hideScrollLoading = () => {
    console.log('hideScrollLoading');
    showLoader.value = false;
  }
  const checkScrollStatus = () => {
    console.log('checkScrollStatus');
    stopScrolling.value = ( noMorePages() );
  };
  const noMorePages = () => {
    return paramsStore.params.page >= paramsStore.totalPages;
  }

  return {
    stopScrolling,
    showLoader,
    showScrollLoading,
    hideScrollLoading,
    checkScrollStatus,
    noMorePages,
  }
}