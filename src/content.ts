
// Script de conteúdo (content script)
// Este script é injetado nas páginas web que correspondem aos padrões definidos no manifest.json

console.log('SEMFAS - Content script carregado');

// Função para verificar se a página atual está relacionada a serviços sociais
function checkPageContent() {
  const pageText = document.body.innerText.toLowerCase();
  
  // Verifica se a página contém palavras-chave relacionadas a assistência social
  const keywords = ['assistência social', 'cras', 'creas', 'bolsa família', 'cadastro único', 'cadunico'];
  const isRelevantPage = keywords.some(keyword => pageText.includes(keyword.toLowerCase()));
  
  if (isRelevantPage) {
    console.log('Página relevante para assistência social detectada');
    
    // Notifica o script de plano de fundo
    chrome.runtime.sendMessage({
      type: 'RELEVANT_PAGE_FOUND',
      data: {
        url: window.location.href,
        title: document.title
      }
    });
    
    // Opcional: insere um widget na página para acesso rápido ao PSC
    insertPSCWidget();
  }
}

// Função para inserir um widget SEMFAS na página
function insertPSCWidget() {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'semfas-psc-widget';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.bottom = '20px';
  widgetContainer.style.right = '20px';
  widgetContainer.style.backgroundColor = '#1e3a8a'; // cor semfas-primary
  widgetContainer.style.color = '#ffffff';
  widgetContainer.style.padding = '12px';
  widgetContainer.style.borderRadius = '8px';
  widgetContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  widgetContainer.style.zIndex = '9999';
  
  widgetContainer.innerHTML = `
    <p style="margin: 0 0 8px 0; font-weight: bold;">PSC - SEMFAS Aracaju</p>
    <button id="open-psc-extension" style="background-color: white; color: #1e3a8a; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
      Consultar Prontuário
    </button>
  `;
  
  document.body.appendChild(widgetContainer);
  
  // Adiciona evento para abrir o popup da extensão
  document.getElementById('open-psc-extension')?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
  });
}

// Executa verificação quando a página estiver completamente carregada
window.addEventListener('load', checkPageContent);

// Escuta mensagens do script de plano de fundo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Mensagem recebida no content script:', message);
  
  if (message.type === 'INJECT_DATA') {
    // Exemplo: preencher um formulário na página com dados do PSC
    const formFields = document.querySelectorAll('input, select, textarea');
    if (formFields.length > 0 && message.data) {
      // Preenche campos do formulário baseado nos dados enviados
      console.log('Preenchendo dados no formulário...');
    }
    
    sendResponse({ success: true });
  }
  
  return true;
});

export {};
