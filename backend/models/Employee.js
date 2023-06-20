const { DataTypes } = require('sequelize');
const {sq} = require('./db');

const Employee = sq.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  laptopManufacturer: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  laptopModel: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});


module.exports = Employee;   