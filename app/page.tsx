"use client";

import React, { ReactNode, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import {
  ActionsIcon,
  ConsultationIcon,
  CrossIcon,
  InjectionIcon,
  NextIcon,
  PrevIcon,
  UserIcon,
} from "./assets/svgs";
import Appointment from "./components/appointment";
import useAppointmentStore, {
  AppointmentType,
} from "./store/useAppointmentStore";
import { getAppointColor } from "./utils";
import RightNav from "./components/right-nav";
import Confirmation from "./components/confirmation";
import Snackbar from "./components/snackbar";

moment.locale("en-gb");

const localizer = momentLocalizer(moment);

export type View = "day" | "month" | "agenda";

const Home: React.FC = () => {
  const { appointments, filteredAppointments, deleteAppointment } =
    useAppointmentStore();
  const [date, setDate] = useState(new Date());
  const [isOpenAppointment, setIsOpenAppointment] = useState(false);
  const [isCancelAppointment, setIsCancelAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [view, setView] = useState<View | undefined>("day");

  const isMonth = view === "month";

  const events = filteredAppointments?.length
    ? filteredAppointments
    : appointments;

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const formats = {
    timeGutterFormat: (date: Date) => {
      return moment(date).format("hh:mm A");
    },
    eventTimeRangeFormat: ({ start, end }: any) => {
      return `${moment(start).format("hh:mm A")} - ${moment(end).format(
        "hh:mm A"
      )}`;
    },
    agendaTimeRangeFormat: ({ start, end }: any) => {
      return `${moment(start).format("hh:mm A")} - ${moment(end).format(
        "hh:mm A"
      )}`;
    },
  };

  const CustomHeader = () => {
    return (
      <div className="py-5 px-10 text-cgray flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-col md:flex-row gap-2">
            <span className="font-semibold">Appointments</span>
            <div className="flex gap-2 w-full">
              <button
                className={`w-1/2 bg-gray-200 text-cblack rounded-xl py-3 px-5 md:hidden`}
                onClick={() => setView(isMonth ? "day" : "month")}
              >
                {isMonth ? "Day" : "Month"} View
              </button>
              <button
                className={`w-1/2 bg-corange-lighter text-sm md:text-base text-white rounded-lg md:rounded-xl py-2 px-3 hover:bg-opacity-20 hover:text-corange-light md:hidden`}
                onClick={() => setIsOpenAppointment(true)}
              >
                New Appointment
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[24px] font-bold text-cblack">
              {moment(date).format("dddd, MMMM D, YYYY")}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full bg-cgray-lighter text-cblack w-[36px] h-[36px] flex items-center justify-center"
                onClick={() =>
                  handleNavigate(
                    moment(date)
                      .add(-1, isMonth ? "month" : "day")
                      .toDate()
                  )
                }
              >
                <PrevIcon className="h-[px] w-[5.49px]" />
              </button>
              <button
                className="rounded-full bg-cgray-lighter text-cblack w-[36px] h-[36px] flex items-center justify-center"
                onClick={() =>
                  handleNavigate(
                    moment(date)
                      .add(1, isMonth ? "month" : "day")
                      .toDate()
                  )
                }
              >
                <NextIcon className="h-[9.31px] w-[5.49px]" />
              </button>
            </div>
          </div>
          <span>Today is {moment().format("dddd, MMMM D, YYYY")}</span>
        </div>
        <button
          className={`bg-gray-200 text-cblack rounded-xl py-3 px-5 hidden md:block`}
          onClick={() => setView(isMonth ? "day" : "month")}
        >
          {isMonth ? "Day" : "Month"} View
        </button>
        <button
          className={`bg-corange-lighter text-white rounded-xl py-3 px-5 hover:bg-opacity-20 hover:text-corange-light hidden md:block`}
          onClick={() => setIsOpenAppointment(true)}
        >
          New Appointment
        </button>
      </div>
    );
  };

  const TimeSlotWrapper: React.FC = ({
    children,
  }: {
    children?: ReactNode;
  }) => {
    return <div className="custom-day">{children}</div>;
  };

  const getAppointmentIcon = (title: string = "") => {
    title = title.toLowerCase();
    if (title.includes("vaccin")) {
      return <InjectionIcon className="w-5 h-5" />;
    }

    if (title.includes("meet")) {
      return <ConsultationIcon className="w-5 h-5" />;
    }

    if (title.includes("check")) {
      return <CrossIcon className="w-5 h-5 stroke-2 stroke-blue-400" />;
    }

    return <CrossIcon className="w-5 h-5 stroke-2 stroke-green-400" />;
  };

  const onConfirmCancel = () => {
    if (selectedAppointment?.id) {
      setIsCancelAppointment(false);
      deleteAppointment(selectedAppointment.id);
      setSelectedAppointment(null);
      openSnackbar("Appointment cancelled.");
    }
  };

  const openSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const CustomEvent: React.FC<{ event: AppointmentType }> = ({ event }) => {
    const start = moment(event.start);
    const end = moment(event.end);
    const diff = end.diff(start, "hours");
    const isLessThanHour = diff < 1;
    const borderColor = getAppointColor(event.service, "border");
    const bgColor = getAppointColor(event.service, "bg");
    const strokeColor = getAppointColor(event.service, "stroke");

    const color = "gray-400";
    const parentClass = `border ${borderColor} rounded-xl text-cblack h-full ${bgColor} overflow-hidden flex justify-space-between`;
    const childClass = `rounded-full bg-${color} bg-opacity-10 h-[36px] w-[36px] flex items-center justify-center`;
    const personIconClass = `w-5 h-5 stroke-2 ${strokeColor}`;

    return (
      <div
        className={parentClass}
        onClick={() => {
          setSelectedAppointment(event);
        }}
      >
        <div
          className={`flex h-full w-full bg-white bg-opacity-70 px-5 items-center gap-3`}
        >
          <div className={childClass}>{getAppointmentIcon(event.service)}</div>
          <div
            className={`flex flex-1 ${
              isLessThanHour ? "items-center" : "flex-col"
            } gap-2`}
          >
            <strong>{event.service}</strong>
            <p>
              {start.format("h:mm A")} - {end.format("h:mm A")}
            </p>
            <div className="flex gap-2 items-center">
              <UserIcon className={personIconClass} />
              <span>
                {event.client_name}, {event.client_address}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full`} key={view}>
      <div className="flex flex-col md:flex-row h-full">
        <div
          className={`md:flex-1 md:overflow-y-auto ${
            isMonth ? "h-[500px]" : ""
          } md:h-full`}
        >
          <Calendar
            localizer={localizer}
            events={events}
            date={date}
            onNavigate={handleNavigate}
            startAccessor="start"
            endAccessor="end"
            views={["day", "month"]}
            defaultView={view}
            step={60}
            timeslots={1} // Adjust the number of time slots as needed
            formats={formats}
            components={{
              toolbar: CustomHeader,
              timeSlotWrapper: TimeSlotWrapper,
              event: CustomEvent,
            }}
            className="h-full w-full"
          />
        </div>
        {selectedAppointment && (
          <div className="hidden md:block md:w-[400px]" />
        )}
        {selectedAppointment && !isMonth && (
          <RightNav
            appointment={selectedAppointment}
            setIsRescheduled={setIsOpenAppointment}
            setIsCancelAppointment={setIsCancelAppointment}
          />
        )}
      </div>
      {selectedAppointment && isMonth && (
        <RightNav
          appointment={selectedAppointment}
          setIsRescheduled={setIsOpenAppointment}
          setIsCancelAppointment={setIsCancelAppointment}
        />
      )}
      <Confirmation
        isOpen={isCancelAppointment}
        onClose={setIsCancelAppointment}
        onConfirm={onConfirmCancel}
      />
      <Appointment
        isOpen={isOpenAppointment}
        onClose={setIsOpenAppointment}
        event={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
        openSnackbar={openSnackbar}
      />
      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default Home;
