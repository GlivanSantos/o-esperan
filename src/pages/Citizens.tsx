
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
  UserPlus, 
  HelpCircle, 
  Filter, 
  Download, 
  FileText, 
  Pencil, 
  Trash2, 
  Calendar,
  Upload,
  AlertTriangle
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
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Citizen {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  address: string;
  economicStatus: string;
  specificNeeds: string;
  status: string;
}

const Citizens = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [economicFilter, setEconomicFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    address: '',
    economicStatus: '',
    specificNeeds: '',
  });
  
  // Mock data
  const citizens: Citizen[] = [
    {
      id: '1',
      name: 'João Silva Pereira',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15',
      address: 'Rua das Flores, 123, Bairro Centro, Nova Esperança - SP',
      economicStatus: 'Baixa renda',
      specificNeeds: 'Apoio alimentar e psicológico',
      status: 'Ativo',
    },
    {
      id: '2',
      name: 'Maria Oliveira Santos',
      cpf: '987.654.321-00',
      birthDate: '1990-05-20',
      address: 'Av. Principal, 456, Bairro Jardim Primavera, Nova Esperança - SP',
      economicStatus: 'Média renda',
      specificNeeds: 'Assistência médica para filho com deficiência',
      status: 'Ativo',
    },
    {
      id: '3',
      name: 'Ana Beatriz Costa',
      cpf: '456.789.123-00',
      birthDate: '1978-10-10',
      address: 'Travessa das Árvores, 78, Bairro Nova Vista, Nova Esperança - SP',
      economicStatus: 'Baixa renda',
      specificNeeds: 'Apoio para regularização de documentos e habitação',
      status: 'Inativo',
    },
    {
      id: '4',
      name: 'Carlos Eduardo Lima',
      cpf: '789.123.456-00',
      birthDate: '1965-12-05',
      address: 'Rua dos Ipês, 890, Bairro Jardim Primavera, Nova Esperança - SP',
      economicStatus: 'Alta renda',
      specificNeeds: 'Acompanhamento psicológico para depressão',
      status: 'Ativo',
    },
    {
      id: '5',
      name: 'Luciana Ferreira Dias',
      cpf: '321.654.987-00',
      birthDate: '1992-07-25',
      address: 'Alameda Central, 45, Bairro Centro, Nova Esperança - SP',
      economicStatus: 'Baixa renda',
      specificNeeds: 'Apoio para vagas em creche e cestas básicas',
      status: 'Ativo',
    },
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };
  
  const filteredCitizens = citizens.filter(citizen => {
    const matchesSearch = citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          citizen.cpf.includes(searchTerm);
    
    const matchesEconomic = economicFilter === 'all' || 
                            citizen.economicStatus.toLowerCase() === economicFilter.toLowerCase();
    
    return matchesSearch && matchesEconomic;
  });
  
  const handleAddCitizen = () => {
    // Validate form
    if (!formData.name || !formData.cpf || !formData.birthDate || !formData.address || !formData.economicStatus) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Add citizen logic would go here in a real application
    toast({
      title: "Cidadão cadastrado",
      description: `${formData.name} foi cadastrado com sucesso!`,
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      cpf: '',
      birthDate: '',
      address: '',
      economicStatus: '',
      specificNeeds: '',
    });
    setIsAddDialogOpen(false);
  };
  
  const handleViewDetails = (id: string) => {
    const citizen = citizens.find(c => c.id === id);
    if (citizen) {
      // In a real application, this would navigate to a details page
      toast({
        title: "Detalhes do cidadão",
        description: `Visualizando detalhes de ${citizen.name}`,
      });
    }
  };
  
  const handleHelpClick = () => {
    toast({
      title: "Ajuda - Cadastro de Cidadãos",
      description: "Utilize este módulo para gerenciar os cadastros dos cidadãos atendidos pela SEMFAS.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">Cidadãos</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                <HelpCircle className="h-5 w-5 text-semfas-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajuda - Módulo de Cidadãos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Action bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por nome ou CPF..."
            className="pl-8 border-semfas-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={economicFilter} onValueChange={setEconomicFilter}>
            <SelectTrigger className="w-[180px] border-semfas-primary/20">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="baixa renda">Baixa renda</SelectItem>
              <SelectItem value="média renda">Média renda</SelectItem>
              <SelectItem value="alta renda">Alta renda</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-semfas-primary/20 text-semfas-primary">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-semfas-primary hover:bg-semfas-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Cidadão
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-semfas-primary">Cadastrar Novo Cidadão</DialogTitle>
                <DialogDescription>
                  Preencha os dados do cidadão. Campos com * são obrigatórios.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="grid gap-4 py-4 px-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-right">
                        Nome completo *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-semfas-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-right">
                        CPF *
                      </Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        placeholder="000.000.000-00"
                        className="border-semfas-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="text-right">
                        Data de Nascimento *
                      </Label>
                      <div className="flex">
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
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
                              <p>Selecione a data de nascimento</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="economicStatus" className="text-right">
                        Situação socioeconômica *
                      </Label>
                      <Select
                        value={formData.economicStatus}
                        onValueChange={(value) => setFormData({...formData, economicStatus: value})}
                      >
                        <SelectTrigger id="economicStatus" className="border-semfas-primary/20">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Baixa renda">Baixa renda</SelectItem>
                          <SelectItem value="Média renda">Média renda</SelectItem>
                          <SelectItem value="Alta renda">Alta renda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-right">
                      Endereço completo *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Rua, número, bairro, cidade - UF"
                      className="border-semfas-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specificNeeds" className="text-right">
                      Necessidades específicas
                    </Label>
                    <Textarea
                      id="specificNeeds"
                      value={formData.specificNeeds}
                      onChange={(e) => setFormData({...formData, specificNeeds: e.target.value})}
                      placeholder="Descreva as necessidades específicas do cidadão..."
                      className="border-semfas-primary/20 min-h-[100px]"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-right">
                      Anexar documentos
                    </Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Arraste e solte arquivos aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-semfas-light rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-semfas-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Ao cadastrar o cidadão, você confirma que possui autorização para armazenar e processar
                      seus dados pessoais, conforme a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleAddCitizen}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="all" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Todos os cidadãos
          </TabsTrigger>
          <TabsTrigger value="priority" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            Casos prioritários
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Lista de cidadãos ({filteredCitizens.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredCitizens.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-2 font-medium text-gray-500">Nome</th>
                        <th className="pb-2 font-medium text-gray-500">CPF</th>
                        <th className="pb-2 font-medium text-gray-500">Data Nasc.</th>
                        <th className="pb-2 font-medium text-gray-500">Situação</th>
                        <th className="pb-2 font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCitizens.map((citizen) => (
                        <tr key={citizen.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3">{citizen.name}</td>
                          <td className="py-3">{citizen.cpf}</td>
                          <td className="py-3">{formatDate(citizen.birthDate)}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              citizen.economicStatus === 'Baixa renda' 
                                ? 'bg-red-100 text-red-800' 
                                : citizen.economicStatus === 'Média renda'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {citizen.economicStatus}
                            </span>
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
                                      onClick={() => handleViewDetails(citizen.id)}
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
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-semfas-accent">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Excluir</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum cidadão encontrado com os filtros aplicados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="priority" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Casos prioritários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum caso prioritário no momento.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Citizens;
