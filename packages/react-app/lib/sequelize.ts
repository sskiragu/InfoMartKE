// lib/sequelize.ts
import { Sequelize } from 'sequelize';

// Create a new Sequelize instance with your MySQL database credentials
const sequelize = new Sequelize("info_mart_ke", "root", "", {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

export default sequelize;
