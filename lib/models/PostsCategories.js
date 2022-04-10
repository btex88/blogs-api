const { Model, DataTypes } = require('sequelize');

const postId = DataTypes.INTEGER;
const categoryId = DataTypes.INTEGER;
module.exports = class PostsCategories extends Model {
  static init(sequelize) {
    super.init({ postId, categoryId }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.BlogPosts, {
      foreignKey: 'postId',
      as: 'post_owner',
    });
    this.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      as: 'category_owner',
    });
  }
};
