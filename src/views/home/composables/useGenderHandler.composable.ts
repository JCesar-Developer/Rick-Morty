import { ref } from 'vue';
import Gender from '@/shared/interfaces/gender.enum';

import type { Filter } from '@/shared/interfaces/filter.interface';
import type { ICharactersParams } from '@/api/api';

export default function useGenderHandler(params: ICharactersParams, emit: (event: 'search', params: ICharactersParams) => void) {

  const activeGender = ref<number|undefined>(undefined);
  const genderHandler: Filter[] = [
    { id: 1, name: Gender.FEMALE, value: Gender.FEMALE },
    { id: 2, name: Gender.MALE, value: Gender.MALE },
    { id: 3, name: Gender.GENDERLESS, value: Gender.GENDERLESS },
    { id: 4, name: Gender.UNKNOWN, value: Gender.UNKNOWN },
  ];

  const emitGender = ( filter: Filter ) => {
    if ( deactivateGender( filter.id ) ) return;

    activeGender.value = filter.id;
    params.page = 1;
    params.gender = filter.value as Gender;
    emit('search', params);
  };

  const deactivateGender = ( filterId: number ): boolean => {
    if( activeGender.value == filterId ) {
      activeGender.value = undefined;
      params.page = 1;
      params.gender = undefined;
      emit('search', params);
      return true;
    }

    return false;
  };

  return {
    activeGender,
    genderHandler,
    emitGender,
  }
}