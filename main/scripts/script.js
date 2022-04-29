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
      return simbolos.reduce((acumulador, simbolo) => {
        return acumulador.split(simbolo).join('');
      }, elemento);
    });
  };
}

function mesclarElementos(array) {
  return array.join(' ');
}

function separarTextoPor(simbolo) {
  return function (texto) {
    return texto.split(simbolo);
  };
}

function agruparElementos(palavras) {
  return Object.values(
    palavras.reduce((palavrasAgrupadas, palavra) => {
      const elemento = palavra.toLowerCase();
      const quantidade = palavrasAgrupadas[elemento]
        ? palavrasAgrupadas[elemento].quantidade + 1
        : 1;
      palavrasAgrupadas[elemento] = { elemento, quantidade };

      return palavrasAgrupadas;
    }, {})
  );
}

function ordernarPorAtributoNumerico(atributo, ordem = 'ascendente') {
  return function (array) {
    const descendente = (objeto1, objeto2) =>
      objeto2[atributo] - objeto1[atributo];
    const ascendente = (objeto1, objeto2) =>
      objeto1[atributo] - objeto2[atributo];

    return array.sort(ordem === 'ascendente' ? ascendente : descendente);
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
  mesclarElementos,
  separarTextoPor,
  agruparElementos,
  ordernarPorAtributoNumerico,
};
