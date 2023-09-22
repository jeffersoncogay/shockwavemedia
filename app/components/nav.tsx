"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";

import CloseNavIcon from "@assets/close-nav.png";
import OpenNavIcon from "@assets/open-nav.png";
import Logo from "@assets/logo.png";
import LogoIcon from "@assets/icon.png";
import MenuIcon from "@assets/menu.png";
import CloseMobileIcon from "@assets/close-mobile.png";

import {
  AppointmentsIcon,
  ContactsIcon,
  DataAnalyticsIcon,
  HelpCenterIcon,
  HomeIcon,
  MessagesIcon,
  SettingsIcon,
  SubscriptionIcon,
} from "../assets/svgs";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Appointments", path: "/appointments", icon: AppointmentsIcon },
  { name: "Messages", path: "/messages", icon: MessagesIcon },
  { name: "Contacts", path: "/contacts", icon: ContactsIcon, iconStroke: 1 },
  { name: "Data Analytics", path: "/data-analytics", icon: DataAnalyticsIcon },
  { name: "Subscription", path: "/subscription", icon: SubscriptionIcon },
  {
    name: "Help Center",
    path: "/help-center",
    icon: HelpCenterIcon,
    iconStroke: 1,
  },
  { name: "Settings", path: "/settings", icon: SettingsIcon, iconStroke: 1 },
];

export default function Nav() {
  const currentPath = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className={`w-full ${
        isNavOpen ? "md:w-[240px] duration-0" : "md:w-[120px] duration-500"
      } bg-cblack md:h-screen relative transition-all`}
    >
      <Image
        className="hidden md:block absolute right-[-15px] bottom-[50%] z-50"
        src={isNavOpen ? CloseNavIcon : OpenNavIcon}
        alt="Close"
        onClick={toggleNav}
        width={36}
        height={36}
      />

      <div className="border-b border-white border-opacity-20 h-[116px] flex items-center px-10 lg:px-0 justify-between md:justify-center">
        <Link href="/">
          <Image
            className="hidden md:block"
            src={isNavOpen ? Logo : LogoIcon}
            alt="Logo"
            width={isNavOpen ? 103 : 36}
            height={36}
          />
          <Image
            className="md:hidden"
            src={Logo}
            alt="Logo"
            width={103}
            height={36}
          />
        </Link>
        <Image
          className="md:hidden"
          src={isMobileNavOpen ? CloseMobileIcon : MenuIcon}
          alt="Menu"
          width={36}
          height={36}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />
      </div>
      <div
        className={`md:pt-[20px] absolute w-full bg-cblack ${
          isMobileNavOpen ? "h-auto" : "h-0 overflow-hidden"
        } md:h-auto md:overflow-auto md:relative z-10`}
      >
        {routes.map((route) => {
          const isActive = currentPath === route.path;
          const activeParentClass = isActive
            ? "border-corange"
            : "border-cblack";
          const iconClass = isActive
            ? "fill-corange stroke-corange"
            : "stroke-white group-hover:fill-corange group-hover:stroke-corange";
          const textClass = isActive
            ? "text-corange"
            : "group-hover:text-corange";
          return (
            <div
              key={route.name}
              className={`h-[55px] group border-r-4 ${activeParentClass} hover:border-corange hover:bg-white hover:bg-opacity-20`}
            >
              <Link href={route.path}>
                <div
                  className={`flex gap-2 items-center ${
                    isNavOpen ? "ml-[40px]" : "ml-[47px]"
                  } h-full`}
                >
                  <route.icon
                    className={`stroke-${
                      route.iconStroke ?? 2
                    } w-5 h-5 ${iconClass}`}
                  />
                  {isNavOpen && (
                    <span
                      className={`hidden md:block text-white text-base font-medium ${
                        isNavOpen ? "opacity-100" : "opacity-50"
                      } transition-opacity duration-500 ${textClass}`}
                    >
                      {route.name}
                    </span>
                  )}
                  <span
                    className={`md:hidden text-white text-base font-medium ${textClass}`}
                  >
                    {route.name}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="h-[96px] absolute bottom-0 w-full hidden md:block">
        <div className="border-t border-white border-opacity-20 w-full h-full flex flex-col items-center justify-center text-white text-opacity-50 gap-2">
          <Image src={LogoIcon} alt="Logo" width={20} height={20} />
          <span className="text-xs">© Lorem {moment().year()}</span>
        </div>
      </div>
    </nav>
  );
}
