const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'Monopoly')));
app.use(express.json());

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'Monopoly', 'Data_monopoly.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore durante la lettura del file JSON:', err);
      res.status(500).json({ error: 'Errore durante la lettura del file JSON' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/data', (req, res) => {
  const filePath = path.join(__dirname, 'Monopoly', 'Data_monopoly.json');
  const updatedData = req.body;

  fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8', (err) => {
    if (err) {
      console.error('Errore durante il salvataggio del file JSON:', err);
      res.status(500).json({ error: 'Errore durante il salvataggio del file JSON' });
    } else {
      console.log('File JSON salvato correttamente');
      res.json(updatedData);
    }
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});


/*const fs = require('fs');

app.post('/data', (req, res) => {
  const updatedData = req.body;

  // Salva il file JSON modificato
  fs.writeFile('Monopoly/Data_monopoly.json', JSON.stringify(updatedData), 'utf8', (err) => {
    if (err) {
      console.error('Errore durante il salvataggio del file JSON:', err);
      res.status(500).json({ error: 'Errore durante il salvataggio del file JSON' });
    } else {
      console.log('File JSON salvato correttamente');
      res.json(updatedData);
    }
  });
});*/