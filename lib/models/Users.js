const { Model, DataTypes } = require('sequelize');

const displayName = DataTypes.STRING;
const password = DataTypes.STRING;
const email = DataTypes.STRING;
const image = DataTypes.STRING;

module.exports = class Users extends Model {
  static init(sequelize) {
    super.init({ displayName, password, email, image }, { sequelize });
  }
};
