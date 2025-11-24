"use client";

import React from "react";
import { ExperienceCard } from "./ExperienceCard";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2023 - Present",
    description:
      "Leading the development of scalable web applications using Next.js and Node.js. Architected a microservices-based backend that improved system reliability by 99.9%. Mentoring junior developers and implementing best practices for code quality and testing.",
    skills: ["React", "Next.js", "Node.js", "AWS", "TypeScript", "GraphQL"],
  },
  {
    title: "Frontend Engineer",
    company: "Creative Digital Agency",
    period: "2021 - 2023",
    description:
      "Developed pixel-perfect user interfaces for high-profile clients. Collaborated with designers to implement complex animations and interactive elements using Framer Motion and GSAP. Optimized frontend performance, reducing load times by 40%.",
    skills: ["Vue.js", "Tailwind CSS", "Framer Motion", "Three.js", "Figma"],
  },
  {
    title: "Web Developer",
    company: "StartUp Solutions",
    period: "2019 - 2021",
    description:
      "Built and maintained multiple e-commerce websites using Shopify and custom React solutions. Integrated third-party APIs for payment processing and inventory management. Worked in an agile environment with daily stand-ups and bi-weekly sprints.",
    skills: ["React", "Shopify", "JavaScript", "REST APIs", "SASS"],
  },
];

export function ExperienceTimeline() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block -translate-x-1/2" />

      {experiences.map((exp, index) => (
        <div key={index} className="relative">
          {/* Dot on the line */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.5 }}
            className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 -translate-x-1/2 hidden md:block shadow-[0_0_10px_rgba(var(--primary),0.5)]"
          />

          <div
            className={`flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 md:w-1/2" />
            <div className="flex-1 md:w-1/2 pl-12 md:pl-0">
              <ExperienceCard {...exp} index={index} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
