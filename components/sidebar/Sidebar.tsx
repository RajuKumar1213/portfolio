
import SideMenus from "./SideMenus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebarStore } from "@/store/sidebarStore";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <div className="p-4 bg-secondary text-secondary-foreground h-full">
      <div
        className={` flex items-center   ${
          isOpen ? "px-2 gap-2" : "justify-center"
        } mb-3  border-b-2 pb-3`}
      >
        <Avatar>
          <AvatarImage src="/images/man.jpg" alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div
          className={`transition-all flex gap-4 duration-300 overflow-hidden
        ${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}`}
        >
          <div>
            <h2 className="font-extrabold text-sm md:text-base whitespace-nowrap">
              Rajiv Vishwakarma
            </h2>
            <p className="text-xs font-semibold whitespace-nowrap">
              Full Stack Developer
            </p>
          </div>
          <Button
            onClick={toggle}
            variant="ghost"
            size="icon"
            className="md:hidden block"
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Menus */}
      <SideMenus />
    </div>
  );
}

export default Sidebar;
