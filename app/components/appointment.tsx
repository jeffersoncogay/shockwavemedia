"use client";

import { FormEvent, ChangeEvent, useEffect } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import FieldWrapper from "./field-wrapper";
import { useState } from "react";
import moment, { Moment } from "moment";
import { NextIcon } from "../assets/svgs";
import useAppointmentStore, {
  AppointmentType,
} from "../store/useAppointmentStore";
import { VetType, Veterinaries, defaultAppointment } from "../store/defaults";
import Image from "next/image";

export default function Appointment({
  isOpen,
  onClose,
  event,
  setSelectedAppointment,
  openSnackbar,
}: {
  isOpen: boolean;
  onClose: Function;
  event: AppointmentType | null;
  setSelectedAppointment: Function;
  openSnackbar: Function;
}) {
  const defaultAppointment = {
    id: 1,
    veterinary_name: "Anika Perry",
    service: "",
    start: undefined,
    end: undefined,
    pet_name: "",
    pet_breed: "",
    pet_age: "",
    pet_gender: "Male",
    pet_image: "",
    client_name: "",
    client_phone: "",
    client_email: "",
    client_address: "",
  };
  const { addAppointment, updateAppointment } = useAppointmentStore();
  const [appointment, setAppointment] = useState<AppointmentType>({
    ...defaultAppointment,
  });
  const [isError, setIsError] = useState(false);
  const [isEndDateError, setIsEndDateError] = useState(false);

  useEffect(() => {
    if (event) {
      setAppointment(event);
    }
    return () => setAppointment({ ...defaultAppointment });
  }, [event]); //eslint-disable-line

  const handleDateChange = (
    date: string | Date | Moment | undefined,
    key: string
  ) => {
    setAppointment({
      ...appointment,
      [key]: moment(date).toDate(),
    });
  };

  const isValidDate = (currentDate: Moment) => {
    return currentDate.isAfter(moment().subtract(1, "day"));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    let isError = false;
    let isDateError = false;
    const formErrors = Object.values(appointment).filter((val) => !val);

    if (formErrors.length) {
      setIsError(true);
      isError = true;
    }

    if (appointment.start) {
      const isEndError = moment(appointment.start).isSameOrAfter(
        moment(appointment.end)
      );
      setIsEndDateError(isEndError);
      isDateError = isEndError;
    }

    setIsError(isError);

    if (!isError && !isDateError) {
      if (event) {
        updateAppointment(event.id, appointment);
        setSelectedAppointment(null);
        openSnackbar("Appointment successfully updated.");
      } else {
        addAppointment(appointment);
        openSnackbar("Appointment successfully added.");
      }

      console.log("Appointment Date", {
        start: moment(appointment.start).utc(),
        end: moment(appointment.end).utc(),
      });

      onClose(false);
    }
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
        const base64 = event.target?.result as string;
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
        className="md:w-3/4 bg-white p-6 rounded shadow-lg max-h-[90vh] overflow-auto"
        onSubmit={onSubmit}
      >
        <div className="font-semibold text-xl mb-5">
          {event ? "Update" : "Set New"} Appointment
        </div>
        <div className="flex flex-col md:flex-row gap-6 overflow-auto">
          <div className="md:w-1/3 bg-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Clinic Information</h1>
            <FieldWrapper
              label="Veterinary"
              error={isError && !appointment.veterinary_name}
            >
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
            <FieldWrapper
              label="Service"
              error={isError && !appointment.service}
            >
              <input
                name="service"
                placeholder="e.g. Vaccination, Meeting"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
                value={appointment.service}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Apointment Start Date and Time"
              error={isError && !appointment.start}
            >
              <DateTime
                value={appointment.start}
                onChange={(date: string | Moment) =>
                  handleDateChange(date, "start")
                }
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight"
                inputProps={{
                  placeholder: moment()
                    .hour(9)
                    .minute(0)
                    .format("DD/MM/YYYY hh:mm A"),
                  className: "w-full focus:outline-none focus:shadow-outline",
                }}
                isValidDate={(currentDate: Moment) => isValidDate(currentDate)}
                timeFormat="hh:mm A"
              />
            </FieldWrapper>
            <FieldWrapper
              label="Apointment End Date and Time"
              error={(isError && !appointment.end) || isEndDateError}
            >
              <DateTime
                value={appointment.end}
                onChange={(date: string | Moment) =>
                  handleDateChange(date, "end")
                }
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight"
                inputProps={{
                  placeholder: moment()
                    .hour(9)
                    .minute(30)
                    .format("DD/MM/YYYY hh:mm A"),
                  className: "w-full focus:outline-none focus:shadow-outline",
                }}
                isValidDate={(currentDate: Moment) => isValidDate(currentDate)}
                timeFormat="hh:mm A"
              />
            </FieldWrapper>
          </div>
          <div className="md:w-1/3 bg-purple-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Client Information</h1>
            <FieldWrapper
              label="Name"
              error={isError && !appointment.client_name}
            >
              <input
                name="client_name"
                placeholder="Client's Name"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
                value={appointment.client_name}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Phone"
              error={isError && !appointment.client_phone}
            >
              <input
                name="client_phone"
                onChange={onChange}
                placeholder="234-567-8910"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_phone}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Email"
              error={isError && !appointment.client_email}
            >
              <input
                name="client_email"
                onChange={onChange}
                type="email"
                placeholder="johndoe@email.com"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_email}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Address"
              error={isError && !appointment.client_address}
            >
              <input
                name="client_address"
                onChange={onChange}
                placeholder="Type your address"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.client_address}
              />
            </FieldWrapper>
          </div>
          <div className="md:w-1/3 bg-orange-200 rounded-xl p-5 flex flex-col gap-3">
            <h1 className="text-lg font-semibold mb-2">Pet Information</h1>
            <FieldWrapper label="Name" error={isError && !appointment.pet_name}>
              <input
                name="pet_name"
                onChange={onChange}
                placeholder="Pet's Name"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_name}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Breed"
              error={isError && !appointment.pet_breed}
            >
              <input
                name="pet_breed"
                onChange={onChange}
                placeholder="Breed"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_breed}
              />
            </FieldWrapper>
            <FieldWrapper label="Age" error={isError && !appointment.pet_age}>
              <input
                name="pet_age"
                onChange={onChange}
                placeholder="Age"
                className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                value={appointment.pet_age}
              />
            </FieldWrapper>
            <FieldWrapper
              label="Gender"
              error={isError && !appointment.pet_gender}
            >
              <div className="relative inline-block text-gray-700 w-full">
                <select
                  name="pet_gender"
                  className="w-full appearance-none border rounded py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  onChange={onSelect}
                  value={appointment.pet_gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pr-4 text-gray-700">
                  <NextIcon className="rotate-90 w-2" />
                </div>
              </div>
            </FieldWrapper>
            <FieldWrapper
              label="Image"
              error={isError && !appointment.pet_image}
            >
              {appointment.pet_image && (
                <Image
                  src={appointment.pet_image}
                  alt=""
                  width={100}
                  height={100}
                  className="mb-2"
                />
              )}
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
            className={`mt-4 ${
              event ? "bg-corange-light" : "bg-blue-500"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {event ? "Update" : "Submit"}
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
