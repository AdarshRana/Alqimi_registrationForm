import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { registrationSchema } from "@/lib/validation";

const dbPath = path.join(process.cwd(), "db.json");

interface DbSchema {
  users: Array<Record<string, unknown>>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate incoming data using the same Zod schema
    const validatedData = registrationSchema.parse(body);

    // Read existing db.json
    const fileContents = await fs.readFile(dbPath, "utf-8");
    const db: DbSchema = JSON.parse(fileContents);

    // Add metadata
    const newUser = {
      id: crypto.randomUUID(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    // Append new user
    db.users.push(newUser);

    // Save back to db.json
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error,
        },
        { status: 400 }
      );
    }

    console.error("Registration API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}