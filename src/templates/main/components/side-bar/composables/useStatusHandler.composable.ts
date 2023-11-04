import { ref } from 'vue';
import Status from '@/shared/interfaces/status.enum';
import { useParamsStore } from '@/stores/params.store';
import type { Filter } from '@/shared/interfaces/filter.interface';

export default function useStatusHandler( emit: (event: 'search') => void ) {

  const paramsStore = useParamsStore();
  const activeStatus = ref<number|undefined>(undefined);
  const statusHandler: Filter[] = [
    { id: 1, name: Status.ALIVE, value: Status.ALIVE },
    { id: 2, name: Status.DEAD, value: Status.DEAD },
    { id: 3, name: Status.UNKNOWN, value: Status.UNKNOWN }
  ];

  const setStatus = ( filter: Filter ) => {
    if ( deactivateStatus( filter.id ) ) return;
    
    activeStatus.value = filter.id;
    paramsStore.setPage(1);
    paramsStore.setStatus(filter.value as Status);
    emit('search');
  };

  const deactivateStatus = ( filterId: number ): boolean => {
    if( activeStatus.value == filterId ) {
      activeStatus.value = undefined;
      paramsStore.setPage(1);
      paramsStore.setStatus(undefined);
      emit('search');

      return true;
    }
    return false;
  };

  return {
    activeStatus,
    statusHandler,
    setStatus,
  }
}