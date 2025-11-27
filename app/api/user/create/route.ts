import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clerkId, email, name, username, imageUrl } = body;

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "clerkId and email are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (existing.length > 0) {
      return NextResponse.json(
        { user: existing[0], message: "User already exists" },
        { status: 200 }
      );
    }

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        clerkId,
        email,
        name,
        username,
        imageUrl,
      })
      .returning();

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
