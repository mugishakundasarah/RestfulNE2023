const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('employeems', 'mugisha', 'root@123', {dialect: 'postgres'})

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection to postgres has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


module.exports = { sq: sequelize, testDbConnection };