const fs = require('fs');
const { join } = require('path');
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

function elementosTerminadosCom(padraoTextual) {
  return function (array) {
    return array.filter((elemento) => elemento.endsWith(padraoTextual));
  };
}

function lerArquivos(caminhos) {
  return Promise.all(caminhos.map((caminho) => lerArquivo(caminho)));
}

function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' });
      resolve(conteudo.toString());
    } catch (error) {
      reject(error);
    }
  });
}

function removerElementosSeVazio(array) {
  return array.filter((elemento) => elemento.trim());
}

function removerElementosSeIncluir(padraoTextual) {
  return function (array) {
    return array.filter((elemento) => !elemento.includes(padraoTextual));
  };
}

function removerElementosSeApenasNumero(array) {
  return array.filter((elemento) => {
    const numero = parseInt(elemento.trim());
    return numero !== numero;
  });
}

function removerSimbolos(simbolos) {
  return function (array) {
    return array.map((elemento) => {
      let textoSemSimbolos = elemento;
      simbolos.forEach((simbolo) => {
        textoSemSimbolos = textoSemSimbolos.split(simbolo).join('');
      });

      return textoSemSimbolos;
    });
  };
}

module.exports = {
  lerDiretorio,
  elementosTerminadosCom,
  lerArquivos,
  lerArquivo,
  removerElementosSeVazio,
  removerElementosSeIncluir,
  removerElementosSeApenasNumero,
  removerSimbolos,
};
