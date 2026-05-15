import { Metadata } from "next";
import { LoginForm } from "@/components/login/login-form";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Suspense fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

