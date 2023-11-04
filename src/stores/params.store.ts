import { defineStore } from "pinia";
import type { ICharactersParams } from '@/api/api';
import Status from '@/shared/interfaces/status.enum';
import Gender from '@/shared/interfaces/gender.enum';

interface IParamsState {
  _totalPages: number,
  _params: ICharactersParams,
}

export const useParamsStore = defineStore({
  id: "params",
  state: (): IParamsState => ({
    _totalPages: 0,
    _params: { page: 1 }
  }),
  getters: {
    totalPages(): number {
      return this._totalPages;
    },
    params(): ICharactersParams {
      return this._params;
    },
  },
  actions: {
    setParams(params: ICharactersParams) {
      this._params = params;
    },
    setPage(page: number) {
      this._params.page = page;
    },
    setName(name: string) {
      this._params.name = name;
    },
    setStatus(status: Status | undefined) {
      this._params.status = status;
    },
    setGender(gender: Gender | undefined) {
      this._params.gender = gender;
    },
    increasePage(number: number) {
      this._params.page += number;
    },
    setTotalPages(totalPages: number) {
      this._totalPages = totalPages;
    },
  },

});