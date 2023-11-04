import { ref } from 'vue';
import Status from '@/shared/interfaces/status.enum';

import type { Filter } from '@/shared/interfaces/filter.interface';
import type { ICharactersParams } from '@/api/api';


export default function useStatusHandler(params: ICharactersParams, emit: (event: 'search', params: ICharactersParams) => void) {

  const activeStatus = ref<number|undefined>(undefined);
  const statusHandler: Filter[] = [
    { id: 1, name: Status.ALIVE, value: Status.ALIVE },
    { id: 2, name: Status.DEAD, value: Status.DEAD },
    { id: 3, name: Status.UNKNOWN, value: Status.UNKNOWN }
  ];

  const emitStatus = ( filter: Filter ) => {
    if ( deactivateStatus( filter.id ) ) return;

    activeStatus.value = filter.id;
    params.page = 1;
    params.status = filter.value as Status;
    emit('search', params);
  };

  const deactivateStatus = ( filterId: number ): boolean => {
    if( activeStatus.value == filterId ) {
      activeStatus.value = undefined;
      params.page = 1;
      params.status = undefined;
      emit('search', params);
      return true;
    }

    return false;
  };

  return {
    activeStatus,
    statusHandler,
    emitStatus,
  }
}