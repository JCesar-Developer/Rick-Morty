import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isOpen: false,
  }),
  getters: {
    isSideBarActive(): boolean {
      return this.isOpen;
    },
  },
  actions: {
    activateSideBar() {
      this.isOpen = true;
    },
    deactivateSideBar() {
      this.isOpen = false;
    },
  },
});