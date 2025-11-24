"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  index: number;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  skills,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors shadow-lg overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {title}
              </CardTitle>
              <CardDescription className="text-lg font-medium text-foreground/80">
                {company}
              </CardDescription>
            </div>
            <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
              <Calendar className="w-4 h-4 mr-2" />
              {period}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="hover:bg-primary/20 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
