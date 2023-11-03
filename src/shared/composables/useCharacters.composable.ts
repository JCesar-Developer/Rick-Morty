import { ref } from 'vue';
import CharactersController from '@/controllers/characters.controller';
import type { ICharacter } from '@/models/character.interface';
import type { ICharactersParams } from '@/api/api';

export default function useCharacters() {
  const charactersController = CharactersController.getInstance();
  const characters = ref<ICharacter[]>([]);

  const getCharacters = async (params: ICharactersParams): Promise<number> => {
    const charactersData = await charactersController.getCharacters(params);
    characters.value = charactersData.results;
    return charactersData.info.pages;
  }

  const loadMoreCharacters = async (params: ICharactersParams): Promise<void> => {
    const charactersData = await charactersController.getCharacters(params);
    characters.value = [...characters.value, ...charactersData.results];
  }

  return {
    characters,
    getCharacters,
    loadMoreCharacters,
  };
}