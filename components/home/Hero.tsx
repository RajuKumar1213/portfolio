import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { HeroBackground } from "./HeroBackground";
import Image from "next/image";

interface HeroProps {
  name?: string;
  role?: string;
  description?: string;
  imageUrl?: string;
}

export function Hero({
  name = "Rajiv",
  role = "Full Stack Developer.",
  description = "I build accessible, pixel-perfect, secure, and performant web applications. Let's turn your vision into reality.",
  imageUrl = "./images/horo.svg",
}: HeroProps) {
  return (
    <section className="md:w-6xl w-full mx-auto h-screen flex flex-col md:flex-row items-center justify-center px-2 md:px-20  overflow-hidden">
      {/* <HeroBackground /> */}

      {/* Text Content */}
      <div className="   flex flex-col items-start space-y-6 z-10 animate-fade-in-up md:pt-0">
        <div className="inline-block px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-2 border border-secondary backdrop-blur-sm">
          Available for Work
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Hi, I&apos;m <span className="text-primary">{name}</span>
          <br />
          <span className="text-muted-foreground">{role}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="#contact">
            <Button size="lg" className="rounded-full px-8">
              Contact Me <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/resume.pdf" target="_blank">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Download CV <Download className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 pt-8">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:example@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Image/Visual Content */}
      <div className="flex-1 flex items-center justify-end relative  right-0 md:mt-0 z-10 animate-fade-in-left">
        <div className="relative w-64 h-64 md:w-96 md:h-96 right-0">
          {/* Abstract Shapes or Profile Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 blur-2xl animate-blob" />
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden ">
            {/* Replace with actual image later */}
            <Image
              src={imageUrl}
              alt="hero-image"
              width={500}
              height={500}
              className="h-[800px] w-[800px]"
            />
          </div>
          {/* Floating badges */}
          {/* <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border animate-bounce delay-700">
                <span className="font-bold text-primary">5+</span> Years Exp.
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg border border-border animate-bounce delay-1000">
                <span className="font-bold text-primary">100+</span> Projects
            </div> */}
        </div>
      </div>
    </section>
  );
}
