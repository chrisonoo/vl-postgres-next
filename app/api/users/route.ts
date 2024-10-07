import { getDatabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const db = getDatabase();
  try {
    const result = await db.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
