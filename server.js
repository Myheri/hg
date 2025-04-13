const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const db = new sqlite3.Database('./database.db');

app.use(express.json());
app.use(express.static('public'));

// Criação da tabela
db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  data TEXT,
  hora TEXT
)`);

// Rota de agendamento
app.post('/agendar', (req, res) => {
  const { nome, data, hora } = req.body;

  db.get(`SELECT * FROM agendamentos WHERE data = ? AND hora = ?`, [data, hora], (err, row) => {
    if (row) {
      return res.json({ ok: false, mensagem: 'Este horário já está agendado!' });
    } else {
      db.run(`INSERT INTO agendamentos (nome, data, hora) VALUES (?, ?, ?)`, [nome, data, hora], (err) => {
        if (err) {
          return res.json({ ok: false, mensagem: 'Erro ao agendar!' });
        }
        return res.json({ ok: true });
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
