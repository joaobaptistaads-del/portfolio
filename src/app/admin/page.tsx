"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { useToastStore } from "@/lib/store/toastStore";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { success, error: showError } = useToastStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Try Supabase Auth first
      await signIn(email, password);
      success("Login bem-sucedido!", "Redirecionando para o dashboard...");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Fallback: Demo credentials if Supabase Auth fails
      const DEMO_EMAIL = "admin@joaoadriano.com";
      const DEMO_PASSWORD = "admin123";
      
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem("adminToken", "demo-token");
        success("Login bem-sucedido (modo demo)!", "Redirecionando...");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 500);
      } else {
        showError(
          "Erro ao fazer login",
          "Use admin@joaoadriano.com / admin123 ou crie um usuário no Supabase Auth"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-950 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md bg-gray-900 rounded-lg border border-gray-800 p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              placeholder="Digite sua senha"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Portfolio
          </Link>
        </p>
      </div>
    </main>
  );
}
