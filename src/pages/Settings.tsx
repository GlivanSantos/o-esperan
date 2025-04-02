
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, 
  User, 
  Lock, 
  Shield, 
  Bell, 
  Smartphone, 
  Save, 
  LogOut,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Settings = () => {
  const { user, logout } = useAuth();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isMobileAccessEnabled, setIsMobileAccessEnabled] = useState(true);
  const [isAuditLogEnabled, setIsAuditLogEnabled] = useState(true);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso!",
    });
  };
  
  const handleToggle2FA = () => {
    if (!is2FAEnabled) {
      // Open 2FA setup modal
      setIs2FAModalOpen(true);
    } else {
      // Disable 2FA
      setIs2FAEnabled(false);
      toast({
        title: "Autenticação de dois fatores desativada",
        description: "A autenticação de dois fatores foi desativada com sucesso.",
      });
    }
  };
  
  const handleConfirm2FA = () => {
    // Check if verification code is valid (mock validation)
    if (verificationCode === '123456') {
      setIs2FAEnabled(true);
      setIs2FAModalOpen(false);
      setVerificationCode('');
      toast({
        title: "Autenticação de dois fatores ativada",
        description: "A autenticação de dois fatores foi ativada com sucesso!",
      });
    } else {
      toast({
        title: "Código inválido",
        description: "O código de verificação informado é inválido. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const handleHelpClick = () => {
    toast({
      title: "Ajuda - Configurações",
      description: "Utilize este módulo para gerenciar suas configurações de perfil e segurança.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-semfas-primary">Configurações</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                <HelpCircle className="h-5 w-5 text-semfas-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajuda - Configurações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-4">
          <TabsTrigger value="profile" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-semfas-primary data-[state=active]:text-white">
            <Smartphone className="mr-2 h-4 w-4" />
            Acesso
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-semfas-primary">Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Nome completo</Label>
                    <Input id="full-name" defaultValue={user?.name || ""} className="border-semfas-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} className="border-semfas-primary/20" readOnly />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input id="role" defaultValue={user?.role || "Assistente Social"} className="border-semfas-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 98765-4321" className="border-semfas-primary/20" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea 
                    id="bio" 
                    className="min-h-[120px] border-semfas-primary/20"
                    placeholder="Conte um pouco sobre você e sua experiência..."
                    defaultValue="Assistente social com experiência em atendimento a famílias em situação de vulnerabilidade."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar alterações
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-semfas-primary">Foto do perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-4xl bg-semfas-primary text-white">
                        {user?.name?.substring(0, 1) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        Alterar foto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-semfas-light border-semfas-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-semfas-primary/10 rounded-full">
                      <Info className="h-5 w-5 text-semfas-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-semfas-primary mb-1">Informação</h3>
                      <p className="text-sm text-gray-600">
                        Mantenha suas informações atualizadas para facilitar a comunicação com os cidadãos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-semfas-primary">Alterar Senha</CardTitle>
                <CardDescription>
                  Atualize sua senha de acesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input id="current-password" type="password" className="border-semfas-primary/20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input id="new-password" type="password" className="border-semfas-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input id="confirm-password" type="password" className="border-semfas-primary/20" />
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mt-2">
                  <p>A senha deve conter:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Pelo menos 8 caracteres</li>
                    <li>Letras maiúsculas e minúsculas</li>
                    <li>Pelo menos um número</li>
                    <li>Pelo menos um caractere especial</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleChangePassword}>
                  <Save className="mr-2 h-4 w-4" />
                  Alterar senha
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-semfas-primary">Segurança da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Autenticação de dois fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        {is2FAEnabled ? 'Ativada' : 'Desativada'}
                      </p>
                    </div>
                    <Switch
                      checked={is2FAEnabled}
                      onCheckedChange={handleToggle2FA}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Registro de atividades</Label>
                      <p className="text-sm text-muted-foreground">
                        Registrar todas as ações no sistema
                      </p>
                    </div>
                    <Switch
                      checked={isAuditLogEnabled}
                      onCheckedChange={setIsAuditLogEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Button variant="outline" className="w-full text-semfas-accent" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-semfas-light border-semfas-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-semfas-primary/10 rounded-full">
                      <Shield className="h-5 w-5 text-semfas-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-semfas-primary mb-1">Dados Protegidos - LGPD</h3>
                      <p className="text-sm text-gray-600">
                        Seus dados estão protegidos de acordo com a Lei Geral de Proteção de Dados (LGPD).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* 2FA Setup Modal */}
          <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-semfas-primary">Configurar autenticação de dois fatores</DialogTitle>
                <DialogDescription>
                  Para maior segurança, configure a autenticação de dois fatores para sua conta.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>
                    Escanear o QR code
                  </Label>
                  <div className="bg-white p-4 rounded-md border flex items-center justify-center">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">QR Code simulado para demonstração</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Escaneie este QR code com um aplicativo de autenticação como Google Authenticator ou Microsoft Authenticator.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verification-code">
                    Código de verificação
                  </Label>
                  <Input
                    id="verification-code"
                    placeholder="Digite o código de 6 dígitos"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border-semfas-primary/20"
                  />
                  <p className="text-xs text-gray-500">
                    Para teste, use o código 123456
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIs2FAModalOpen(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button className="bg-semfas-primary hover:bg-semfas-primary/90" onClick={handleConfirm2FA}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-semfas-primary">Preferências de Notificações</CardTitle>
              <CardDescription>
                Gerencie como você recebe notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações por e-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações por e-mail
                  </p>
                </div>
                <Switch
                  checked={isNotificationsEnabled}
                  onCheckedChange={setIsNotificationsEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Atendimentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações sobre novos atendimentos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Casos prioritários</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas sobre casos prioritários
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Atualizações do sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações sobre atualizações do sistema
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-semfas-primary hover:bg-semfas-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Salvar preferências
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Access Tab */}
        <TabsContent value="access" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-semfas-primary">Acesso ao Sistema</CardTitle>
              <CardDescription>
                Gerencie suas opções de acesso ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Acesso via dispositivos móveis</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir acesso ao sistema via smartphones e tablets
                  </p>
                </div>
                <Switch
                  checked={isMobileAccessEnabled}
                  onCheckedChange={setIsMobileAccessEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Sessões ativas</Label>
                  <p className="text-sm text-muted-foreground">
                    Gerenciar suas sessões ativas no sistema
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver sessões
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Histórico de acessos</Label>
                  <p className="text-sm text-muted-foreground">
                    Visualizar seu histórico de acessos ao sistema
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver histórico
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-base">Último acesso</Label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Hoje, {new Date().toLocaleTimeString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">IP: 192.168.1.1 • Navegador: Chrome</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Atual
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-semfas-primary hover:bg-semfas-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Salvar preferências
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
