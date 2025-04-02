
// Import necessary components
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserRound, FileText, CheckCircle2, Calendar, BarChart3, ArrowRight, HelpCircle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

  // Mock data for attendance by month
  const attendanceData = [
    { name: 'Jan', atendimentos: 650 },
    { name: 'Fev', atendimentos: 800 },
    { name: 'Mar', atendimentos: 1200 },
    { name: 'Abr', atendimentos: 950 },
    { name: 'Mai', atendimentos: 1100 },
    { name: 'Jun', atendimentos: 1400 },
  ];

  // Mock data for citizens by neighborhood
  const neighborhoodData = [
    { name: 'Centro', cidadaos: 4500 },
    { name: 'Jd. Primavera', cidadaos: 3200 },
    { name: 'Vila Nova', cidadaos: 2800 },
    { name: 'São José', cidadaos: 1900 },
    { name: 'Jd. Europa', cidadaos: 1700 },
  ];

  // Mock data for recent attendances
  const recentAttendances = [
    { id: 1, citizen: 'Maria Oliveira', date: '02/04/2025', type: 'Avaliação socioeconômica' },
    { id: 2, citizen: 'João Silva', date: '01/04/2025', type: 'Visita domiciliar' },
    { id: 3, citizen: 'Ana Beatriz', date: '01/04/2025', type: 'Encaminhamento médico' },
    { id: 4, citizen: 'Carlos Eduardo', date: '31/03/2025', type: 'Acompanhamento psicológico' },
    { id: 5, citizen: 'Luciana Ferreira', date: '31/03/2025', type: 'Entrega de benefícios' },
  ];

  // Mock data for priority cases
  const priorityCases = [
    { id: 1, citizen: 'Antônio Gomes', reason: 'Situação de rua', urgency: 'Alta' },
    { id: 2, citizen: 'Sebastiana Almeida', reason: 'Idosa em situação de abandono', urgency: 'Alta' },
    { id: 3, citizen: 'Família Pereira', reason: 'Insegurança alimentar', urgency: 'Média' },
  ];
  
  const handleHelpClick = () => {
    toast({
      title: "Ajuda - Dashboard",
      description: "Esta é a tela inicial do sistema, com uma visão geral dos atendimentos e cidadãos cadastrados.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">Dashboard</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                <HelpCircle className="h-5 w-5 text-semfas-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajuda - Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Cards with overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total citizens card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Cidadãos</p>
                <h3 className="text-2xl font-bold text-semfas-primary">12.345</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-semfas-primary/10 flex items-center justify-center">
                <UserRound className="h-5 w-5 text-semfas-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly attendances card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Atendimentos no Mês</p>
                <h3 className="text-2xl font-bold text-semfas-primary">1.230</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-semfas-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-semfas-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Completed attendances card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Atendimentos Concluídos</p>
                <h3 className="text-2xl font-bold text-green-600">85%</h3>
                <Progress 
                  value={85} 
                  className="h-2 mt-2 bg-gray-200" 
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Priority cases card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Casos Prioritários</p>
                <h3 className="text-2xl font-bold text-amber-500">15</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and reports */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Relatórios
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Line chart for attendance by month */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-semfas-primary" />
                  Atendimentos por Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={attendanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="atendimentos"
                        name="Atendimentos"
                        stroke="#003087"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Bar chart for citizens by neighborhood */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <UserRound className="h-5 w-5 mr-2 text-semfas-primary" />
                  Cidadãos por Bairro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={neighborhoodData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar
                        dataKey="cidadaos"
                        name="Cidadãos"
                        fill="#003087"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent attendance list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-semfas-primary" />
                  Atendimentos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAttendances.map((attendance) => (
                    <div key={attendance.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{attendance.citizen}</p>
                        <p className="text-sm text-gray-500">{attendance.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{attendance.date}</p>
                        <Button variant="ghost" size="sm" className="text-semfas-primary p-0 h-6">
                          Detalhes <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Priority cases list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                  Casos Prioritários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priorityCases.map((priority) => (
                    <div key={priority.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{priority.citizen}</p>
                        <p className="text-sm text-gray-500">{priority.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          priority.urgency === 'Alta' ? 'text-red-500' : 'text-amber-500'
                        }`}>
                          {priority.urgency}
                        </p>
                        <Button variant="ghost" size="sm" className="text-semfas-primary p-0 h-6">
                          Atender <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Relatórios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-semfas-primary/20 hover:border-semfas-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-semfas-primary/10 flex items-center justify-center mx-auto">
                        <FileText className="h-6 w-6 text-semfas-primary" />
                      </div>
                      <h3 className="font-medium">Atendimentos por Período</h3>
                      <p className="text-sm text-gray-500">Relatório detalhado de todos os atendimentos realizados em um período específico.</p>
                      <Button className="w-full bg-semfas-primary hover:bg-semfas-primary/90">Gerar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-semfas-primary/20 hover:border-semfas-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-semfas-primary/10 flex items-center justify-center mx-auto">
                        <UserRound className="h-6 w-6 text-semfas-primary" />
                      </div>
                      <h3 className="font-medium">Perfil Socioeconômico</h3>
                      <p className="text-sm text-gray-500">Análise detalhada do perfil socioeconômico dos cidadãos atendidos.</p>
                      <Button className="w-full bg-semfas-primary hover:bg-semfas-primary/90">Gerar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-semfas-primary/20 hover:border-semfas-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-semfas-primary/10 flex items-center justify-center mx-auto">
                        <BarChart3 className="h-6 w-6 text-semfas-primary" />
                      </div>
                      <h3 className="font-medium">Indicadores por Bairro</h3>
                      <p className="text-sm text-gray-500">Estatísticas e indicadores sociais segmentados por região e bairro.</p>
                      <Button className="w-full bg-semfas-primary hover:bg-semfas-primary/90">Gerar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
