"use client";

import { FormEvent, ChangeEvent } from "react";
import { StaticImageData } from "next/image";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import AnikaPerry from "@assets/clinics/anika-perry.png";
import DanicaJane from "@assets/clinics/danica-jane.png";
import JohnFins from "@assets/clinics/john-fins.png";
import LeviJames from "@assets/clinics/levi-james.png";
import FieldWrapper from "./field-wrapper";
import { useState } from "react";
import moment, { Moment } from "moment";
import { NextIcon } from "../assets/svgs";
import useAppointmentStore, {
  AppointmentType,
} from "../store/useAppointmentStore";

export type VetType = {
  veterinary_name: string;
  address: string;
  building: string;
  contact_number: string;
  image: StaticImageData;
};

export const Veterinaries: VetType[] = [
  {
    veterinary_name: "Anika Perry",
    address: "4517 Washington Avenue, Manchester, Kentucky 39495",
    building: "Green Bow Vett",
    contact_number: "+63 0123 123",
    image: AnikaPerry,
  },
  {
    veterinary_name: "Danica Jane",
    address: "4517 Washington Avenue, Manchester, Kentucky 39495",
    building: "Green Bow Vett",
    contact_number: "+63 0123 123",
    image: DanicaJane,
  },
  {
    veterinary_name: "John Fins",
    address: "4517 Washington Avenue, Manchester, Kentucky 39495",
    building: "Green Bow Vett",
    contact_number: "+63 0123 123",
    image: JohnFins,
  },
  {
    veterinary_name: "Levi James",
    address: "4517 Washington Avenue, Manchester, Kentucky 39495",
    building: "Green Bow Vett",
    contact_number: "+63 0123 123",
    image: LeviJames,
  },
];

export default function Appointment({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Function;
}) {
  const { addAppointment } = useAppointmentStore();
  const [appointment, setAppointment] = useState<AppointmentType>({
    veterinary_name: "",
    service: "",
    datetime: undefined,
    pet_name: "",
    pet_breed: "",
    pet_age: "",
    pet_gender: "",
    pet_image: "",
    client_name: "",
    client_phone: "",
    client_email: "",
    client_address: "",
  });

  const handleDateChange = (date: string | Date | Moment | undefined) => {
    setAppointment({
      ...appointment,
      datetime: date,
    });
  };

  const isValidDate = (currentDate: Moment) => {
    // Disable dates that are later than the current date and time
    return currentDate.isAfter(moment().subtract(1, "day"));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addAppointment(appointment);
    onClose(false);
  };

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64 = event.target?.result;
        setAppointment({
          ...appointment,
          pet_image: base64,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="w-3/4 bg-white p-6 rounded shadow-lg"
        onSubmit={onSubmit}
      >
        <div className="font-semibold text-xl mb-5">Set New Appointment</div>
        <div className="flex gap-6 overflow-auto max-h-[70vh]">
          <div className="w-1/3 bg-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Clinic Information</h1>
            <FieldWrapper label="Veterinary">
              <div className="relative inline-block text-gray-700 w-full">
                <select
                  name="veterinary_name"
                  className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  onChange={onSelect}
                  value={appointment.veterinary_name}
                >
                  {Veterinaries.map((vet: VetType) => {
                    return (
                      <option
                        key={vet.veterinary_name}
                        value={vet.veterinary_name}
                      >
                        {vet.veterinary_name}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pr-4 text-gray-700">
                  <NextIcon className="rotate-90 w-2" />
                </div>
              </div>
            </FieldWrapper>
            <FieldWrapper label="Service">
              <input
                name="service"
                placeholder="Type your service"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
                value={appointment.service}
              />
            </FieldWrapper>
            <FieldWrapper label="Apointment Date and Time">
              <DateTime
                value={appointment.datetime}
                onChange={(date: string | Moment) => handleDateChange(date)}
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight"
                inputProps={{
                  placeholder: "Select date and time",
                  className: "w-full focus:outline-none focus:shadow-outline",
                }}
                isValidDate={(currentDate: Moment) => isValidDate(currentDate)}
                timeFormat="hh:mm A"
              />
            </FieldWrapper>
          </div>
          <div className="w-1/3 bg-purple-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Client Information</h1>
            <FieldWrapper label="Name">
              <input
                name="client_name"
                placeholder="Client's Name"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
                value={appointment.client_name}
              />
            </FieldWrapper>
            <FieldWrapper label="Phone">
              <input
                name="client_phone"
                onChange={onChange}
                placeholder="+01 234 567 8910"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_phone}
              />
            </FieldWrapper>
            <FieldWrapper label="Email">
              <input
                name="client_email"
                onChange={onChange}
                type="email"
                placeholder="johndoe@email.com"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_email}
              />
            </FieldWrapper>
            <FieldWrapper label="Address">
              <input
                name="client_address"
                onChange={onChange}
                placeholder="Type your address"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_address}
              />
            </FieldWrapper>
          </div>
          <div className="w-1/3 bg-orange-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Pet Information</h1>
            <FieldWrapper label="Name">
              <input
                name="pet_name"
                onChange={onChange}
                placeholder="Pet's Name"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_name}
              />
            </FieldWrapper>
            <FieldWrapper label="Breed">
              <input
                name="pet_breed"
                onChange={onChange}
                placeholder="Breed"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_breed}
              />
            </FieldWrapper>
            <FieldWrapper label="Age">
              <input
                name="pet_age"
                onChange={onChange}
                placeholder="Age"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_age}
              />
            </FieldWrapper>
            <FieldWrapper label="Gender">
              <input
                name="pet_gender"
                onChange={onChange}
                placeholder="Gender"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_gender}
              />
            </FieldWrapper>
            <FieldWrapper label="Image">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                onChange={onFileChange}
              />
            </FieldWrapper>
          </div>
        </div>
        <div className="py-2 flex flex-row-reverse gap-3">
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            id="close-button"
            className="mt-4 bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
