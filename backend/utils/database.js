import { Sequelize } from 'sequelize';
// Sequelize = require('sequelize')

const sequelize = new Sequelize('loginDB', 'root', 'wlrnrhkgkr2', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;