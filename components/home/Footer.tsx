import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-8 bg-secondary/10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm text-center md:text-left">
          © {new Date().getFullYear()} Rajiv Vishwakarma. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
