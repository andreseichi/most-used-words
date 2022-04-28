const path = require('path');
const fn = require('./script');

const caminho = path.join(__dirname, '..', '..', 'dados', 'legendas');

fn.lerDiretorio(caminho).then(console.log);
