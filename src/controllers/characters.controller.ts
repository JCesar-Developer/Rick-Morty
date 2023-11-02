import axios, { AxiosError } from 'axios';
import { base_url, Endpoints } from '@/api/api';

import { ErrorMsg } from '@/shared/interfaces/errors.enum';
import type { ICharacters } from '@/models/characters.interface';

const characters_url = `${base_url}${Endpoints.Chararacters}`;

class CharactersController {
  private static instance: CharactersController;

  private constructor() {}

  //Singleton
  static getInstance(): CharactersController {
    if (!CharactersController.instance) {
      CharactersController.instance = new CharactersController();
    }
    return CharactersController.instance;
  }

  //CRUD-Methods
  async getCharacters(page: number = 1): Promise<ICharacters> {
    try {
      const response = await axios.get<ICharacters>(characters_url, { params: { page } });
      return response.data;

    } catch( error: unknown ) {
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          switch(axiosError.response.status) {
            case 404:
              throw new Error('Página no encontrada');
            case 500:
              throw new Error(ErrorMsg.SERVER_ERROR);
            default:
              throw new Error(ErrorMsg.NO_RESPONSE);
          }
        } else {
          throw new Error(ErrorMsg.REQUEST_ERROR);
        }

      } else {
        throw new Error(ErrorMsg.REQUEST_ERROR);
      }
    }
  }
}

export default CharactersController;