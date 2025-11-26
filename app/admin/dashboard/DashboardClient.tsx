"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function DashboardClient() {
  const [heroData, setHeroData] = useState({
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
    }
  );

  const handleHeroSave = async () => {
    try {
      toast.success("Hero section updated!");
    } catch (error) {
      console.error("Error saving hero:", error);
      toast.error("Failed to save.");
    }
  };

  return (
    <Tabs defaultValue="hero">
      <TabsList>
        <TabsTrigger value="hero">Hero Section</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>

      <TabsContent value="hero" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                value={heroData.title}
                onChange={(e) =>
                  setHeroData({ ...heroData, title: e.target.value })
                }
                placeholder="Rajiv"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subtitle">Role</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) =>
                  setHeroData({ ...heroData, subtitle: e.target.value })
                }
                placeholder="Full Stack Developer."
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={heroData.description}
                onChange={(e) =>
                  setHeroData({ ...heroData, description: e.target.value })
                }
                placeholder="I build accessible..."
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={heroData.imageUrl}
                onChange={(e) =>
                  setHeroData({ ...heroData, imageUrl: e.target.value })
                }
                placeholder="/images/hero.svg"
              />
            </div>
            <Button onClick={handleHeroSave}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Project management coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
