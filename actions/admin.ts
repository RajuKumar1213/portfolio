"use server";

import { db } from "@/lib/db";
import { heroContent, projects } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Hero Section Actions
export async function updateHeroContent(data: {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}) {
  try {
    const existing = await db.select().from(heroContent).limit(1);

    if (existing.length === 0) {
      await db.insert(heroContent).values(data);
    } else {
      await db
        .update(heroContent)
        .set(data)
        .where(eq(heroContent.id, existing[0].id));
    }

    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Error updating hero content:", error);
    return { success: false, error: "Failed to update hero content" };
  }
}

export async function getHeroContent() {
  try {
    const content = await db.select().from(heroContent).limit(1);
    return content[0] || null;
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}

// Project Actions
export async function createProject(data: {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  github?: string;
}) {
  try {
    await db.insert(projects).values(data);
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    link?: string;
    github?: string;
  }
) {
  try {
    await db.update(projects).set(data).where(eq(projects.id, id));
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function getAllProjects() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(projects.createdAt);
    return allProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
