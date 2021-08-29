import create from "zustand";
import { persist } from "zustand/middleware";

let settingStore = (set) => ({
  people: [],
  addInfo: (person) => set((state) => ({ people: [person] })),
  setShowdashboard: "",
});

let stateAppointment = (set) => ({
  appointmentInfo: [],
  action: "",
  addInfo: (appointment) => set((state) => ({ appointmentInfo: [appointment] })),
  addAction: (action) => set((state) => ({ action: action })),
});

settingStore = persist(settingStore, { name: "user_info" });

export const useSettingStore = create(settingStore);
export const useAppointmentStore = create(stateAppointment);
