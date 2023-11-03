//Documentation: https://rickandmortyapi.com/
import Gender from '@/shared/interfaces/gender.enum';
import Status from '@/shared/interfaces/status.enum';

export const base_url = 'https://rickandmortyapi.com/api';

export enum Endpoints {
  Chararacters = '/character',
  Locations = '/location',
  Episodes = '/episode',
}

export interface ICharactersParams {
  page: number;
  name?: string;
  gender?: Gender;
  status?: Status;
}
