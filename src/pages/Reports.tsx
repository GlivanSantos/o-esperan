
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  HelpCircle, 
  Download, 
  BarChart3, 
  Calendar,
  PieChart,
  Users,
  FileText,
  MapPin
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface ReportPeriod {
  label: string;
  value: string;
}

interface ReportType {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const Reports = () => {
  const [reportType, setReportType] = useState<string>('citizens-by-district');
  const [reportPeriod, setReportPeriod] = useState<string>('last-month');
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  
  // Mock report periods
  const reportPeriods: ReportPeriod[] = [
    { label: 'Último mês', value: 'last-month' },
    { label: 'Último trimestre', value: 'last-quarter' },
    { label: 'Último semestre', value: 'last-semester' },
    { label: 'Último ano', value: 'last-year' },
    { label: 'Personalizado', value: 'custom' },
  ];
  
  // Mock report types
  const reportTypes: ReportType[] = [
    { 
      label: 'Cidadãos por bairro', 
      value: 'citizens-by-district', 
      icon: <MapPin className="h-5 w-5" />,
      description: 'Distribuição de cidadãos cadastrados por bairro'
    },
    { 
      label: 'Atendimentos por tipo', 
      value: 'attendances-by-type', 
      icon: <FileText className="h-5 w-5" />,
      description: 'Quantidade de atendimentos por tipo'
    },
    { 
      label: 'Status dos atendimentos', 
      value: 'attendance-status', 
      icon: <PieChart className="h-5 w-5" />,
      description: 'Distribuição dos atendimentos por status'
    },
    { 
      label: 'Situação socioeconômica', 
      value: 'economic-status', 
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Distribuição dos cidadãos por situação socioeconômica'
    },
  ];
  
  // Mock export formats
  const exportFormats = [
    { label: 'PDF', value: 'pdf' },
    { label: 'Excel', value: 'excel' },
    { label: 'CSV', value: 'csv' },
  ];
  
  // Mock data for reports
  const citizensByDistrict = [
    { name: 'Centro', value: 4500 },
    { name: 'Jardim Primavera', value: 3200 },
    { name: 'Nova Vista', value: 2800 },
    { name: 'Vila Esperança', value: 1900 },
    { name: 'Parque Industrial', value: 950 },
  ];
  
  const attendancesByType = [
    { name: 'Visita domiciliar', value: 420 },
    { name: 'Encaminhamento médico', value: 310 },
    { name: 'Avaliação socioeconômica', value: 280 },
    { name: 'Acompanhamento psicológico', value: 190 },
    { name: 'Entrega de benefícios', value: 150 },
    { name: 'Orientação jurídica', value: 90 },
  ];
  
  const attendanceStatus = [
    { name: 'Concluído', value: 85 },
    { name: 'Em andamento', value: 10 },
    { name: 'Aberto', value: 5 },
  ];
  
  const economicStatus = [
    { name: 'Baixa renda', value: 65 },
    { name: 'Média renda', value: 30 },
    { name: 'Alta renda', value: 5 },
  ];
  
  // Colors for charts
  const COLORS = ['#003087', '#FFC107', '#4caf50', '#2196f3', '#ff9800', '#ff6b6b'];
  const STATUS_COLORS = {
    'Concluído': '#4caf50',
    'Em andamento': '#ff9800',
    'Aberto': '#2196f3',
  };
  const ECONOMIC_COLORS = {
    'Baixa renda': '#ff6b6b',
    'Média renda': '#ff9800',
    'Alta renda': '#4caf50',
  };
  
  const handleExportReport = () => {
    toast({
      title: "Exportando relatório",
      description: `O relatório será exportado em formato ${exportFormat.toUpperCase()}.`,
    });
  };
  
  const handleHelpClick = () => {
    toast({
      title: "Ajuda - Módulo de Relatórios",
      description: "Utilize este módulo para gerar relatórios personalizados sobre cidadãos e atendimentos.",
    });
  };
  
  const handlePrintReport = () => {
    toast({
      title: "Impressão de relatório",
      description: "Preparando relatório para impressão.",
    });
  };
  
  const renderReport = () => {
    switch (reportType) {
      case 'citizens-by-district':
        return (
          <div className="mt-4 h-[400px]">
            <h3 className="text-xl font-semibold text-semfas-primary mb-4">
              Distribuição de Cidadãos por Bairro
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={citizensByDistrict}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value) => [`${value} cidadãos`, 'Quantidade']} />
                <Legend />
                <Bar dataKey="value" name="Cidadãos" fill="#003087" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total de cidadãos</p>
                      <h3 className="text-2xl font-bold text-semfas-primary mt-1">
                        {citizensByDistrict.reduce((sum, item) => sum + item.value, 0).toLocaleString('pt-BR')}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-semfas-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-semfas-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bairro com mais cidadãos</p>
                      <h3 className="text-xl font-bold text-semfas-primary mt-1">
                        {citizensByDistrict.sort((a, b) => b.value - a.value)[0].name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-semfas-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-semfas-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'attendances-by-type':
        return (
          <div className="mt-4 h-[400px]">
            <h3 className="text-xl font-semibold text-semfas-primary mb-4">
              Atendimentos por Tipo
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendancesByType}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <RechartsTooltip formatter={(value) => [`${value} atendimentos`, 'Quantidade']} />
                <Legend />
                <Bar dataKey="value" name="Atendimentos" fill="#FFC107" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total de atendimentos</p>
                      <h3 className="text-2xl font-bold text-semfas-primary mt-1">
                        {attendancesByType.reduce((sum, item) => sum + item.value, 0).toLocaleString('pt-BR')}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-semfas-secondary/20 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-semfas-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tipo mais frequente</p>
                      <h3 className="text-xl font-bold text-semfas-primary mt-1">
                        {attendancesByType.sort((a, b) => b.value - a.value)[0].name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-semfas-secondary/20 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-semfas-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'attendance-status':
        return (
          <div className="mt-4 h-[400px]">
            <h3 className="text-xl font-semibold text-semfas-primary mb-4">
              Status dos Atendimentos
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentual']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <Card className="mt-4 bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Percentual de atendimentos concluídos</p>
                    <h3 className="text-2xl font-bold text-green-600 mt-1">
                      {attendanceStatus.find(status => status.name === 'Concluído')?.value}%
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'economic-status':
        return (
          <div className="mt-4 h-[400px]">
            <h3 className="text-xl font-semibold text-semfas-primary mb-4">
              Situação Socioeconômica dos Cidadãos
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={economicStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {economicStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={ECONOMIC_COLORS[entry.name as keyof typeof ECONOMIC_COLORS] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentual']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {economicStatus.map((status, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{status.name}</p>
                        <h3 className="text-2xl font-bold mt-1" style={{ color: ECONOMIC_COLORS[status.name as keyof typeof ECONOMIC_COLORS] }}>
                          {status.value}%
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: `${ECONOMIC_COLORS[status.name as keyof typeof ECONOMIC_COLORS]}20` }}>
                        <Users className="h-5 w-5" style={{ color: ECONOMIC_COLORS[status.name as keyof typeof ECONOMIC_COLORS] }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">Relatórios</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                <HelpCircle className="h-5 w-5 text-semfas-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajuda - Módulo de Relatórios</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Report configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-semfas-primary">Configurar Relatório</CardTitle>
          <CardDescription>
            Selecione o tipo de relatório e o período para análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="report-type">
                Tipo de relatório
              </Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type" className="border-semfas-primary/20">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        {type.icon}
                        <span className="ml-2">{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-period">
                Período
              </Label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger id="report-period" className="border-semfas-primary/20">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  {reportPeriods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {reportPeriod === 'custom' && (
              <div className="space-y-2">
                <Label>
                  Intervalo personalizado
                </Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input type="date" className="border-semfas-primary/20" />
                  </div>
                  <div className="flex-1">
                    <Input type="date" className="border-semfas-primary/20" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="export-format">
                Formato de exportação
              </Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="export-format" className="border-semfas-primary/20">
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>{format.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between flex-wrap gap-2">
          <div className="text-sm text-gray-500">
            <span className="rounded-full bg-semfas-primary/10 px-2 py-1 text-xs text-semfas-primary mr-2">
              Dados fictícios para demonstração
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrintReport}>
              <Download className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Report content */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {reportTypes.find(type => type.value === reportType)?.label || 'Relatório'}
          </CardTitle>
          <CardDescription>
            {reportTypes.find(type => type.value === reportType)?.description || 'Visualização do relatório'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderReport()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
