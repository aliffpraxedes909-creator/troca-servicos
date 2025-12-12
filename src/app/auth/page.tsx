"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const colorTheme = {
    from: "#0D7377",
    to: "#7FD8BE"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fazer login com Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (loginError) {
        throw new Error("E-mail ou senha incorretos. Verifique seus dados ou cadastre-se.");
      }

      if (!data.user) {
        throw new Error("Usuário não encontrado. Por favor, cadastre-se primeiro.");
      }

      // Verificar se o perfil existe
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileError || !profileData) {
        throw new Error("Perfil não encontrado. Por favor, complete seu cadastro.");
      }

      // Login bem-sucedido - redirecionar para dashboard
      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Função para login social (Google, GitHub, Facebook)
  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw error;
      }

      // O Supabase redireciona automaticamente para a página de login do provedor
    } catch (err: any) {
      setError(err.message || `Erro ao fazer login com ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F3F0] flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colorTheme.to }}
      />
      <div 
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colorTheme.from }}
      />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{
                background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
              }}
            >
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Swap Service</h1>
              <p className="text-sm text-gray-500">Troque, não pague</p>
            </div>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Bem-vindo à maior plataforma de{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})`
                }}
              >
                troca de serviços
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Junte-se a mais de 12.500 pessoas que já estão trocando serviços sem usar dinheiro
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: "Matches inteligentes com IA" },
              { icon: CheckCircle2, text: "Sistema de recompensas exclusivo" },
              { icon: CheckCircle2, text: "Verificação de segurança multinível" },
              { icon: CheckCircle2, text: "Comunidade ativa e engajada" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                  }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200/50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  "Economizei mais de R$ 5.000 em 3 meses!"
                </p>
                <p className="text-sm text-gray-600">
                  Julia M. - Designer Gráfica
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 sm:p-10 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-right duration-700">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <Badge 
                className="mb-2"
                style={{
                  backgroundColor: `${colorTheme.to}33`,
                  color: colorTheme.from,
                  borderColor: colorTheme.to
                }}
              >
                Bem-vindo de volta!
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900">
                Entrar na Plataforma
              </h3>
              <p className="text-gray-600">
                Entre para continuar trocando serviços
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Lembrar de mim</span>
                </label>
                <a href="#" className="text-[#0D7377] hover:underline font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-white py-6 text-lg rounded-xl hover:opacity-90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})`
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="py-6 border-2 hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className="py-6 border-2 hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                className="py-6 border-2 hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
            </div>

            {/* Link para Cadastro */}
            <div className="text-center text-sm text-gray-600">
              Ainda não tem uma conta?{" "}
              <Link
                href="/auth/cadastro"
                className="font-semibold text-[#0D7377] hover:underline"
              >
                Cadastre-se grátis
              </Link>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden pt-4 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
                ← Voltar para home
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
