import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  // @ts-ignore - PrismaAdapter type compatibility
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 día
  },

  jwt: {
    maxAge: 60 * 60 * 24, // 1 día
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      
      const allowed = await prisma.allowedEmail.findUnique({
        where: { email: user.email },
      });

      return !!allowed;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        // Validación en vivo para "expulsión en siguiente iteración"
        const allowed = await prisma.allowedEmail.findUnique({
          where: { email: session.user.email! },
        });

        if (!allowed) {
          return null as any; // Invalida la sesión si ya no está en la lista blanca
        }

        session.user.role = allowed.isSuperuser ? "SUPERUSER" : "ADMIN";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        
        const allowed = await prisma.allowedEmail.findUnique({
          where: { email: user.email! },
        });
        
        if (allowed) {
          token.role = allowed.isSuperuser ? "SUPERUSER" : "ADMIN";
        }
      }
      return token;
    },

  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
