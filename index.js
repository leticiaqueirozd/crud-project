const express = require('express');
const { swaggerUi, specs } = require('./swagger/swagger');
const studentsRoutes = require('./routes/students');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/students', studentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
