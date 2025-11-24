import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 md:px-20 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Rajiv<span className="text-primary">.dev</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          About
        </Link>
        <Link href="#skills" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Skills
        </Link>
        <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Projects
        </Link>
        <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/portfolio">
            <Button size="sm">Dashboard</Button>
        </Link>
      </div>
    </nav>
  );
}
