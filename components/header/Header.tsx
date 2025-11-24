import React from "react";
import { ModeToggle } from "../ModeToggle";
import { useSidebarStore } from "@/store/sidebarStore";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

function Header() {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <header className="w-full flex items-center justify-between md:px-10 mx-4 ">
      {/* Left side */}
      <Button onClick={toggle} variant="ghost" size="icon" className="md:hidden block">
        <Menu />
      </Button>
      <h2 className="font-bold  text-lg">Portfolio</h2>

      {/* Right side */}
      <div className={` ${isOpen ? "pr-[250px]" : "md:pr-20"}`}>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
