import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToMongoDB();

    await db.command({
      ping: 1,
    });

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected successfully.",
      database: db.databaseName,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "MongoDB connection failed.",
      },
      {
        status: 500,
      }
    );
  }
}