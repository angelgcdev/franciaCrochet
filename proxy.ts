import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  // Obtener token JWT de la sesión
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();

  // Proteger todas las rutas que empiecen con /admin
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      // Redirigir a login si no hay token
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Continuar con la petición normal si hay token o ruta no protegida
  return NextResponse.next();
}

// Indicar rutas a las que aplica middleware
export const config = {
  matcher: ["/admin/:path*"],
};
