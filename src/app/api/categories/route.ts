import { NextResponse } from "next/server";
import { getCategories } from "@/lib/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const data = await getCategories(page, limit);

  return NextResponse.json(data);
}
