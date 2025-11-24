"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export function ProjectCard({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
        <div className="relative w-full h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-muted-foreground/80">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-primary/5 border-primary/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-4 pt-0">
          <Link href={githubUrl} target="_blank" className="w-full">
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="w-4 h-4" /> Code
            </Button>
          </Link>
          <Link href={liveUrl} target="_blank" className="w-full">
            <Button className="w-full gap-2 bg-primary/90 hover:bg-primary transition-colors">
              <Globe className="w-4 h-4" /> Live Demo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
