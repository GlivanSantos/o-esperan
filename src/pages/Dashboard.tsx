
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Users, Clock, AlertTriangle, TrendingUp, FileText, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data
  const stats = {
    totalCitizens: 12345,
    monthlyServices: 1230,
    priorityCases: 15,
    servicesCompleted: 85, // percentage
  };
  
  const recentCitizens = [
    { id: '1', name: 'Maria Silva', cpf: '123.456.789-00', date: '2025-04-01T10:30:00' },
    { id: '2', name: 'João Oliveira', cpf: '987.654.321-00', date: '2025-04-01T09:15:00' },
    { id: '3', name: 'Ana Costa', cpf: '456.789.123-00', date: '2025-03-31T14:45:00' },
    { id: '4', name: 'Carlos Santos', cpf: '789.123.456-00', date: '2025-03-31T11:00:00' },
    { id: '5', name: 'Beatriz Lima', cpf: '321.654.987-00', date: '2025-03-30T16:30:00' },
  ];
  
  const upcomingServices = [
    { id: '1', citizen: 'Maria Silva', type: 'Visita domiciliar', date: '2025-04-02T10:00:00' },
    { id: '2', name: 'João Oliveira', type: 'Encaminhamento médico', date: '2025-04-02T14:30:00' },
    { id: '3', name: 'Ana Costa', type: 'Avaliação socioeconômica', date: '2025-04-03T09:00:00' },
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">
          Bem-vindo(a), {user?.name}
        </h1>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-semfas-primary">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Cidadãos</p>
                <h3 className="text-2xl font-bold text-semfas-primary mt-1">{stats.totalCitizens.toLocaleString('pt-BR')}</h3>
              </div>
              <div className="w-12 h-12 bg-semfas-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-semfas-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-semfas-secondary">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Atendimentos no Mês</p>
                <h3 className="text-2xl font-bold text-semfas-primary mt-1">{stats.monthlyServices.toLocaleString('pt-BR')}</h3>
              </div>
              <div className="w-12 h-12 bg-semfas-secondary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-semfas-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-semfas-accent">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Casos Prioritários</p>
                <h3 className="text-2xl font-bold text-semfas-primary mt-1">{stats.priorityCases}</h3>
              </div>
              <div className="w-12 h-12 bg-semfas-accent/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-semfas-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-semfas-success">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Atendimentos Concluídos</p>
                <h3 className="text-2xl font-bold text-semfas-primary mt-1">{stats.servicesCompleted}%</h3>
              </div>
              <div className="w-12 h-12 bg-semfas-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-semfas-success" />
              </div>
            </div>
            <Progress value={stats.servicesCompleted} className="h-2 mt-3 bg-gray-100" indicatorClassName="bg-semfas-success" />
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for recent activities */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="recent" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Cidadãos Recentes
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Próximos Atendimentos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Cidadãos Cadastrados Recentemente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="pb-2 font-medium text-gray-500">Nome</th>
                      <th className="pb-2 font-medium text-gray-500">CPF</th>
                      <th className="pb-2 font-medium text-gray-500">Data</th>
                      <th className="pb-2 font-medium text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCitizens.map((citizen) => (
                      <tr key={citizen.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3">{citizen.name}</td>
                        <td className="py-3">{citizen.cpf}</td>
                        <td className="py-3">
                          <div className="flex flex-col">
                            <span>{formatDate(citizen.date)}</span>
                            <span className="text-xs text-gray-500">{formatTime(citizen.date)}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-semfas-primary">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Ver detalhes</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" className="text-semfas-primary">
                  Ver todos os cidadãos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Próximos Atendimentos Agendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="font-medium">{service.citizen || service.name}</h4>
                      <p className="text-sm text-gray-500">{service.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatDate(service.date)}</p>
                      <p className="text-sm text-gray-500">{formatTime(service.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" className="text-semfas-primary">
                  Ver todos os atendimentos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Additional info card */}
      <Card className="bg-semfas-light border-semfas-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-semfas-primary/10 rounded-full">
              <AlertTriangle className="h-6 w-6 text-semfas-primary" />
            </div>
            <div>
              <h3 className="font-medium text-semfas-primary">Informação Importante</h3>
              <p className="text-sm text-gray-600 mt-1">
                O sistema está em fase de implantação. Todos os relatórios e estatísticas apresentados são fictícios
                para fins de demonstração.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
