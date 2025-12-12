"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Users, 
  Shield, 
  MapPin, 
  MessageCircle, 
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Zap,
  Target,
  Gift,
  Trophy,
  Rocket,
  Heart,
  Brain,
  Share2,
  Palette,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedColor, setSelectedColor] = useState("teal");

  // Paletas de cores disponíveis
  const colorThemes = {
    teal: { from: "#0D7377", to: "#7FD8BE", name: "Azul Petróleo" },
    purple: { from: "#6366F1", to: "#A78BFA", name: "Roxo Vibrante" },
    orange: { from: "#F97316", to: "#FB923C", name: "Laranja Energia" },
    pink: { from: "#EC4899", to: "#F472B6", name: "Rosa Moderno" },
    green: { from: "#10B981", to: "#34D399", name: "Verde Fresco" }
  };

  const currentTheme = colorThemes[selectedColor as keyof typeof colorThemes];

  // Passos do onboarding interativo
  const onboardingSteps = [
    {
      icon: Users,
      title: "Bem-vindo ao Swap Service!",
      description: "Descubra como trocar serviços sem usar dinheiro",
      highlight: "Sua habilidade vale muito!"
    },
    {
      icon: Sparkles,
      title: "Matches Inteligentes",
      description: "Nossa IA encontra as melhores combinações para você",
      highlight: "Algoritmo exclusivo de compatibilidade"
    },
    {
      icon: Award,
      title: "Sistema de Recompensas",
      description: "Ganhe badges, suba no ranking e desbloqueie benefícios",
      highlight: "Quanto mais ativo, mais recompensas!"
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Verificação multinível e sistema de confiança avançado",
      highlight: "Sua segurança é nossa prioridade"
    }
  ];

  // Funções de navegação
  const handleLogin = () => {
    router.push("/auth");
  };

  const handleSignup = () => {
    router.push("/auth");
  };

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    setOnboardingStep(0);
    router.push("/auth");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F3F0]"
    }`}>
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
          <Card className={`max-w-lg mx-4 p-8 ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
          } rounded-3xl shadow-2xl animate-in zoom-in slide-in-from-bottom duration-500`}>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="flex gap-2">
                {onboardingSteps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-2 flex-1 rounded-full transition-all duration-300`}
                    style={{
                      background: idx <= onboardingStep 
                        ? `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                        : theme === "dark" ? "#374151" : "#E5E7EB"
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="text-center space-y-4 py-8">
                <div 
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center animate-in zoom-in duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  {(() => {
                    const Icon = onboardingSteps[onboardingStep].icon;
                    return <Icon className="w-12 h-12 text-white" />;
                  })()}
                </div>

                <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {onboardingSteps[onboardingStep].title}
                </h3>

                <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {onboardingSteps[onboardingStep].description}
                </p>

                <Badge 
                  className="text-sm px-4 py-2"
                  style={{
                    backgroundColor: `${currentTheme.to}33`,
                    color: currentTheme.from,
                    borderColor: currentTheme.to
                  }}
                >
                  {onboardingSteps[onboardingStep].highlight}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {onboardingStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className={`flex-1 ${theme === "dark" ? "border-gray-600 text-gray-300" : ""}`}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (onboardingStep < onboardingSteps.length - 1) {
                      setOnboardingStep(onboardingStep + 1);
                    } else {
                      handleFinishOnboarding();
                    }
                  }}
                  className="flex-1 text-white"
                  style={{
                    background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  {onboardingStep < onboardingSteps.length - 1 ? "Próximo" : "Começar!"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <button
                onClick={() => {
                  setShowOnboarding(false);
                  setOnboardingStep(0);
                  router.push("/auth");
                }}
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"} hover:underline w-full text-center`}
              >
                Pular tutorial
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Header/Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-gray-900/80 border-gray-800" 
          : "bg-white/80 border-gray-200/50"
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Swap Service
                </h1>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Troque, não pague
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#como-funciona" className={`text-sm font-medium transition-colors ${
                theme === "dark" 
                  ? "text-gray-300 hover:text-white" 
                  : "text-gray-700 hover:text-[#0D7377]"
              }`}>
                Como Funciona
              </a>
              <a href="#beneficios" className={`text-sm font-medium transition-colors ${
                theme === "dark" 
                  ? "text-gray-300 hover:text-white" 
                  : "text-gray-700 hover:text-[#0D7377]"
              }`}>
                Benefícios
              </a>
              <a href="#recompensas" className={`text-sm font-medium transition-colors ${
                theme === "dark" 
                  ? "text-gray-300 hover:text-white" 
                  : "text-gray-700 hover:text-[#0D7377]"
              }`}>
                Recompensas
              </a>
              <a href="#comunidade" className={`text-sm font-medium transition-colors ${
                theme === "dark" 
                  ? "text-gray-300 hover:text-white" 
                  : "text-gray-700 hover:text-[#0D7377]"
              }`}>
                Comunidade
              </a>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-xl transition-all ${
                  theme === "dark" 
                    ? "bg-gray-800 hover:bg-gray-700" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              <Button 
                onClick={handleLogin}
                variant="outline" 
                style={{
                  borderColor: currentTheme.from,
                  color: currentTheme.from
                }}
                className="hover:text-white"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = currentTheme.from;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = currentTheme.from;
                }}
              >
                Entrar
              </Button>
              <Button 
                onClick={handleSignup}
                className="text-white hover:opacity-90"
                style={{
                  background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                }}
              >
                Começar Grátis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className={`w-6 h-6 ${theme === "dark" ? "text-white" : ""}`} /> : <Menu className={`w-6 h-6 ${theme === "dark" ? "text-white" : ""}`} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-in slide-in-from-top">
              <a href="#como-funciona" className={`block text-sm font-medium py-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Como Funciona
              </a>
              <a href="#beneficios" className={`block text-sm font-medium py-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Benefícios
              </a>
              <a href="#recompensas" className={`block text-sm font-medium py-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Recompensas
              </a>
              <a href="#comunidade" className={`block text-sm font-medium py-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Comunidade
              </a>
              <Button 
                onClick={handleLogin}
                variant="outline" 
                className="w-full"
                style={{
                  borderColor: currentTheme.from,
                  color: currentTheme.from
                }}
              >
                Entrar
              </Button>
              <Button 
                onClick={handleSignup}
                className="w-full text-white"
                style={{
                  background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                }}
              >
                Começar Grátis
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <Badge 
                className="hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: `${currentTheme.to}33`,
                  color: currentTheme.from,
                  borderColor: currentTheme.to
                }}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Economia Colaborativa com IA
              </Badge>
              
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Troque Serviços,
                <span 
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  Não Dinheiro
                </span>
              </h1>
              
              <p className={`text-xl leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Conecte-se com pessoas que precisam do que você oferece e oferecem o que você precisa. 
                <strong> Nossa IA encontra os matches perfeitos para você!</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleStartOnboarding}
                  className="text-white hover:opacity-90 text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className={`border-2 text-lg px-8 py-6 rounded-2xl transition-all ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:border-white hover:text-white"
                      : "border-gray-300 text-gray-700 hover:border-[#0D7377] hover:text-[#0D7377]"
                  }`}
                >
                  Ver Como Funciona
                </Button>
              </div>

              {/* Color Theme Selector */}
              <div className="pt-4">
                <p className={`text-sm font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  <Palette className="w-4 h-4 inline mr-2" />
                  Personalize seu tema:
                </p>
                <div className="flex gap-3">
                  {Object.entries(colorThemes).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedColor(key)}
                      className={`w-10 h-10 rounded-full transition-all hover:scale-110 ${
                        selectedColor === key ? "ring-4 ring-offset-2 scale-110" : ""
                      }`}
                      style={{ 
                        backgroundImage: `linear-gradient(to bottom right, ${value.from}, ${value.to})`,
                        ringColor: selectedColor === key ? value.from : undefined,
                        ...(theme === "dark" && { ringOffsetColor: "#111827" })
                      }}
                      title={value.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-white font-bold ${
                        theme === "dark" ? "border-gray-900" : "border-white"
                      }`}
                      style={{
                        background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                      }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    +12.500 usuários
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Trocando serviços diariamente
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="relative z-10">
                <Card className={`p-8 backdrop-blur-sm border-2 shadow-2xl rounded-3xl ${
                  theme === "dark" 
                    ? "bg-gray-800/80 border-gray-700" 
                    : "bg-white/80 border-gray-200/50"
                }`}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Matches Hoje
                      </h3>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: currentTheme.to }}
                      >
                        +24
                      </Badge>
                    </div>

                    {[
                      { name: "Ana Silva", skill: "Design Gráfico", avatar: "A", match: "95%", badge: "🏆" },
                      { name: "Carlos Mendes", skill: "Desenvolvimento Web", avatar: "C", match: "88%", badge: "⭐" },
                      { name: "Mariana Costa", skill: "Fotografia", avatar: "M", match: "92%", badge: "🎯" }
                    ].map((user, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:scale-105 hover:shadow-lg ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 hover:border-gray-500"
                            : "bg-gradient-to-r from-[#FAFAFA] to-white border-gray-200/50 hover:shadow-md"
                        }`}
                      >
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold relative"
                          style={{
                            background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                          }}
                        >
                          {user.avatar}
                          <span className="absolute -top-1 -right-1 text-lg">{user.badge}</span>
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {user.name}
                          </p>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {user.skill}
                          </p>
                        </div>
                        <div className="text-right">
                          <p 
                            className="text-lg font-bold"
                            style={{ color: currentTheme.from }}
                          >
                            {user.match}
                          </p>
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Match
                          </p>
                        </div>
                      </div>
                    ))}

                    <Button 
                      onClick={handleSignup}
                      className="w-full text-white rounded-xl py-6 hover:opacity-90 transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                      }}
                    >
                      Ver Todos os Matches
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Floating Elements */}
              <div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-3xl opacity-20 blur-2xl animate-pulse"
                style={{ backgroundColor: currentTheme.to }}
              ></div>
              <div 
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl opacity-20 blur-2xl animate-pulse"
                style={{ backgroundColor: currentTheme.from, animationDelay: "1000ms" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 backdrop-blur-sm ${
        theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "12.5K+", label: "Usuários Ativos" },
              { icon: TrendingUp, value: "45K+", label: "Trocas Realizadas" },
              { icon: Star, value: "4.9/5", label: "Avaliação Média" },
              { icon: Clock, value: "180K+", label: "Horas Trocadas" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-3 animate-in fade-in zoom-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema de Recompensas */}
      <section id="recompensas" className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge 
              style={{
                backgroundColor: `${currentTheme.to}33`,
                color: currentTheme.from,
                borderColor: currentTheme.to
              }}
            >
              <Gift className="w-3 h-3 mr-1" />
              Novo Sistema de Recompensas
            </Badge>
            <h2 className={`text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Ganhe Enquanto Troca
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Quanto mais ativo você for, mais recompensas e benefícios exclusivos você desbloqueia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Badges Exclusivos",
                description: "Desbloqueie badges especiais completando desafios e marcos",
                rewards: ["🥇 Primeira Troca", "🔥 Streak de 7 dias", "⭐ 50 Trocas"],
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Target,
                title: "Desafios Semanais",
                description: "Complete desafios e ganhe créditos extras e visibilidade",
                rewards: ["🎯 3 Trocas/Semana", "💬 5 Conversas", "⭐ 10 Avaliações"],
                color: `from-[${currentTheme.from}] to-[${currentTheme.to}]`
              },
              {
                icon: Rocket,
                title: "Ranking Premium",
                description: "Suba no ranking e ganhe destaque na plataforma",
                rewards: ["🏆 Top 10 Local", "👑 Top 100 Nacional", "🌟 Hall da Fama"],
                color: "from-purple-500 to-pink-500"
              }
            ].map((reward, idx) => (
              <Card 
                key={idx}
                className={`p-6 border-2 hover:shadow-2xl transition-all duration-300 rounded-3xl group hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200/50 hover:border-gray-300"
                }`}
              >
                <div className="space-y-4">
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    style={
                      idx === 1 
                        ? { background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})` }
                        : undefined
                    }
                  >
                    <reward.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {reward.title}
                  </h3>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {reward.description}
                  </p>
                  <div className="space-y-2 pt-2">
                    {reward.rewards.map((item, i) => (
                      <div 
                        key={i}
                        className={`text-sm p-2 rounded-lg ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IA e Sugestões Personalizadas */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-[#0D7377]/5 to-[#7FD8BE]/5"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge 
                style={{
                  backgroundColor: `${currentTheme.from}33`,
                  color: currentTheme.from,
                  borderColor: currentTheme.from
                }}
              >
                <Brain className="w-3 h-3 mr-1" />
                Inteligência Artificial
              </Badge>
              <h2 className={`text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                IA que Entende Você
              </h2>
              <p className={`text-xl leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Nossa inteligência artificial aprende com suas preferências e comportamento para sugerir os melhores matches, horários e estratégias para maximizar suas trocas.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Matches Inteligentes",
                    description: "Algoritmo exclusivo que considera compatibilidade, localização e histórico"
                  },
                  {
                    icon: Target,
                    title: "Sugestões Personalizadas",
                    description: "Dicas para melhorar seu perfil e aumentar suas chances de match"
                  },
                  {
                    icon: TrendingUp,
                    title: "Análise Preditiva",
                    description: "Previsão dos melhores horários e dias para você fazer trocas"
                  }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className={`flex gap-4 p-4 rounded-2xl transition-all hover:scale-105 ${
                      theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {feature.title}
                      </h4>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className={`p-8 border-2 shadow-2xl rounded-3xl ${
              theme === "dark" 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200/50"
            }`}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Sugestões da IA para Você
                  </h3>
                  <Brain className="w-6 h-6" style={{ color: currentTheme.from }} />
                </div>

                {[
                  {
                    type: "Melhore seu Perfil",
                    suggestion: "Adicione 3 fotos ao seu portfólio para aumentar matches em 45%",
                    impact: "+45%",
                    color: "green"
                  },
                  {
                    type: "Melhor Horário",
                    suggestion: "Usuários como você têm 2x mais sucesso às terças, 14h-17h",
                    impact: "2x",
                    color: "blue"
                  },
                  {
                    type: "Nova Habilidade",
                    suggestion: "Considere adicionar 'Edição de Vídeo' - alta demanda na sua região",
                    impact: "Alta",
                    color: "purple"
                  }
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border-l-4 transition-all hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-l-gray-600"
                        : "bg-gray-50 border-l-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className={`text-xs font-semibold mb-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {tip.type}
                        </p>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {tip.suggestion}
                        </p>
                      </div>
                      <Badge className={`bg-${tip.color}-500/20 text-${tip.color}-600 border-${tip.color}-500 flex-shrink-0`}>
                        {tip.impact}
                      </Badge>
                    </div>
                  </div>
                ))}

                <Button 
                  onClick={handleSignup}
                  className="w-full text-white rounded-xl py-6 hover:opacity-90 transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  Ver Todas as Sugestões
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Histórias de Sucesso */}
      <section id="comunidade" className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge 
              style={{
                backgroundColor: `${currentTheme.to}33`,
                color: currentTheme.from,
                borderColor: currentTheme.to
              }}
            >
              <Heart className="w-3 h-3 mr-1" />
              Comunidade Ativa
            </Badge>
            <h2 className={`text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Histórias de Sucesso
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Inspire-se com histórias reais de sucesso da nossa comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Julia Martins",
                story: "Troquei aulas de yoga por design do meu site. Economizei R$ 3.500!",
                trades: "23 trocas",
                avatar: "J"
              },
              {
                name: "Pedro Santos",
                story: "Consegui reformar minha casa inteira trocando serviços de programação",
                trades: "47 trocas",
                avatar: "P"
              },
              {
                name: "Carla Oliveira",
                story: "Construí minha rede profissional e fiz amizades incríveis através das trocas",
                trades: "31 trocas",
                avatar: "C"
              }
            ].map((story, idx) => (
              <Card
                key={idx}
                className={`p-6 border-2 hover:shadow-xl transition-all rounded-3xl hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200/50"
                }`}
              >
                <div className="space-y-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto"
                    style={{
                      background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                    }}
                  >
                    {story.avatar}
                  </div>
                  <div className="text-center">
                    <h4 className={`font-semibold text-lg mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {story.name}
                    </h4>
                    <Badge className="text-xs mb-3">{story.trades}</Badge>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      "{story.story}"
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className={`rounded-xl px-8 py-6 text-lg ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : ""
              }`}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhe Sua História
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-800/50" : ""
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge 
              style={{
                backgroundColor: `${currentTheme.to}33`,
                color: currentTheme.from,
                borderColor: currentTheme.to
              }}
            >
              Simples e Rápido
            </Badge>
            <h2 className={`text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Como Funciona?
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Em 4 passos simples, você já está trocando serviços
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: Users,
                title: "Crie seu Perfil",
                description: "Cadastre suas habilidades, portfólio e o que você procura"
              },
              {
                step: "2",
                icon: Sparkles,
                title: "Receba Matches",
                description: "Nossa IA encontra as melhores combinações para você"
              },
              {
                step: "3",
                icon: MessageCircle,
                title: "Converse e Negocie",
                description: "Chat em tempo real para acertar todos os detalhes"
              },
              {
                step: "4",
                icon: CheckCircle2,
                title: "Troque e Avalie",
                description: "Realize a troca e avalie a experiência"
              }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className={`p-6 border-2 hover:shadow-xl transition-all duration-300 rounded-3xl group hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200/50 hover:border-[#7FD8BE]"
                }`}
              >
                <div className="space-y-4">
                  <div className="relative">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                      }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: currentTheme.to }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="beneficios" className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-900 to-gray-800" 
          : "bg-gradient-to-br from-[#0D7377]/5 to-[#7FD8BE]/5"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge 
              style={{
                backgroundColor: `${currentTheme.from}33`,
                color: currentTheme.from,
                borderColor: currentTheme.from
              }}
            >
              Recursos Poderosos
            </Badge>
            <h2 className={`text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Tudo que Você Precisa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verificação Multinível",
                description: "Sistema completo com verificação social, documentos e facial"
              },
              {
                icon: MapPin,
                title: "Geolocalização Inteligente",
                description: "Encontre serviços próximos com filtros avançados e mapa interativo"
              },
              {
                icon: Star,
                title: "Reputação Avançada",
                description: "Sistema de avaliações detalhadas com badges e selos de confiança"
              },
              {
                icon: Clock,
                title: "Créditos por Hora",
                description: "Sistema justo e transparente baseado em horas de trabalho"
              },
              {
                icon: Award,
                title: "Gamificação Completa",
                description: "Desafios, rankings, badges e recompensas por participação"
              },
              {
                icon: Users,
                title: "Comunidades Locais",
                description: "Grupos por região, eventos presenciais e networking"
              }
            ].map((feature, idx) => (
              <Card 
                key={idx}
                className={`p-6 border-2 hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-gray-600"
                    : "bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-[#0D7377]"
                }`}
              >
                <div className="space-y-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                    }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card 
            className="p-12 border-0 rounded-3xl shadow-2xl text-center space-y-8"
            style={{
              background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
            }}
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Pronto para Começar?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já estão trocando serviços e construindo uma economia mais colaborativa
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleStartOnboarding}
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                Criar Conta Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-all"
              >
                Saber Mais
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Grátis para sempre • Sem taxas escondidas • Comunidade ativa</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-black" : "bg-gray-900"
      } text-white`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, ${currentTheme.from}, ${currentTheme.to})`
                  }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Swap Service</h3>
                  <p className="text-xs text-gray-400">Troque, não pague</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Conectando pessoas através de serviços, construindo uma economia mais colaborativa.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recompensas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2024 Swap Service. Todos os direitos reservados. Feito com ❤️ para uma economia mais colaborativa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
