import { ref } from 'vue';
import CharactersController from '@/controllers/characters.controller';
import type { ICharacter } from '@/models/character.interface';

export default function useCharacters() {
  const charactersController = CharactersController.getInstance();
  const characters = ref<ICharacter[]>([]);

  const getCharacters = async (currentPage: number): Promise<number> => {
    try {
      const charactersData = await charactersController.getCharacters(currentPage);
      characters.value = charactersData.results;
      return charactersData.info.pages;

    } catch (error: any) {
      throw error;
    }
  }

  const loadMoreCharacters = async (currentPage: number, name?: string): Promise<void> => {
    try {
      const charactersData = await charactersController.getCharacters(currentPage, name);
      characters.value = [...characters.value, ...charactersData.results];
    
    } catch (error: any) {
      throw error;
    }
  }

  const updateCharacters = async (currentPage: number, name?: string) => {
    try {
      const charactersData = await charactersController.getCharacters(currentPage, name);
      characters.value = charactersData.results;
      return charactersData.info.pages;

    } catch (error: any) {
      throw error;
    }
  }


  return {
    characters,
    getCharacters,
    loadMoreCharacters,
    updateCharacters,
  };
}