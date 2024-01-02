const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const Reclamacao = require('./reclamacaoModel');
const Usuario = require('./usuarioModel'); 

const sequelize = new Sequelize(config.development);

const Processo = sequelize.define('Processo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_inicial: {
    type: DataTypes.DATE,
  },
  data_final: {
    type: DataTypes.DATE,
  },
  dados_denunciante: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'matricula',
    },
  },
  descricao: {
    type: DataTypes.STRING(255),
  },
  reclamacao_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: Reclamacao,
      key: 'id',
    },
  },
}, {
  tableName: 'processo',
});

Processo.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

module.exports = Processo;
