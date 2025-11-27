"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function AboutPage() {
  const handleDownloadResume = () => {
    const doc = new jsPDF();

    // Set up colors
    const primaryColor = [59, 130, 246] as const; // Blue
    const textColor = [31, 41, 55] as const; // Dark gray
    const lightGray = [156, 163, 175] as const;

    let yPosition = 20;

    // Header - Name
    doc.setFontSize(28);
    doc.setTextColor(...primaryColor);
    doc.text("Rajiv Kumar", 105, yPosition, { align: "center" });

    yPosition += 8;

    // Contact Information
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.text("Full Stack Developer", 105, yPosition, { align: "center" });

    yPosition += 5;
    doc.setFontSize(9);
    doc.setTextColor(...lightGray);
    doc.text("rajiv@example.com | +91 98765 43210 | India", 105, yPosition, {
      align: "center",
    });

    yPosition += 3;
    doc.text(
      "github.com/rajivkumar | linkedin.com/in/rajivkumar",
      105,
      yPosition,
      { align: "center" }
    );

    yPosition += 10;

    // Line separator
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 8;

    // Professional Summary
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("PROFESSIONAL SUMMARY", 20, yPosition);

    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    const summary =
      "Passionate Full Stack Developer with 5+ years of experience building beautiful and functional web applications. Expertise in React, Next.js, Node.js, and modern web technologies. Proven track record of delivering high-quality solutions and mentoring junior developers.";
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, yPosition);

    yPosition += splitSummary.length * 5 + 8;

    // Skills
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("TECHNICAL SKILLS", 20, yPosition);

    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.text("Frontend:", 20, yPosition);
    doc.setTextColor(...lightGray);
    doc.text(
      "React, Next.js, TypeScript, Tailwind CSS, Redux, HTML5, CSS3, Framer Motion",
      45,
      yPosition
    );

    yPosition += 5;
    doc.setTextColor(...textColor);
    doc.text("Backend:", 20, yPosition);
    doc.setTextColor(...lightGray);
    doc.text(
      "Node.js, Express, PostgreSQL, MongoDB, Prisma, Drizzle ORM",
      45,
      yPosition
    );

    yPosition += 5;
    doc.setTextColor(...textColor);
    doc.text("Tools:", 20, yPosition);
    doc.setTextColor(...lightGray);
    doc.text("Git, Docker, VS Code, Figma, Postman", 45, yPosition);

    yPosition += 10;

    // Experience
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("PROFESSIONAL EXPERIENCE", 20, yPosition);

    yPosition += 6;

    // Job 1
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text("Senior Frontend Developer", 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.text("2022 - Present", 190, yPosition, { align: "right" });

    yPosition += 5;
    doc.setFontSize(10);
    doc.text("Tech Corp", 20, yPosition);

    yPosition += 5;
    const exp1 = [
      "• Leading a team of 5 frontend developers in building scalable web applications",
      "• Architected and implemented micro-frontend solutions using React and Next.js",
      "• Improved application performance by 40% through code optimization and best practices",
      "• Mentored junior developers and conducted code reviews",
    ];
    exp1.forEach((item) => {
      doc.text(item, 20, yPosition);
      yPosition += 5;
    });

    yPosition += 3;

    // Job 2
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text("Full Stack Developer", 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.text("2020 - 2022", 190, yPosition, { align: "right" });

    yPosition += 5;
    doc.setFontSize(10);
    doc.text("Startup Inc", 20, yPosition);

    yPosition += 5;
    const exp2 = [
      "• Built and maintained full-stack applications using MERN stack",
      "• Developed RESTful APIs and integrated third-party services",
      "• Collaborated with designers to implement pixel-perfect UIs",
    ];
    exp2.forEach((item) => {
      doc.text(item, 20, yPosition);
      yPosition += 5;
    });

    yPosition += 3;

    // Education
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("EDUCATION", 20, yPosition);

    yPosition += 6;

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text("Master of Computer Applications", 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.text("2018 - 2020", 190, yPosition, { align: "right" });

    yPosition += 5;
    doc.setFontSize(10);
    doc.text("University of Technology", 20, yPosition);
    doc.text("Specialized in Software Engineering and AI", 20, yPosition + 4);

    yPosition += 10;

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text("Bachelor of Computer Applications", 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.text("2015 - 2018", 190, yPosition, { align: "right" });

    yPosition += 5;
    doc.setFontSize(10);
    doc.text("City College", 20, yPosition);
    doc.text("Graduated with Honors", 20, yPosition + 4);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.text("Generated from portfolio website", 105, 285, { align: "center" });

    // Save the PDF
    doc.save("Rajiv_Kumar_Resume.pdf");
  };

  return (
    <div className="container mx-auto py-24 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-background relative">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I'm a passionate Full Stack Developer with a knack for building
            beautiful and functional web applications. I love turning complex
            problems into simple, elegant solutions.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>rajiv@example.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined 2023</span>
            </div>
          </div>
          <div className="pt-4">
            <Button className="gap-2" onClick={handleDownloadResume}>
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Skills Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Code2 className="w-8 h-8 text-primary" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frontend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Redux",
                "HTML5",
                "CSS3",
                "Framer Motion",
              ].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Backend & Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                "Node.js",
                "Express",
                "PostgreSQL",
                "MongoDB",
                "Prisma",
                "Drizzle ORM",
                "Git",
                "Docker",
              ].map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-primary" />
            Experience
          </h2>
          <div className="space-y-4">
            {[
              {
                role: "Senior Frontend Developer",
                company: "Tech Corp",
                period: "2022 - Present",
                description:
                  "Leading the frontend team, architecting scalable solutions, and mentoring junior developers.",
              },
              {
                role: "Full Stack Developer",
                company: "Startup Inc",
                period: "2020 - 2022",
                description:
                  "Built and maintained full-stack applications using MERN stack.",
              },
            ].map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{exp.role}</CardTitle>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>{exp.company}</span>
                    <span>{exp.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            Education
          </h2>
          <div className="space-y-4">
            {[
              {
                degree: "Master of Computer Applications",
                school: "University of Technology",
                period: "2018 - 2020",
                description: "Specialized in Software Engineering and AI.",
              },
              {
                degree: "Bachelor of Computer Applications",
                school: "City College",
                period: "2015 - 2018",
                description: "Graduated with Honors.",
              },
            ].map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>{edu.school}</span>
                    <span>{edu.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          Want to know more? Let's have a chat!
        </p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
}
