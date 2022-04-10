const { Model, DataTypes } = require('sequelize');

const title = DataTypes.STRING;
const content = DataTypes.STRING;
const userId = DataTypes.INTEGER;
const published = DataTypes.DATE;
const updated = DataTypes.DATE;
module.exports = class BlogPosts extends Model {
  static init(sequelize) {
    super.init({ title, content, userId, published, updated }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId', as: 'post_owner' });
  }
};
