const { Sequelize } = require('sequelize');

const config = {
    development: {
      username: 'junior',
      password: 'PraIFRN123.',
      database: 'pra',
      host: 'pra.mysql.database.azure.com',
      dialect: 'mysql',
      define: {
        timestamps: false,
        underscored: true, 
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    },
  };

module.exports = config;

