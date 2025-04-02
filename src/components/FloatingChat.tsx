import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'response', content: string}>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !message) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    setChatHistory(prev => [...prev, { type: 'user', content: message }]);
    
    try {
      const response = await fetch('https://n8n.jetsalesbrasil.com/webhook/b5959344-ebfb-4810-b749-b15da3e12b7a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        const responseMessage = data.message || JSON.stringify(data);
        setChatHistory(prev => [...prev, { type: 'response', content: responseMessage }]);
        
        toast({
          title: "Mensagem enviada",
          description: "Sua mensagem foi enviada com sucesso.",
        });
        
        setMessage('');
      } else {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
      
      setChatHistory(prev => [...prev, { 
        type: 'response', 
        content: error instanceof Error ? `Erro: ${error.message}` : "Erro ao enviar mensagem" 
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden border border-gray-200 transition-all">
          <div className="bg-semfas-primary text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Atendimento</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-semfas-primary/90">
              <X size={18} />
            </Button>
          </div>
          
          <div className="p-4 flex flex-col h-[400px]">
            {chatHistory.length === 0 ? (
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatHistory.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg max-w-[90%] ${
                      item.type === 'user' 
                        ? 'bg-semfas-primary text-white ml-auto' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.content}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message"
                  className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-semfas-primary text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-semfas-primary mt-2"
                disabled={isSending}
              >
                {isSending ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    Enviar mensagem
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button 
          onClick={toggleChat} 
          className="h-14 w-14 rounded-full bg-semfas-primary hover:bg-semfas-primary/90 shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
};

export default FloatingChat;
