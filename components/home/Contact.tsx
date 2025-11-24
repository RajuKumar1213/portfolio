import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="w-full py-20 px-6 md:px-20 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-secondary/5 border-none shadow-none">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Email Me</h4>
                        <p className="text-muted-foreground">rajiv@example.com</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-secondary/5 border-none shadow-none">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Call Me</h4>
                        <p className="text-muted-foreground">+91 12345 67890</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-secondary/5 border-none shadow-none">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Location</h4>
                        <p className="text-muted-foreground">Mumbai, India</p>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
