const Sequelize = require('sequelize');
const { development } = require('../config/config');

const Users = require('../models/Users');
const BlogPosts = require('../models/BlogPosts');
const Categories = require('../models/Categories');
const PostsCategories = require('../models/PostsCategories');

const connection = new Sequelize(development);

Users.init(connection);
Categories.init(connection);
BlogPosts.init(connection);
PostsCategories.init(connection);

BlogPosts.associate(connection.models);
PostsCategories.associate(connection.models);

module.exports = connection;
