const fs = require('fs');

const arqAntigo = 'mnovo.txt';
const arqNovo = 'novo.txt';

fs.rename(arqAntigo, arqNovo, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Arquivo renomeado!');
});