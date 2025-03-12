import fs from 'fs';

// readFile
function readFile(path, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// writeFile
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Hlavní funkce
readFile('instrukce.txt', 'utf8')
    .then(data => {
        const n = parseInt(data.trim());
        const promises = [];

        // Vytvoření souborů paralelně
        for (let i = 0; i <= n; i++) {
            promises.push(writeFile(`${i}.txt`, `Soubor ${i}`));
        }

        return Promise.all(promises);
    })
    .then(() => {
        console.log('Všechny soubory byly úspěšně vytvořeny.');
    })
    .catch(err => {
        console.error('Chyba při vytváření nebo zápisu souborů:', err);
    });

