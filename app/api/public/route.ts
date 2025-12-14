import { getPublicProductsService } from "@/lib/public/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorParam = searchParams.get("cursor");
  const limitParam = searchParams.get("limit");

  const cursor = cursorParam ? parseInt(cursorParam, 10) : null;
  const limit = limitParam ? parseInt(limitParam, 10) : 20;

  const result = await getPublicProductsService(cursor, limit);

  // Retorna JSON con el resultado
  return NextResponse.json(result);
}
