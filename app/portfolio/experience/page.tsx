import React from "react";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden py-20 px-6">
      <DottedGlowBackground className="-z-10" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            My <span className="text-primary">Experience</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional career, highlighting key roles,
            projects, and the technologies I&apos;ve mastered along the way. 
          </p>
        </div>

        <ExperienceTimeline />
      </div>
    </div>
  );
}
