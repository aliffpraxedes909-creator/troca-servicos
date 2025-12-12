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
  User,
  MapPin,
  Calendar,
  CreditCard,
  Upload,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CadastroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    cpf: "",
    cep: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: ""
  });

  const colorTheme = {
    from: "#0D7377",
    to: "#7FD8BE"
  };

  // Validar idade (18+)
  const validarIdade = (dataNascimento: string): boolean => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      return idade - 1 >= 18;
    }
    
    return idade >= 18;
  };

  // Validar CPF
  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, "");
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  };

  // Validar CEP
  const validarCEP = (cep: string): boolean => {
    cep = cep.replace(/[^\d]/g, "");
    return cep.length === 8;
  };

  // Formatar CPF
  const formatarCPF = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  };

  // Formatar CEP
  const formatarCEP = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    return valor;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let valorFormatado = value;
    
    if (name === "cpf") {
      valorFormatado = formatarCPF(value);
    } else if (name === "cep") {
      valorFormatado = formatarCEP(value);
    }
    
    setFormData({
      ...formData,
      [name]: valorFormatado
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("A foto deve ter no máximo 5MB");
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validações
      if (!validarIdade(formData.dataNascimento)) {
        throw new Error("Você precisa ter 18 anos ou mais para se cadastrar");
      }

      if (!validarCPF(formData.cpf)) {
        throw new Error("CPF inválido");
      }

      if (!validarCEP(formData.cep)) {
        throw new Error("CEP inválido");
      }

      if (formData.senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }

      if (formData.senha !== formData.confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      if (!photoFile) {
        throw new Error("Por favor, adicione uma foto para autenticação");
      }

      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          data: {
            nome_completo: formData.nomeCompleto
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erro ao criar usuário");

      // 2. Upload da foto
      let fotoUrl = "";
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(fileName, photoFile);

        if (uploadError) {
          console.error("Erro ao fazer upload da foto:", uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('profile-photos')
            .getPublicUrl(fileName);
          fotoUrl = urlData.publicUrl;
        }
      }

      // 3. Criar perfil do usuário
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          nome_completo: formData.nomeCompleto,
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, ""),
          cep: formData.cep.replace(/\D/g, ""),
          data_nascimento: formData.dataNascimento,
          foto_url: fotoUrl
        });

      if (profileError) throw profileError;

      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        router.push("/auth");
      }, 2000);

    } catch (err: any) {
      setError(err.message || "Erro ao realizar cadastro");
    } finally {
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

      <div className="w-full max-w-4xl relative z-10">
        <Card className="p-8 sm:p-10 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl shadow-2xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                  }}
                >
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-xl font-bold text-gray-900">Swap Service</h1>
                  <p className="text-xs text-gray-500">Troque, não pague</p>
                </div>
              </Link>

              <Badge 
                className="mb-2"
                style={{
                  backgroundColor: `${colorTheme.to}33`,
                  color: colorTheme.from,
                  borderColor: colorTheme.to
                }}
              >
                Cadastro Gratuito
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900">
                Crie sua Conta
              </h3>
              <p className="text-gray-600">
                Preencha os dados abaixo para começar a trocar serviços
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Nome Completo */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    E-mail *
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

                {/* CPF */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    CPF *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* CEP */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    CEP *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleInputChange}
                      placeholder="00000-000"
                      maxLength={9}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Data de Nascimento */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Data de Nascimento * (Apenas maiores de 18 anos)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Foto para Autenticação */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Foto para Autenticação * (máx. 5MB)
                  </label>
                  <div className="flex items-center gap-4">
                    {photoPreview && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
                        <img 
                          src={photoPreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#0D7377] transition-colors">
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {photoPreview ? "Alterar foto" : "Selecionar foto"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Senha * (mín. 6 caracteres)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="senha"
                      value={formData.senha}
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

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
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
                    Criando conta...
                  </span>
                ) : (
                  <>
                    Criar Conta
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Link para Login */}
            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/auth"
                className="font-semibold text-[#0D7377] hover:underline"
              >
                Faça login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
