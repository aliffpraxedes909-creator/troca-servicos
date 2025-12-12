"use client";

import { useState } from "react";
import { 
  Users, 
  MessageCircle, 
  Star, 
  Trophy,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("matches");

  const colorTheme = {
    from: "#0D7377",
    to: "#7FD8BE"
  };

  const user = {
    name: "João Silva",
    avatar: "J",
    skills: ["Design Gráfico", "Fotografia"],
    credits: 45,
    level: 12,
    badges: 8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F3F0]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Swap Service</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Bell className="w-4 h-4 mr-2" />
                Notificações
                <Badge className="ml-2 bg-red-500 text-white">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Configurações</span>
              </Button>
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar - User Profile */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 bg-white border-2 border-gray-200/50 rounded-3xl">
              <div className="text-center space-y-4">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto"
                  style={{
                    background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                  }}
                >
                  {user.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">Nível {user.level}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{user.credits}</p>
                    <p className="text-xs text-gray-500">Créditos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{user.badges}</p>
                    <p className="text-xs text-gray-500">Badges</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">4.9</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                <Button 
                  className="w-full text-white rounded-xl"
                  style={{
                    background: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})`
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-2 border-gray-200/50 rounded-3xl">
              <h4 className="font-semibold text-gray-900 mb-4">Minhas Habilidades</h4>
              <div className="space-y-2">
                {user.skills.map((skill, idx) => (
                  <Badge 
                    key={idx}
                    className="w-full justify-center py-2"
                    style={{
                      backgroundColor: `${colorTheme.to}33`,
                      color: colorTheme.from,
                      borderColor: colorTheme.to
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl">
              <div className="flex items-start gap-3">
                <Trophy className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Desafio Semanal</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete 3 trocas esta semana</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                        style={{ width: "66%" }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">2/3</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, label: "Matches Hoje", value: "12", color: "from-blue-500 to-cyan-500" },
                { icon: MessageCircle, label: "Conversas Ativas", value: "5", color: "from-purple-500 to-pink-500" },
                { icon: Star, label: "Avaliações", value: "48", color: "from-yellow-500 to-orange-500" },
                { icon: TrendingUp, label: "Trocas Mês", value: "23", color: `from-[${colorTheme.from}] to-[${colorTheme.to}]` }
              ].map((stat, idx) => (
                <Card 
                  key={idx}
                  className="p-6 bg-white border-2 border-gray-200/50 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                      style={
                        idx === 3 
                          ? { background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})` }
                          : undefined
                      }
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Card className="p-2 bg-white border-2 border-gray-200/50 rounded-2xl">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: "matches", label: "Matches", icon: Sparkles },
                  { id: "messages", label: "Mensagens", icon: MessageCircle },
                  { id: "history", label: "Histórico", icon: Clock },
                  { id: "rewards", label: "Recompensas", icon: Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                      activeTab === tab.id
                        ? { background: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})` }
                        : undefined
                    }
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Content Area */}
            {activeTab === "matches" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Seus Matches</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar matches..."
                      className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0D7377] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Ana Silva", skill: "Design Gráfico", match: "95%", avatar: "A", location: "São Paulo, SP", badge: "🏆" },
                    { name: "Carlos Mendes", skill: "Desenvolvimento Web", match: "88%", avatar: "C", location: "Rio de Janeiro, RJ", badge: "⭐" },
                    { name: "Mariana Costa", skill: "Fotografia", match: "92%", avatar: "M", location: "Belo Horizonte, MG", badge: "🎯" },
                    { name: "Pedro Oliveira", skill: "Marketing Digital", match: "85%", avatar: "P", location: "Curitiba, PR", badge: "💎" }
                  ].map((match, idx) => (
                    <Card 
                      key={idx}
                      className="p-6 bg-white border-2 border-gray-200/50 rounded-2xl hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                            style={{
                              background: `linear-gradient(to bottom right, ${colorTheme.from}, ${colorTheme.to})`
                            }}
                          >
                            {match.avatar}
                          </div>
                          <span className="absolute -top-1 -right-1 text-xl">{match.badge}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{match.name}</h4>
                              <p className="text-sm text-gray-500">{match.skill}</p>
                            </div>
                            <Badge 
                              className="text-white"
                              style={{ backgroundColor: colorTheme.from }}
                            >
                              {match.match}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                            <MapPin className="w-3 h-3" />
                            {match.location}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              className="flex-1 text-white"
                              style={{
                                background: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})`
                              }}
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Conversar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Heart className="w-4 h-4 mr-1" />
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <Card className="p-8 bg-white border-2 border-gray-200/50 rounded-2xl text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma mensagem ainda</h3>
                <p className="text-gray-600 mb-6">Comece uma conversa com seus matches!</p>
                <Button 
                  className="text-white"
                  style={{
                    background: `linear-gradient(to right, ${colorTheme.from}, ${colorTheme.to})`
                  }}
                >
                  Ver Matches
                </Button>
              </Card>
            )}

            {activeTab === "history" && (
              <Card className="p-8 bg-white border-2 border-gray-200/50 rounded-2xl text-center">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Histórico vazio</h3>
                <p className="text-gray-600 mb-6">Suas trocas realizadas aparecerão aqui</p>
              </Card>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Suas Recompensas</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: "🥇", title: "Primeira Troca", description: "Complete sua primeira troca", unlocked: true },
                    { icon: "🔥", title: "Streak 7 Dias", description: "Acesse 7 dias seguidos", unlocked: true },
                    { icon: "⭐", title: "50 Trocas", description: "Complete 50 trocas", unlocked: false },
                    { icon: "👑", title: "Top 10 Local", description: "Entre no top 10 da sua região", unlocked: false },
                    { icon: "💎", title: "Verificado", description: "Complete a verificação", unlocked: true },
                    { icon: "🎯", title: "Match Perfeito", description: "Consiga um match de 100%", unlocked: false }
                  ].map((reward, idx) => (
                    <Card 
                      key={idx}
                      className={`p-6 border-2 rounded-2xl text-center ${
                        reward.unlocked 
                          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" 
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="text-4xl mb-3">{reward.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{reward.title}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      {reward.unlocked && (
                        <Badge className="mt-3 bg-green-500 text-white">Desbloqueado</Badge>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
