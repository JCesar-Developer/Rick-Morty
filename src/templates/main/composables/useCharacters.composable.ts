import { ref } from 'vue';
import CharactersController from '@/controllers/characters.controller';
import type { ICharacter } from '@/models/character.interface';
import type { ICharactersParams } from '@/api/api';

export interface resultToReturn {
  totalPages: number;
  totalResults: number;
}

export default function useCharacters() {
  const charactersController = CharactersController.getInstance();
  const characters = ref<ICharacter[]>([]);

  const getCharacters = async (params: ICharactersParams): Promise<resultToReturn> => {
      const charactersData = await charactersController.getCharacters(params);
      characters.value = charactersData.results;

      const resultToReturn: resultToReturn = {
        totalPages: charactersData.info.pages,
        totalResults: charactersData.info.count,
      };

      return resultToReturn;
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