const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const Reclamacao = sequelize.define('Reclamacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING(255),
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'matricula',
    },
  },
  destino: {
    type: DataTypes.ENUM('etep', 'seac'),
  },
  status: {
    type: DataTypes.ENUM('deferida', 'indeferida', 'em_analise'),
    defaultValue: 'em_analise',
  },
}, {
  tableName: 'reclamacao',
});

Reclamacao.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

module.exports = Reclamacao;
