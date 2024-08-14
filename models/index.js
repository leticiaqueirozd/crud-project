const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require('./student')(sequelize, DataTypes);

module.exports = db;
