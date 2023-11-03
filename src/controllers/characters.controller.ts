import axios, { AxiosError } from 'axios';
import { base_url, Endpoints } from '@/api/api';
import type { ICharactersParams } from '@/api/api';

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
  async getCharacters(params: ICharactersParams): Promise<ICharacters> {

    try {
      const response = await axios.get<ICharacters>(characters_url, { params });
      return response.data;

    } catch( error: unknown ) {
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          switch(axiosError.response.status) {
            case 404:
              return { info: { count: 0, pages: 0, next: '', prev: null }, results: [] };
            case 500:
              throw new Error(ErrorMsg.SERVER_ERROR);
            default:
              throw new Error(ErrorMsg.NO_RESPONSE);
          }
        } else {
          throw new Error(ErrorMsg.REQUEST_ERROR);
        }

      } else {
        throw new Error(ErrorMsg.SERVER_ERROR);
      }
    }
  }
}

export default CharactersController;