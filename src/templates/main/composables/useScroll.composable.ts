import { ref } from 'vue';

export default function useScroll() {
  const stopScrolling = ref<boolean>(false);
  const showLoader = ref<boolean>(false);

  const showScrollLoading = () => {
    showLoader.value = true;
  }
  const hideScrollLoading = () => {
    showLoader.value = false;
  }

  return {
    stopScrolling,
    showLoader,
    showScrollLoading,
    hideScrollLoading,
  }
}