const fs = require('fs');

fs.stat('novoarquivo.txt', (err, status) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(status.isFile());
    console.log(status.isDirectory());
    console.log(status.isSymbolicLink());
    console.log(status.ctime);
    console.log(status.size);
});