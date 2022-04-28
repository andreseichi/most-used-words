const fs = require('fs');
const path = require('path');

function lerDiretorio(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const arquivos = fs.readdirSync(caminho);
      const caminhoArquivos = arquivos.map((arquivo) => {
        return path.join(caminho, arquivo);
      });

      resolve(caminhoArquivos);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  lerDiretorio,
};
