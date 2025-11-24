import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    image:
      "https://www.gov.kz/uploads/2023/9/29/667b5e80bd436c30c5c196fc0b36db21_original.168660.jpg",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart, checkout, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    link: "#",
    github: "#",
  },
  {
    image:
      "https://i.pinimg.com/originals/73/17/e0/7317e0aa3876e42a7e9a40be06582348.png?nii=t",
    title: "Task Management App",
    description:
      "Collaborative task manager with real-time updates and team features.",
    tags: ["React", "Firebase", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    image: "/images/portfolio.png",
    title: "Portfolio Website",
    description: "Modern portfolio website with dark mode and animations.",
    tags: ["Next.js", "Framer Motion", "Shadcn UI"],
    link: "#",
    github: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="w-full py-20 px-6 md:px-20 bg-secondary/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A selection of my recent work.
            </p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="flex flex-col h-full hover:shadow-lg transition-shadow border-primary/10"
            >
              <div className="h-48 bg-muted w-full rounded-t-xl flex items-center justify-center text-muted-foreground relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Link href={project.link} className="flex-1">
                  <Button className="w-full" variant="default">
                    <ExternalLink className="w-4 h-4 mr-2" /> Demo
                  </Button>
                </Link>
                <Link href={project.github} className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Github className="w-4 h-4 mr-2" /> Code
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
