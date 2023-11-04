import { ref } from 'vue';

export default function useScroll() {
  const stopScroll = ref<boolean>(false);
  const showLoader = ref<boolean>(false);

  const showScrollLoading = () => {
    showLoader.value = true;
  }
  const hideScrollLoading = () => {
    showLoader.value = false;
  }

  return {
    stopScroll,
    showLoader,
    showScrollLoading,
    hideScrollLoading,
  }
}