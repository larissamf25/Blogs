const { userService } = require('.');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
const categoryService = require('./category.service');

const getAll = async () => {
  const posts = await BlogPost.findAll({});
  const users = await Promise.all(posts.map((post) => userService.getById(post.userId)));
  const newPosts = posts.map((post, i) => ({ ...post, user: users[i] }));
  console.log(newPosts);
  return newPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id);
  return post;
};

const createPost = async (id, { title, content, categoryIds }) => {
  const { dataValues } = await BlogPost.create({ userId: id, title, content });
  const categoryExists = await Promise.all(categoryIds.map((cat) => (
    categoryService.getById(cat)
  )));
  if (categoryExists.includes(null)) {
    return { type: 'categoryInvalid', message: 'one or more "categoryIds" not found' };
  }
  await Promise.all(categoryIds.map((cat) => PostCategory.create({
    postId: dataValues.id,
    categoryId: cat,
  })));
  return dataValues;
};

const updatePost = async (title, content) => {
  console.log(title, content);
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
};