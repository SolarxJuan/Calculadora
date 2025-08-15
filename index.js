const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calcular', (req, res) => {
  const { num1, num2, operacion } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'num1 y num2 deben ser números' });
  }

  let resultado;
  switch (operacion) {
    case 'sumar':
      resultado = num1 + num2;
      break;
    case 'restar':
      resultado = num1 - num2;
      break;
    case 'multiplicar':
      resultado = num1 * num2;
      break;
    case 'dividir':
      if (num2 === 0) return res.status(400).json({ error: 'No se puede dividir entre 0' });
      resultado = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Operación no válida' });
  }

  res.json({ resultado });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});