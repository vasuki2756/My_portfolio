"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconMail,
  IconHome,
  IconSchool,
  IconMoodSmile,
  IconDeviceDesktop,
  IconBriefcase,
  IconTrophy,
} from "@tabler/icons-react";
import { Comfortaa } from "next/font/google";

const body = Comfortaa({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "About",
      icon: (
        <IconMoodSmile className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#experience",
    },
    {
      title: "Projects",
      icon: (
        <IconDeviceDesktop className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Achievements",
      icon: (
        <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#achievements",
    },
    {
      title: "Education",
      icon: (
        <IconSchool className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#education",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
  ];
  return (
    <div
      className={`${body.className} fixed bottom-0 right-4 md:left-0 md:right-0 flex items-center justify-center h-[5rem] z-50`}
    >
      <FloatingDock items={links} />
    </div>
  );
};

export default NavBar;
