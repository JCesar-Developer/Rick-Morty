import { ref } from 'vue';
import CharactersController from '@/controllers/characters.controller';
import type { ICharacter } from '@/models/character.interface';

export default function useCharacters() {
  const charactersController = CharactersController.getInstance();
  const characters = ref<ICharacter[]>([]);

  const getCharacters = async (currentPage: number): Promise<number> => {
    const charactersData = await charactersController.getCharacters(currentPage);
    characters.value = charactersData.results;
    return charactersData.info.pages;
  }

  const loadMoreCharacters = async (currentPage: number, name?: string): Promise<void> => {
    const charactersData = await charactersController.getCharacters(currentPage, name);
    characters.value = [...characters.value, ...charactersData.results];
  }

  const updateCharacters = async (currentPage: number, name?: string): Promise<number> => {
    const charactersData = await charactersController.getCharacters(currentPage, name);
    characters.value = charactersData.results;
    return charactersData.info.pages;
  }


  return {
    characters,
    getCharacters,
    loadMoreCharacters,
    updateCharacters,
  };
}