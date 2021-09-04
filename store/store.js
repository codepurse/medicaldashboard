import create from "zustand";
import { persist } from "zustand/middleware";
import { MdError } from "react-icons/md";

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

let stateMemberInfo = (set) => ({
  memberInfo: [],
  memberId: "",
  addInfo: (member) => set((state) => ({ memberInfo: [member] })),
  addMemberId: (id) => set((state) => ({ memberId: id })),
});

let modalInfo = (set) => ({
  title: "Unsaved changes",
  message: "Changes you made may not be saved, please confirm.",
  state: false,
  modal: "patient",
  changeState: (action) => set((state) => ({ state: action })),
});

let snackInfo = (set) => ({
  Message: "Sample Mesasge",
  className: "",
  state: false,
  style: true,
  changeState: (action) => set((state) => ({ state: action })),
  changeMessage: (mess) => set((state) => ({ Message: mess })),
  changeStyle: (style) => set((state) => ({ style: style })),
});

let patientInfo = (set) => ({
  visible: false,
  lastActivity: "",
  cancelPatient: false,
  changeVisible: (action) => set((state) => ({ visible: action })),
  changeCancelPatient: (action) => set((state) => ({ cancelPatient: action })),
});

settingStore = persist(settingStore, { name: "user_info" });
export const useSettingStore = create(settingStore);
export const useAppointmentStore = create(stateAppointment);
export const useTimeStore = create(stateTime);
export const useMemberInfoStore = create(stateMemberInfo);
export const useSnackStore = create(snackInfo);
export const useModalStore = create(modalInfo);
export const usePatientStore = create(patientInfo);
