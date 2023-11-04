import { ref } from 'vue';
import Gender from '@/shared/interfaces/gender.enum';
import { useParamsStore } from '@/stores/params.store';
import type { Filter } from '@/shared/interfaces/filter.interface';

export default function useGenderHandler( emit: (event: 'search') => void ) {

  const paramsStore = useParamsStore();
  const activeGender = ref<number|undefined>(undefined);
  const genderHandler: Filter[] = [
    { id: 1, name: Gender.FEMALE, value: Gender.FEMALE },
    { id: 2, name: Gender.MALE, value: Gender.MALE },
    { id: 3, name: Gender.GENDERLESS, value: Gender.GENDERLESS },
    { id: 4, name: Gender.UNKNOWN, value: Gender.UNKNOWN },
  ];

  const setGender = ( filter: Filter ) => {
    if ( deactivateGender( filter.id ) ) return;

    activeGender.value = filter.id;
    paramsStore.setPage(1);
    paramsStore.setGender(filter.value as Gender)
    emit('search');
  };

  const deactivateGender = ( filterId: number ): boolean => {
    if( activeGender.value == filterId ) {
      activeGender.value = undefined;
      paramsStore.setPage(1);
      paramsStore.setGender(undefined);
      emit('search');

      return true;
    }

    return false;
  };

  return {
    activeGender,
    genderHandler,
    setGender,
  }
}