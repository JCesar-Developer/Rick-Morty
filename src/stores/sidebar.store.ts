import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isOpen: false,
  }),
  actions: {
    activateSideBar() {
      this.isOpen = true;
    },
    deactivateSideBar() {
      this.isOpen = false;
    },
  },
})