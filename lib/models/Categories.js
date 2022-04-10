const { Model, DataTypes } = require('sequelize');

const name = DataTypes.STRING;
module.exports = class Categories extends Model {
  static init(sequelize) {
    super.init({ name }, { sequelize });
  }
};
