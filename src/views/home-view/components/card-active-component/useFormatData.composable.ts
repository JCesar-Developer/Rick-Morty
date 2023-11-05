import { computed } from 'vue';
import type { ICharacter } from '@/models/character.interface';

export default function useFormatData( character: ICharacter ) {
  const shortName = computed(() => {
    return character.name.length > 15
      ? character.name.slice(0, 15)
      : character.name;
  });

  const formattedDate = computed(() => {
    const date = new Date( character.created );
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });

  return {
    shortName,
    formattedDate
  }
}