import Image from "next/image";
import { AppointmentType } from "../store/useAppointmentStore";
import {
  ActionsIcon,
  BreedIcon,
  CalendarIcon,
  CrossIcon,
  EmailIcon,
  LocationIcon,
  PhoneIcon,
  SexIcon,
} from "../assets/svgs";

export default function RightNav({
  appointment,
  setIsRescheduled,
  setIsCancelAppointment,
}: {
  appointment: AppointmentType;
  setIsRescheduled: Function;
  setIsCancelAppointment: Function;
}) {
  return (
    <div className="md:w-[400px] transition-all duration-500 border-l max-h-[100%] border-cgray-darker md:fixed right-0 md:overflow-y-auto pb-[116px]">
      <div className="border-b border-cgray-darker py-5 flex justify-around items-center">
        <div className="flex gap-6 justify-between gap">
          <Image
            src={require("@assets/client.png")}
            alt={appointment.client_name}
            height={80}
            width={80}
          />
          <div className="flex flex-col gap-1 justify-center">
            <span className="text-2xl font-bold text-cblack">
              {appointment.client_name}
            </span>
            <span className="text-cgray">Client</span>
          </div>
        </div>
        <ActionsIcon />
      </div>
      <div className="border-b border-cgray-darker py-5 flex text-cgray px-10">
        <div className="flex flex-col gap-4">
          <span className="font-bold">CONTACT INFORMATION</span>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <EmailIcon />
              <span>Email</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.client_email}
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <PhoneIcon />
              <span>Phone</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.client_phone}
            </span>
          </div>
          <div className="flex gap-5 items-start">
            <div className="flex gap-1 items-center w-[98px]">
              <LocationIcon />
              <span>Address</span>
            </div>
            <span className="text-cblack font-[500] flex-1">
              {appointment.client_address}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-cgray-darker py-5 flex text-cgray px-10">
        <div className="flex flex-col gap-4">
          <span className="font-bold">CLINIC DETAILS</span>
          <div className="flex gap-6">
            <Image
              src={require(`@assets/clinics/anika-perry.png`)}
              alt={appointment.vet_details?.veterinary_name ?? ""}
              height={80}
              width={80}
            />
            <div className="flex flex-col gap-1 justify-center">
              <span className="text-2xl font-bold text-cblack">
                {appointment.vet_details?.veterinary_name}
              </span>
              <span className="text-cgray">Manchester</span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <EmailIcon />
              <span>Email</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.vet_details?.email}
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <PhoneIcon />
              <span>Phone</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.vet_details?.contact_number}
            </span>
          </div>
          <div className="flex gap-5 items-start">
            <div className="flex gap-1 items-center w-[98px]">
              <LocationIcon />
              <span>Address</span>
            </div>
            <span className="text-cblack font-[500] flex-1">
              {appointment.vet_details?.address}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-cgray-darker py-5 flex text-cgray px-10">
        <div className="flex flex-col gap-4">
          <span className="font-bold">PET DETAILS</span>
          <div className="flex gap-6">
            <Image
              src={appointment.pet_image}
              alt={appointment.vet_details?.veterinary_name ?? ""}
              height={80}
              width={80}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 justify-center">
              <span className="text-2xl font-bold text-cblack">
                {appointment.pet_name}
              </span>
              <span className="text-cgray">Pet</span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <BreedIcon />
              <span>Breed</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.pet_breed}
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <SexIcon />
              <span>Sex</span>
            </div>
            <span className="text-cblack font-[500]">
              {appointment.pet_gender}
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <CrossIcon className="stroke-2 stroke-cgray" />
              <span>Age</span>
            </div>
            <span className="text-cblack font-[500] flex-1">
              {appointment.pet_age}
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-1 items-center w-[98px]">
              <CalendarIcon />
              <span>Birthday</span>
            </div>
            <span className="text-cblack font-[500] flex-1">
              January 12, 2023
            </span>
          </div>
        </div>
      </div>
      <div className="py-5 flex flex-col gap-4 text-cgray px-10">
        <button
          className={`bg-corange-lighter text-white rounded-xl py-3 px-5 w-full hover:bg-opacity-20 hover:text-corange-light`}
          onClick={() => setIsRescheduled(true)}
        >
          Update/Reschedule Appointment
        </button>
        <button
          className={`bg-white text-cgray border border-cgray rounded-xl py-3 px-5 hover:bg-corange-lighter hover:text-cblack w-full`}
          onClick={() => setIsCancelAppointment(true)}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}
