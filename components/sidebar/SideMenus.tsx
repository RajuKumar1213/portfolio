import {
  ArrowUpNarrowWide,
  BaggageClaim,
  GitBranch,
  GitCompareArrows,
  Github,
  Glasses,
  Home,
  KeyRound,
  Linkedin,
  PanelLeftClose,
  PanelRightClose,
  Pencil,
  Phone,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useSidebarStore } from "@/store/sidebarStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideMenus() {
  const { isOpen, open, close } = useSidebarStore();
  const pathname = usePathname();

  // console.log(isOpen);

  const menes = [
    {
      id: 1,
      name: "Home",
      href: "/portfolio",
      icon: Home,
    },
    {
      id: 2,
      name: "Experience",
      href: "/portfolio/experience",
      icon: BaggageClaim,
    },
    {
      id: 3,
      name: "Project",
      href: "/portfolio/project",
      icon: Pencil,
    },
    {
      id: 4,
      name: "Products",
      href: "/products",
      icon: KeyRound,
    },
    {
      id: 5,
      name: "Services",
      href: "/services",
      icon: Glasses,
    },
    {
      id: 6,
      name: "About",
      href: "/about",
      icon: User,
    },
    {
      id: 7,
      name: "Blog",
      href: "/blog",
      icon: BaggageClaim,
    },
    {
      id: 8,
      name: "Documentation",
      href: "/documentation",
      icon: GitBranch,
    },
    {
      id: 9,
      name: "Support",
      href: "/support",
      icon: Pencil,
    },
    {
      id: 10,
      name: "Contact",
      href: "/contact",
      icon: Phone,
    },
    {
      id: 11,
      name: "X",
      href: "https://www.x.com",
      icon: X,
    },
    {
      id: 12,
      name: "Linkedin",
      href: "https://www.linkedin.com",
      icon: Linkedin,
    },
    {
      id: 13,
      name: "Github",
      href: "https://www.github.com",
      icon: Github,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-100px)] relative">
      <div>
        <ul className={`flex flex-col ${!isOpen && "gap-1"} gap-1.5`}>
          {menes.map((menu) => (
            <div key={menu.id}>
              <Link href={menu.href} className=" ">
                <li
                  key={menu.id}
                  className={`flex items-center justify-between ${
                    pathname === menu.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-border"
                  } ${
                    isOpen ? "p-0" : "py-2"
                  } rounded-md cursor-pointer px-2.5 gap-2 font-semibold text-sm`}
                >
                  <div className="flex gap-2 items-center">
                    {" "}
                    <menu.icon
                      size={18}
                      className="flex items-center justify-center "
                    />
                    <span
                      className={`transition-all  duration-300 overflow-hidden whitespace-nowrap
                    ${
                      isOpen ? "opacity-400 max-w-[200px]" : "opacity-0 max-w-0"
                    }`}
                    >
                      {menu.name}
                    </span>
                  </div>

                  {isOpen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-xs outline-none cursor-pointer ${
                        pathname === menu.href
                          ? "hover:bg-primary/80 hover:text-primary-foreground"
                          : ""
                      }`}
                    >
                      <GitCompareArrows className="h-2 w-2" /> {menu.id}{" "}
                    </Button>
                  )}
                </li>
              </Link>
              {isOpen && menu.id == 6 ? (
                <p className="mx-3 mt-6  text-gray-400 text-sm font-semibold">
                  Resources
                </p>
              ) : isOpen && menu.id == 9 ? (
                <p className="mx-3 mt-6 text-gray-400 text-sm font-semibold">
                  Connect
                </p>
              ) : (
                ""
              )}
              {!isOpen && menu.id == 6 ? (
                <p className="mx-3 mt-6 text-sm font-semibold"></p>
              ) : !isOpen && menu.id == 9 ? (
                <p className="mx-3 mt-6 text-sm font-semibold"></p>
              ) : (
                ""
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="absolute flex items-center bottom-20 right-2">
        <span className="cursor-pointer" onClick={() => close()}>
          {isOpen && <PanelLeftClose />}
        </span>{" "}
        <span className="cursor-pointer" onClick={() => open()}>
          {!isOpen && <PanelRightClose />}
        </span>{" "}
      </div>
    </div>
  );
}

export default SideMenus;
