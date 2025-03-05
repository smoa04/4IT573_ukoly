// Import fs modulu
import fs from 'fs'

// Načtení souboru instrukce.txt
fs.readFile('instrukce.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Soubor instrukce.txt nenalezen!');
        return;
    }

    // Vytáhne názvy textových souborů z řetezce
    const lines = data.split('\n');
    const sourceFile = lines[0].split(':')[1].trim();
    const targetFile = lines[1].split(':')[1].trim();


        // Načtení obsahu zdrojového souboru
        fs.readFile(sourceFile, 'utf8', (err, content) => {
            if (err) {
                console.error(`Chyba při čtení ze souboru ${sourceFile}`);
                return;
            }

        // Zkopíruje obsah do cílového souboru (vytvoří, pokud neexistuje)
            fs.writeFile(targetFile, content, (err) => {
            if (err) {
                    console.error(`Chyba při zápisu do souboru ${targetFile}`);
                    return;
            }
                console.log(`Obsah zkopírován do výstupního souboru ${targetFile}`);

            });
        });
    });
