
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { HelpCircle, Lock, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Recuperação de senha",
      description: "Envie um e-mail para suporte@semfas.com para recuperar sua senha.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-semfas-light p-4">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="w-12 h-12 bg-semfas-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">PSC</span>
        </div>
        <div>
          <h1 className="text-semfas-primary font-bold text-xl">Prontuário Social do Cidadão</h1>
          <p className="text-sm text-semfas-dark/70">SEMFAS Nova Esperança</p>
        </div>
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-semfas-primary/10">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-semfas-primary">Login</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-semfas-primary">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Entre com suas credenciais para acessar o sistema</p>
                  <p className="text-xs mt-1">Para teste, use:</p>
                  <p className="text-xs">Email: teste@teste.com</p>
                  <p className="text-xs">Senha: 123456</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Acesse o sistema de gerenciamento de assistência social
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-semfas-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-semfas-primary/20"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-semfas-primary hover:bg-semfas-primary/90" 
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-semfas-primary hover:text-semfas-primary/80"
              onClick={handleForgotPassword}
            >
              Esqueceu sua senha?
            </Button>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-semfas-primary/70">
                <span className="rounded-full bg-semfas-primary/10 px-2 py-1 text-xs">Dados Protegidos - LGPD</span>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <footer className="absolute bottom-4 text-center text-xs text-semfas-dark/70 w-full px-4">
        SEMFAS Nova Esperança - Rua da Solidariedade, 100 - Contato: (11) 5555-1234 - suporte@semfas.com
      </footer>
    </div>
  );
};

export default Login;
