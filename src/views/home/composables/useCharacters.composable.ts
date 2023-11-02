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

  const updateCharacters = async ( currentPage: number): Promise<void> => {
    try {
      const charactersData = await charactersController.getCharacters(currentPage);
      characters.value = [...characters.value, ...charactersData.results];
    
    } catch (error: any) {
      throw error;
    }
  }


  return {
    characters,
    getCharacters,
    updateCharacters,
  };
}

      

      //if (error.response) {
      //  // La solicitud se realizó y el servidor respondió con un código de estado
      //  // que cae fuera del rango de 2xx
      //  switch(error.response.status) {
      //    case 404:
      //      throw new Error('Personaje no encontrado');
      //    case 500:
      //      throw new Error('Error interno del servidor');
      //    default:
      //      throw new Error(error);
      //  }
      //} else if (error.request) {
      //  // La solicitud se realizó pero no se recibió ninguna respuesta
      //  throw new Error('No se recibió respuesta del servidor');
      //} else {
      //  // Algo sucedió al configurar la solicitud que desencadenó un error
      //  throw new Error('Error al configurar la solicitud');
      //}