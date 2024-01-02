const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const processoRoutes = require('./routes/processoRoutes');
const reclamacaoRoutes = require('./routes/reclamacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/processo', processoRoutes);
app.use('/reclamacao', reclamacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 