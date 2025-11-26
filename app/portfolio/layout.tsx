"use client";

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSidebarStore } from "@/store/sidebarStore";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, open } = useSidebarStore();

  React.useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        open();
      }
    };

    checkScreenSize();
  }, [open]);

  return (
    <div className="flex bg-background text-foreground ">
      <aside
        className={`${
          isOpen
            ? "w-64 fixed md:static h-full z-50"
            : "md:w-18 w-0 hidden md:block"
        } 
    transition-all duration-300 ease-in-out bg-background`}
      >
        <Sidebar />
      </aside>
      <main className="flex flex-col overflow-auto h-screen relative flex-1 w-screen">
        <div className="fixed w-full flex items-center top-0 h-15 bg-background backdrop-blur-sm text-secondary-foreground z-[999]">
          <Header />
        </div>

        <div className="md:w-6xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
