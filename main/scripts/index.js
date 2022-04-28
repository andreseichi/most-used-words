const path = require('path');
const fn = require('./script');

const caminho = path.join(__dirname, '..', '..', 'dados', 'legendas');

const simbolos = [
  '.',
  '?',
  '-',
  ',',
  '"',
  '♪',
  '_',
  '<i>',
  '</i>',
  '\r',
  '[',
  ']',
  '(',
  ')',
  '=',
];

fn.lerDiretorio(caminho)
  .then(fn.elementosTerminadosCom('.srt'))
  .then(fn.lerArquivos)
  .then((conteudoString) => conteudoString.join('\n'))
  .then((todoConteudoString) => todoConteudoString.split('\n'))
  .then(fn.removerElementosSeVazio)
  .then(fn.removerElementosSeIncluir('-->'))
  .then(fn.removerElementosSeApenasNumero)
  .then(fn.removerSimbolos(simbolos))
  .then(console.log);
