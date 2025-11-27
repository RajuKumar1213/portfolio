import React from "react";
import { ModeToggle } from "../ModeToggle";
import { useSidebarStore } from "@/store/sidebarStore";
import { Button } from "../ui/button";
import { Menu, PanelLeftClose, PanelRightClose } from "lucide-react";

function Header() {
  const { isOpen, toggle, open, close } = useSidebarStore();
  return (
    <header className="w-full flex items-center justify-between md:px-10 mx-4 ">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          onClick={toggle}
          variant="ghost"
          size="icon"
          className="md:hidden block"
        >
          <Menu />
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <span className="cursor-pointer" onClick={() => close()}>
            {isOpen && <PanelLeftClose />}
          </span>{" "}
          <span className="cursor-pointer" onClick={() => open()}>
            {!isOpen && <PanelRightClose />}
          </span>{" "}
        </div>
      </div>

      {/* Middle - Navigation Links (Desktop only) */}
      {/* <div className="hidden md:flex items-center gap-6">
        <a href="/portfolio#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
        <a href="/portfolio#skills" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Skills</a>
        <a href="/portfolio#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</a>
        <a href="/portfolio#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
      </div> */}

      {/* Right side */}
      <div className={` ${isOpen ? "pr-[250px]" : "md:pr-20"}`}>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
