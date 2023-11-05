import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isOpen: false,
    _totalResults: 0,
  }),
  getters: {
    isSideBarActive(): boolean {
      return this.isOpen;
    },
    totalResults(): number {
      return this._totalResults;
    },
  },
  actions: {
    activateSideBar() {
      this.isOpen = true;
    },
    deactivateSideBar() {
      this.isOpen = false;
    },
    setTotalResults( results: number ) {
      this._totalResults = results;
    },
  },
});