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

    const isSuperuser = token.role === "SUPERUSER";
    const isAdmin = token.role === "ADMIN" || isSuperuser;

    // Restricción específica para /admin/users (solo Superusuario)
    if (url.pathname.startsWith("/admin/users") && !isSuperuser) {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    // Validación general de acceso administrativo
    if (!isAdmin) {
      url.pathname = "/login";
      url.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(url);
    }
  }

  // Continuar con la petición normal si todo es correcto
  return NextResponse.next();
}

// Rutas a las que aplica este proxy
export const config = {
  matcher: ["/admin/:path*"],
};
