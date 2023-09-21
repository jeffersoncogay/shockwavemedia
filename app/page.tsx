"use client";
import React, { ReactNode, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import { NextIcon, PrevIcon } from "./assets/svgs";

moment.locale("en-gb");

const localizer = momentLocalizer(moment);

const Home: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const events = [
    {
      title: "Meeting 1",
      start: new Date(2023, 8, 22, 10, 0),
      end: new Date(2023, 8, 22, 11, 30),
    },
    {
      title: "Meeting 2",
      start: new Date(2023, 8, 22, 14, 0),
      end: new Date(2023, 8, 22, 15, 0),
    },
  ];

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
          <span>Appointments</span>
          <div className="flex items-center gap-3">
            <div className="text-[24px] font-bold text-cblack">
              {moment(date).format("dddd, MMMM D, YYYY")}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full bg-cgray-lighter text-cblack w-[36px] h-[36px] flex items-center justify-center"
                onClick={() =>
                  handleNavigate(moment(date).add(-1, "day").toDate())
                }
              >
                <PrevIcon className="h-[px] w-[5.49px]" />
              </button>
              <button
                className="rounded-full bg-cgray-lighter text-cblack w-[36px] h-[36px] flex items-center justify-center"
                onClick={() =>
                  handleNavigate(moment(date).add(1, "day").toDate())
                }
              >
                <NextIcon className="h-[9.31px] w-[5.49px]" />
              </button>
            </div>
          </div>
          <span>Today is {moment().format("dddd, MMMM D, YYYY")}</span>
        </div>
        <button className="bg-corange-lighter text-white rounded-xl py-3 px-5">
          New Appointment
        </button>
      </div>
    );
  };

  const timeSlotWrapper: React.FC = ({
    children,
  }: {
    children?: ReactNode;
  }) => {
    return <div className="custom-day">{children}</div>;
  };

  return (
    <div className="flex flex-col">
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          date={date}
          onNavigate={handleNavigate}
          startAccessor="start"
          endAccessor="end"
          views={["day"]}
          defaultView="day"
          step={60}
          timeslots={2} // Adjust the number of time slots as needed
          formats={formats}
          components={{
            toolbar: CustomHeader,
            timeSlotWrapper: timeSlotWrapper,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
