
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  HelpCircle, 
  Filter, 
  Download, 
  FileText, 
  Pencil, 
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  AlertTriangle,
  BarChart
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Attendance {
  id: string;
  citizenName: string;
  citizenId: string;
  date: string;
  type: string;
  observations: string;
  status: 'Aberto' | 'Em andamento' | 'Concluído';
}

const Attendances = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    citizenId: '',
    date: '',
    type: '',
    observations: '',
    status: 'Aberto',
  });
  
  // Mock data
  const attendances: Attendance[] = [
    {
      id: '1',
      citizenName: 'João Silva Pereira',
      citizenId: '1',
      date: '2025-04-01T14:30:00',
      type: 'Visita domiciliar',
      observations: 'Cidadão relatou dificuldade de acesso a medicamentos',
      status: 'Concluído',
    },
    {
      id: '2',
      citizenName: 'Maria Oliveira Santos',
      citizenId: '2',
      date: '2025-04-02T10:00:00',
      type: 'Encaminhamento médico',
      observations: 'Necessita de consulta com ortopedista urgente',
      status: 'Em andamento',
    },
    {
      id: '3',
      citizenName: 'Ana Beatriz Costa',
      citizenId: '3',
      date: '2025-04-05T09:15:00',
      type: 'Avaliação socioeconômica',
      observations: 'Verificar condições para inclusão em programa habitacional',
      status: 'Aberto',
    },
    {
      id: '4',
      citizenName: 'Carlos Eduardo Lima',
      citizenId: '4',
      date: '2025-03-28T16:45:00',
      type: 'Acompanhamento psicológico',
      observations: 'Primeira sessão realizada com sucesso',
      status: 'Em andamento',
    },
    {
      id: '5',
      citizenName: 'Luciana Ferreira Dias',
      citizenId: '5',
      date: '2025-03-25T11:30:00',
      type: 'Entrega de benefícios',
      observations: 'Entregue cesta básica e kit higiene',
      status: 'Concluído',
    },
  ];
  
  // Mock data for citizens
  const citizens = [
    { id: '1', name: 'João Silva Pereira' },
    { id: '2', name: 'Maria Oliveira Santos' },
    { id: '3', name: 'Ana Beatriz Costa' },
    { id: '4', name: 'Carlos Eduardo Lima' },
    { id: '5', name: 'Luciana Ferreira Dias' },
  ];
  
  // Mock data for attendance types
  const attendanceTypes = [
    'Visita domiciliar',
    'Encaminhamento médico',
    'Avaliação socioeconômica',
    'Acompanhamento psicológico',
    'Entrega de benefícios',
    'Orientação jurídica',
    'Outro',
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const filteredAttendances = attendances.filter(attendance => {
    const matchesSearch = attendance.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          attendance.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || attendance.status === statusFilter;
    
    let matchesDate = true;
    if (startDate && endDate) {
      const attendanceDate = new Date(attendance.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59); // Set to end of day
      
      matchesDate = attendanceDate >= start && attendanceDate <= end;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  const handleAddAttendance = () => {
    // Validate form
    if (!formData.citizenId || !formData.date || !formData.type) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Add attendance logic would go here in a real application
    const citizenName = citizens.find(c => c.id === formData.citizenId)?.name || '';
    
    toast({
      title: "Atendimento registrado",
      description: `Atendimento para ${citizenName} foi registrado com sucesso!`,
    });
    
    // Reset form and close dialog
    setFormData({
      citizenId: '',
      date: '',
      type: '',
      observations: '',
      status: 'Aberto',
    });
    setIsAddDialogOpen(false);
  };
  
  const handleStatusChange = (id: string, newStatus: 'Aberto' | 'Em andamento' | 'Concluído') => {
    // In a real application, this would update the status in the database
    toast({
      title: "Status atualizado",
      description: `Status do atendimento alterado para ${newStatus}`,
    });
  };
  
  const handleHelpClick = () => {
    toast({
      title: "Ajuda - Módulo de Atendimentos",
      description: "Utilize este módulo para registrar e gerenciar os atendimentos realizados aos cidadãos.",
    });
  };
  
  const statusColors = {
    'Aberto': 'bg-blue-100 text-blue-800',
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Concluído': 'bg-green-100 text-green-800',
  };
  
  const statusIcons = {
    'Aberto': <Clock className="h-4 w-4 mr-1" />,
    'Em andamento': <AlertTriangle className="h-4 w-4 mr-1" />,
    'Concluído': <CheckCircle2 className="h-4 w-4 mr-1" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">Atendimentos</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                <HelpCircle className="h-5 w-5 text-semfas-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajuda - Módulo de Atendimentos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <h3 className="text-2xl font-bold text-semfas-primary mt-1">{attendances.length}</h3>
              </div>
              <div className="w-10 h-10 bg-semfas-primary/10 rounded-full flex items-center justify-center">
                <BarChart className="h-5 w-5 text-semfas-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Abertos</p>
                <h3 className="text-2xl font-bold text-blue-500 mt-1">
                  {attendances.filter(a => a.status === 'Aberto').length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Em andamento</p>
                <h3 className="text-2xl font-bold text-yellow-500 mt-1">
                  {attendances.filter(a => a.status === 'Em andamento').length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Concluídos</p>
                <h3 className="text-2xl font-bold text-green-500 mt-1">
                  {attendances.filter(a => a.status === 'Concluído').length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Action bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar..."
              className="pl-8 border-semfas-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="start-date" className="text-sm">Data inicial</Label>
            <Input
              id="start-date"
              type="date"
              className="border-semfas-primary/20"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="end-date" className="text-sm">Data final</Label>
            <Input
              id="end-date"
              type="date"
              className="border-semfas-primary/20"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-semfas-primary/20">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Aberto">Aberto</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-semfas-primary/20 text-semfas-primary">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-semfas-primary hover:bg-semfas-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Atendimento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-semfas-primary">Registrar Novo Atendimento</DialogTitle>
                <DialogDescription>
                  Preencha os dados do atendimento. Campos com * são obrigatórios.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="grid gap-4 py-4 px-1">
                  <div className="space-y-2">
                    <Label htmlFor="citizen" className="text-right">
                      Cidadão *
                    </Label>
                    <Select
                      value={formData.citizenId}
                      onValueChange={(value) => setFormData({...formData, citizenId: value})}
                    >
                      <SelectTrigger id="citizen" className="border-semfas-primary/20">
                        <SelectValue placeholder="Selecione o cidadão" />
                      </SelectTrigger>
                      <SelectContent>
                        {citizens.map((citizen) => (
                          <SelectItem key={citizen.id} value={citizen.id}>
                            {citizen.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-right">
                        Data e hora *
                      </Label>
                      <div className="flex">
                        <Input
                          id="date"
                          type="datetime-local"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="border-semfas-primary/20"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" type="button">
                                <Calendar className="h-4 w-4 text-gray-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Selecione a data e hora</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-right">
                        Status *
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: 'Aberto' | 'Em andamento' | 'Concluído') => 
                          setFormData({...formData, status: value})
                        }
                      >
                        <SelectTrigger id="status" className="border-semfas-primary/20">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aberto">Aberto</SelectItem>
                          <SelectItem value="Em andamento">Em andamento</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-right">
                      Tipo de atendimento *
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({...formData, type: value})}
                    >
                      <SelectTrigger id="type" className="border-semfas-primary/20">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {attendanceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="observations" className="text-right">
                      Observações
                    </Label>
                    <Textarea
                      id="observations"
                      value={formData.observations}
                      onChange={(e) => setFormData({...formData, observations: e.target.value})}
                      placeholder="Descreva as observações sobre o atendimento..."
                      className="border-semfas-primary/20 min-h-[100px]"
                    />
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleAddAttendance}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-[560px] grid-cols-3">
          <TabsTrigger value="all" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Todos
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="today" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Hoje
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Lista de atendimentos ({filteredAttendances.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAttendances.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-2 font-medium text-gray-500">Cidadão</th>
                        <th className="pb-2 font-medium text-gray-500">Data</th>
                        <th className="pb-2 font-medium text-gray-500">Tipo</th>
                        <th className="pb-2 font-medium text-gray-500">Status</th>
                        <th className="pb-2 font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendances.map((attendance) => (
                        <tr key={attendance.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-semfas-primary rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">
                                  {attendance.citizenName.substring(0, 1)}
                                </span>
                              </div>
                              {attendance.citizenName}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex flex-col">
                              <span>{formatDate(attendance.date)}</span>
                              <span className="text-xs text-gray-500">{formatTime(attendance.date)}</span>
                            </div>
                          </td>
                          <td className="py-3">{attendance.type}</td>
                          <td className="py-3">
                            <Badge 
                              className={`${statusColors[attendance.status]} border-none flex items-center`}
                              variant="outline"
                            >
                              {statusIcons[attendance.status]}
                              {attendance.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-semfas-primary"
                                    >
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ver detalhes</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-semfas-primary">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Editar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <Select
                                value={attendance.status}
                                onValueChange={(value: 'Aberto' | 'Em andamento' | 'Concluído') => 
                                  handleStatusChange(attendance.id, value)
                                }
                              >
                                <SelectTrigger className="h-8 w-[130px] border-semfas-primary/20 text-xs">
                                  <SelectValue placeholder="Mudar status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Aberto">Aberto</SelectItem>
                                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                                  <SelectItem value="Concluído">Concluído</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum atendimento encontrado com os filtros aplicados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Atendimentos pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Utilize os filtros para visualizar atendimentos pendentes.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Atendimentos de hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Utilize os filtros para visualizar atendimentos de hoje.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendances;
