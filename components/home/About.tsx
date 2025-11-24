import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="w-full py-20 px-6 md:px-20 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am a passionate Full Stack Developer with a knack for building beautiful and functional websites. 
              My journey in web development began with a curiosity for how things work on the internet, 
              and it has evolved into a career where I get to solve complex problems every day.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I specialize in modern JavaScript frameworks like React, Next.js, and Node.js. 
              I am always eager to learn new technologies and improve my skills. 
              When I&apos;m not coding, you can find me exploring new places, reading books, or playing video games.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                    <h4 className="font-bold text-foreground">Location</h4>
                    <p className="text-muted-foreground">India</p>
                </div>
                <div>
                    <h4 className="font-bold text-foreground">Experience</h4>
                    <p className="text-muted-foreground">5+ Years</p>
                </div>
                 <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">rajiv@example.com</p>
                </div>
                <div>
                    <h4 className="font-bold text-foreground">Freelance</h4>
                    <p className="text-muted-foreground">Available</p>
                </div>
            </div>
          </div>

          {/* Stats or Visuals */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                        <span className="text-4xl font-bold text-primary">50+</span>
                        <span className="text-muted-foreground">Happy Clients</span>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                        <span className="text-4xl font-bold text-primary">100+</span>
                        <span className="text-muted-foreground">Projects Done</span>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                        <span className="text-4xl font-bold text-primary">24/7</span>
                        <span className="text-muted-foreground">Support</span>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                        <span className="text-4xl font-bold text-primary">10+</span>
                        <span className="text-muted-foreground">Awards</span>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
