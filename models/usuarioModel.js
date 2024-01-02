const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')

const sequelize = new Sequelize(config.development);

const Usuario = sequelize.define('Usuario', {
  matricula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.ENUM('seac', 'etep', 'professor', 'aluno'),
  },
}, {
  tableName: 'usuario',
});

module.exports = Usuario;
