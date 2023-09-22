"use client";

import { StaticImageData } from "next/image";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import AnikaPerry from "@assets/clinics/anika-perry.png";
import DanicaJane from "@assets/clinics/danica-jane.png";
import JohnFins from "@assets/clinics/john-fins.png";
import LeviJames from "@assets/clinics/levi-james.png";
import FieldWrapper from "./field-wrapper";
import { useState } from "react";
import { Moment } from "moment";

export type VetType = {
  veterinary_name: string;
  address: string;
  building: string;
  contact_number: string;
  image: StaticImageData;
};

export const veterinaries: VetType[] = [
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

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState<
    string | Date | Moment | undefined
  >("");

  const handleDateChange = (date: string | Date | Moment | undefined) => {
    setSelectedDate(date);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 bg-white p-6 rounded shadow-lg">
        <div className="font-semibold text-xl mb-5">Set New Appointment</div>
        <div className="flex gap-10">
          <div className="w-1/2 flex flex-col gap-3">
            <FieldWrapper label="Veterinary">
              <div className="relative inline-block text-gray-700 w-full">
                <select className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline">
                  {veterinaries.map((vet: VetType) => {
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.293 9.293a1 1 0 011.414 0L10 10.58  6l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414 1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>
            <FieldWrapper label="Service">
              <input
                placeholder="Type your service"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </FieldWrapper>
            <FieldWrapper label="Apointment Date and Time">
              <DateTime
                value={selectedDate}
                onChange={(date: string | Moment) => handleDateChange(date)}
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight"
                inputProps={{
                  placeholder: "Select date and time",
                  className: "w-full focus:outline-none focus:shadow-outline",
                }}
              />
            </FieldWrapper>
          </div>
          <div>RIght</div>
        </div>
        <button
          id="close-button"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
