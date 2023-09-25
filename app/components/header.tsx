"use client";

import { useEffect, useState, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import debounce from "lodash/debounce";

import {
  BellIcon,
  LogoutIcon,
  NextIcon,
  SearchIcon,
  SettingsIcon,
} from "../assets/svgs";
import UserImg from "@assets/client.png";
import useAppointmentStore from "../store/useAppointmentStore";

export default function Header() {
  const { searchAppointment } = useAppointmentStore();

  const [searchQuery, setSearchQuery] = useState('');

  const search = useCallback(
    (query:string) => {
      setTimeout(() => {
        searchAppointment(query)
      }, 500); 
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 1000), 
    [search] 
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    debouncedSearch(query);
  };

  return (
    <div className="h-[116px] flex flex-col-reverse md:flex-row items-center gap-3 md:gap-10 border-b border-cgray-darker py-3 md:py-0 px-10">
      <div className="md:flex-1 relative rounded-xl bg-cgray-darker bg-opacity-30 overflow-hidden h-[44px] w-full">
        <input
          type="text"
          className="py-2 pr-10 pl-4 bg-transparent border-transparent outline-transparent h-full w-full"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <SearchIcon />
        </div>
      </div>
      <div className="w-[286px] flex items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="rounded-full h-9 w-9 overflow-hidden">
            <Image src={UserImg} alt="Profile" height={36} width={36} />
          </div>
          <span className="font-semibold">Jane Dee</span>
          <NextIcon className="rotate-90 w-2" />
        </div>
        <div className="flex items-cetner gap-3">
          <div className="rounded-full flex items-center justify-center h-9 w-9 bg-cgray-lighter cursor-pointer">
            <BellIcon />
          </div>
          <div className="rounded-full flex items-center justify-center h-9 w-9 bg-cgray-lighter cursor-pointer">
            <SettingsIcon className="stroke-1 stroke-cblack w-5 h-5" />
          </div>
          <div className="rounded-full flex items-center justify-center h-9 w-9 bg-cgray-lighter cursor-pointer">
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
