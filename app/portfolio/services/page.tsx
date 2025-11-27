"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Database,
  Globe,
  Layout,
  Smartphone,
  Server,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    description:
      "Building fast, responsive, and SEO-friendly websites using modern technologies like Next.js and React.",
    icon: Globe,
    tags: ["Next.js", "React", "Tailwind CSS"],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Tuning",
      "CMS Integration",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces that provide an exceptional user experience.",
    icon: Layout,
    tags: ["Figma", "Prototyping", "User Research"],
    features: [
      "Wireframing",
      "Interactive Prototypes",
      "Design Systems",
      "User Testing",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Developing cross-platform mobile applications that run smoothly on both iOS and Android devices.",
    icon: Smartphone,
    tags: ["React Native", "Expo", "iOS & Android"],
    features: [
      "Cross-Platform Support",
      "Native Performance",
      "App Store Deployment",
      "Push Notifications",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Designing robust and scalable server-side architectures to power your applications.",
    icon: Server,
    tags: ["Node.js", "PostgreSQL", "API Design"],
    features: [
      "RESTful APIs",
      "Database Management",
      "Authentication",
      "Cloud Integration",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Services
        </h1>
        <p className="text-lg text-muted-foreground">
          I offer a wide range of digital services to help you bring your ideas
          to life. From web development to UI/UX design, I've got you covered.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <service.icon size={100} />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-primary" size={24} />
              </div>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="text-base mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:bg-primary/90" asChild>
                <Link href="/contact">
                  Get in Touch{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's collaborate to build something amazing. Whether you have a clear
          vision or just an idea, I'm here to help.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Me Now</Link>
        </Button>
      </div>
    </div>
  );
}
