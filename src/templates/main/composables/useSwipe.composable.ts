import { ref } from 'vue';
import { useSidebarStore } from '@/stores/sidebar.store';

export default function useSwipe(){
  const isSwapping = ref<boolean>(false);
  const startPosition = ref<number>(0);
  const sideBarStore = useSidebarStore();

  const startSwipe = (event: TouchEvent) => {
    isSwapping.value = true;
    startPosition.value = event.touches[0].clientX;
  };

  const swipe = (event: TouchEvent) => {
    if (isSwapping.value) {
      const endPosition = event.touches[0].clientX;
      const deltaX: number = startPosition.value - endPosition;
      if (deltaX > 20) {
        sideBarStore.deactivateSideBar();
        isSwapping.value = false;
      } else if (deltaX < -20) {
        sideBarStore.activateSideBar();
        isSwapping.value = false;
      }
    }
  };

  const endSwipe = () => {
    isSwapping.value = false;
  };

  return {
    startSwipe,
    swipe,
    endSwipe,
  }
}