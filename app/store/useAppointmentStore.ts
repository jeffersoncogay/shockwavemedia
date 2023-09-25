import { Moment } from "moment";
import { create } from "zustand";
import { VetType, Veterinaries, defaultAppointment } from "./defaults";

export type AppointmentType = {
  id: number;
  veterinary_name: string;
  vet_details?: VetType;
  service: string;
  start: string | Date | Moment | undefined;
  end: string | Date | Moment | undefined;
  pet_name: string;
  pet_breed: string;
  pet_age: string;
  pet_gender: string;
  pet_image: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_address: string;
};

type AppointmentStore = {
  appointments: AppointmentType[];
  filteredAppointments: AppointmentType[] | null;
  addAppointment: (appointment: AppointmentType) => void;
  updateAppointment: (id: number, updatedAppointment: AppointmentType) => void;
  deleteAppointment: (id: number) => void;
  searchAppointment: (keyword: string) => void;
};

const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [...defaultAppointment],
  filteredAppointments: null,
  addAppointment: (appointment) => {
    set((state) => ({
      appointments: [
        ...state.appointments,
        {
          ...appointment,
          id: (state.appointments[state.appointments.length - 1].id ?? 0) + 1,
          vet_details: Veterinaries.find(
            (vet: VetType) =>
              vet.veterinary_name === appointment.veterinary_name
          ),
        },
      ],
    }));
  },
  updateAppointment: (id, updatedAppointment) => {
    set((state) => ({
      appointments: state.appointments.map((app) =>
        app.id === id ? { ...app, ...updatedAppointment } : app
      ),
    }));
  },
  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((app) => app.id !== id),
    })),
  searchAppointment: (keyword = "") => {
    set((state) => {
      const newKeyword = keyword.toLowerCase();
      return {
        filteredAppointments: state.appointments.filter((app) => {
          return (
            app.service.toLowerCase().includes(newKeyword) ||
            app.client_name.toLowerCase().includes(newKeyword) ||
            app.veterinary_name.toLowerCase().includes(newKeyword)
          );
        }),
      };
    });
  },
}));

export default useAppointmentStore;
