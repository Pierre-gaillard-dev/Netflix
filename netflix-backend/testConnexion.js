const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('netflix', 'postgres', 'Gavotte56', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à PostgreSQL !');
  } catch (error) {
    console.error('Erreur de connexion :', error);
  } finally {
    await sequelize.close();
  }
})();
