"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "./ProjectCard";
import Autoplay from "embla-carousel-autoplay";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart functionality, user authentication, and payment gateway integration. Built for scalability and performance.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task manager with real-time updates, drag-and-drop interface, and team workspaces. Streamlines project workflows.",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    techStack: ["React", "Firebase", "Redux", "Material UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered tool that generates blog posts, social media captions, and marketing copy. Leverages OpenAI's GPT-4 API.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    techStack: ["OpenAI API", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing projects and skills. Features dark mode, animations, and a clean design.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    techStack: ["Next.js", "Framer Motion", "Shadcn UI", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

export function ProjectCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1 h-full">
                <ProjectCard {...project} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
        <CarouselNext className="hidden md:flex -right-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
      </Carousel>
    </div>
  );
}
