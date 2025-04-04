
import fs from 'fs-extra';
import path from 'path';

// Função para copiar o manifesto e outros arquivos estáticos para a pasta dist
async function prepareExtension() {
  try {
    // Certifica-se de que o diretório dist existe
    await fs.ensureDir('dist');
    
    // Copia o manifesto para a pasta dist
    await fs.copy('manifest.json', 'dist/manifest.json');
    
    // Copia os ícones para a pasta dist
    await fs.copy('public/icons', 'dist/icons');
    
    console.log('✅ Arquivos da extensão preparados com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao preparar arquivos da extensão:', err);
    process.exit(1);
  }
}

// Executa o processo de preparação
prepareExtension();
