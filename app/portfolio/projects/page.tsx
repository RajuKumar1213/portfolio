import React from "react";
import { ProjectCarousel } from "@/components/project/ProjectCarousel";

export default function ProjectPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden py-20 px-6 flex flex-col items-center justify-center">
      {/* Background Elements - Subtle and Clean */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto relative z-10 w-full">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, side projects, and open source
            contributions.
          </p>
        </div>

        <ProjectCarousel />
      </div>
    </div>
  );
}
