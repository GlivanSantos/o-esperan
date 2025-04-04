
// Arquivo de serviço em segundo plano (background service worker)
// Este script será executado em segundo plano enquanto a extensão estiver ativa

console.log('Background script iniciado');

// Escuta o evento de instalação da extensão
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extensão instalada:', details);
  
  // Define valores iniciais no armazenamento da extensão
  chrome.storage.local.set({
    isInitialized: true,
    lastLogin: null,
    settings: {
      notificationsEnabled: true,
      theme: 'light'
    }
  });
});

// Escuta mensagens de outros scripts da extensão
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Mensagem recebida no background:', message);
  
  // Processa diferentes tipos de mensagens
  if (message.type === 'LOGIN_USER') {
    // Simula autenticação ou armazenamento de credenciais
    chrome.storage.local.set({ 
      lastLogin: new Date().toISOString(),
      currentUser: message.data
    });
    sendResponse({ success: true });
  }
  
  // Retorna true para indicar que a resposta será enviada de forma assíncrona
  return true;
});

// Mantém o serviço ativo
chrome.alarms.create('keepAlive', { periodInMinutes: 20 });
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('Alarm triggered:', alarm.name);
});

export {};
