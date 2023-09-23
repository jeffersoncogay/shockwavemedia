import { Moment } from "moment";
import { create } from "zustand";

export type AppointmentType = {
  id?: number;
  veterinary_name: string;
  service: string;
  datetime: string | Date | Moment | undefined;
  pet_name: string;
  pet_breed: string;
  pet_age: string;
  pet_gender: string;
  pet_image: string | ArrayBuffer | null | undefined;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_address: string;
};

type AppointmentStore = {
  appointments: AppointmentType[];
  addAppointment: (appointment: AppointmentType) => void;
  updateAppointment: (id: number, updatedAppointment: AppointmentType) => void;
  deleteAppointment: (id: number) => void;
};

const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updatedAppointment) =>
    set((state) => ({
      appointments: state.appointments.map((app) =>
        app.id === id ? updatedAppointment : app
      ),
    })),
  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((app) => app.id !== id),
    })),
}));

export default useAppointmentStore;
