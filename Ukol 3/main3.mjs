import http from 'http';
import fs from 'fs/promises';
const filePath = 'counter.txt';

// Načtení aktuální hodnoty z counter.txt, nebo inicializace na 0
const counterValue = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return parseInt(data, 10) || 0;
    } catch {
        await fs.writeFile(filePath, '0');
        return 0;
    }
};

// Uložení nové hodnoty
const setCounterValue = async (value) => {
    try {
        await fs.writeFile(filePath, value.toString());
        console.log(`Hodnota ${value} byla úspěšně uložena do souboru.`);
    } catch (err) {
        console.error('Chyba při zápisu do souboru:', err.message);
    }
};

// Funkce pro zvýšení nebo snížení hodnoty
const modifyCounter = async (modifier, res) => {
    try {
        let value = await counterValue();
        value = value + modifier; // Zvýšení (+1) nebo snížení (-1)
        await setCounterValue(value);
        res.end('OK');
    } catch (err) {
        res.end('Server Error');
    }
};

// Vytvoření serveru
const server = http.createServer(async (req, res) => {
    if (req.url === '/increase') {
        await modifyCounter(1, res); // Zvýšení (+1)
    } else if (req.url === '/decrease') {
        await modifyCounter(-1, res); // Snížení (-1)
    } else if (req.url === '/read') {
        try {
            const value = await counterValue();
            res.end(value.toString()); // Vrácení aktuální hodnoty
        } catch {
            res.end('Server Error');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Spuštění serveru na portu 3000
server.listen(3000, () => {
    console.log('Server běží na http://localhost:3000');
});
