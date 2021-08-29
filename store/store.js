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
  addInfo: (appointment) =>
    set((state) => ({ appointmentInfo: [appointment] })),
  addAction: (action) => set((state) => ({ action: action })),
});

let stateTime = (set) => ({
  timeInfo: [],
  action: "",
  addInfo: (time) => set((state) => ({ timeInfo: [time] })),
  addAction: (action) => set((state) => ({ action: action })),
});

settingStore = persist(settingStore, { name: "user_info" });

export const useSettingStore = create(settingStore);
export const useAppointmentStore = create(stateAppointment);
export const useTimeStore = create(stateTime);
