"use client";

import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/admin/products" });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-2xl border-border bg-white shadow-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* --- CONTENIDO IZQUIERDA --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 flex flex-col justify-center items-center text-center"
          >
            <div className="flex flex-col items-center gap-4 mb-8">
              <h1 className="stitch-h2 text-3xl">Bienvenido</h1>
              <p className="text-muted-foreground text-sm max-w-[250px]">
                Accede al panel administrativo de Francia Crochet de forma segura.
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full h-14 rounded-xl flex items-center justify-center gap-3 border-border hover:bg-secondary-100 transition-all shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <span className="font-medium text-fg-primary">Continuar con Google</span>
                </>
              )}
            </Button>

            <p className="mt-8 text-xs text-muted-foreground italic">
              "Puntadas con amor, tecnología con propósito"
            </p>
          </motion.div>

          {/* --- IMAGEN DERECHA --- */}
          <div className="relative hidden md:block bg-secondary-200">
            <div className="absolute inset-0 bg-primary-400/10 z-10" />
            <Image
              fill
              src="https://res.cloudinary.com/dngkwtctt/image/upload/v1778466573/logo_2_e5w4m8.png"
              alt="Francia Crochet Logo"
              className="object-cover"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
