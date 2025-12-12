import { getAllProductsService } from "@/lib/products/service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ message: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = session.user.id;

  console.log("UserID en backend:", userId);

  const { searchParams } = new URL(request.url);
  const cursorParam = searchParams.get("cursor");
  const limitParam = searchParams.get("limit");

  const cursor = cursorParam ? parseInt(cursorParam, 10) : null;
  const limit = limitParam ? parseInt(limitParam, 10) : 20;

  const result = await getAllProductsService(+userId, cursor, limit);

  // Retorna JSON con el resultado
  return NextResponse.json(result);
}
