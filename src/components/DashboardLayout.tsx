
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  HelpCircle, 
  ChevronDown
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Cidadãos', path: '/cidadaos', icon: <Users size={20} /> },
    { name: 'Atendimentos', path: '/atendimentos', icon: <FileText size={20} /> },
    { name: 'Relatórios', path: '/relatorios', icon: <BarChart3 size={20} /> },
    { name: 'Configurações', path: '/configuracoes', icon: <Settings size={20} /> },
  ];

  const handleHelp = () => {
    toast({
      title: "Ajuda",
      description: "Clique nos itens do menu para navegar pelo sistema. Para mais informações, contate o suporte.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-semfas-primary transition-all duration-300 ease-in-out flex flex-col z-10 fixed md:relative h-full`}
      >
        <div className="flex items-center justify-between p-4">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-semfas-primary font-bold text-sm">PSC</span>
              </div>
              <span className="text-white font-semibold">Prontuário Social</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto">
              <span className="text-semfas-primary font-bold text-sm">PSC</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-semfas-primary/90"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        <Separator className="bg-white/20" />
        
        <div className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <TooltipProvider key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        location.pathname === item.path 
                          ? 'bg-white text-semfas-primary hover:bg-white/90 hover:text-semfas-primary' 
                          : 'text-white hover:bg-white/10'
                      } ${sidebarOpen ? '' : 'justify-center'}`}
                    >
                      {item.icon}
                      {sidebarOpen && <span className="ml-2">{item.name}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <Separator className="bg-white/20" />
        
        <div className="p-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={logout}
                >
                  <LogOut size={20} />
                  {sidebarOpen && <span className="ml-2">Sair</span>}
                </Button>
              </TooltipTrigger>
              {!sidebarOpen && (
                <TooltipContent side="right">
                  <p>Sair</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </Button>
            <h1 className="text-semfas-primary font-semibold text-lg">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleHelp}
                    className="text-semfas-primary"
                  >
                    <HelpCircle size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Precisa de ajuda?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-semfas-primary">
                  <div className="w-8 h-8 bg-semfas-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.substring(0, 1) || 'U'}
                    </span>
                  </div>
                  {user?.name && (
                    <span className="hidden md:inline text-sm max-w-[120px] truncate">
                      {user.name}
                    </span>
                  )}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                  <Settings size={16} className="mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut size={16} className="mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white p-3 text-center border-t text-xs text-gray-500">
          SEMFAS Nova Esperança - Rua da Solidariedade, 100 - Contato: (11) 5555-1234 - suporte@semfas.com
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
