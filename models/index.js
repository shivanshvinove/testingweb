const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.AdminProfile = require('./adminProfile')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);

// Setup associations
Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

module.exports = db;
