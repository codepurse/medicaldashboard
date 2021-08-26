import create from "zustand";
import { persist } from "zustand/middleware";

let store = (set) => ({
  people: [],
  addInfo: (person) => set((state) => ({ people: [person] })),
  setShowdashboard: "",
});

store = persist(store);
const useStore = create(store);

export default useStore;
