const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
const { getByEmail } = require('./user.service');

const getAll = async () => {
  const posts = await BlogPost.findAll();
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id);
  return post;
};

const createPost = async (email, { title, content, categoryIds }) => {
  const { id } = await getByEmail(email);
  const post = await BlogPost.create({ userId: id, title, content });
  await Promise.all(categoryIds.forEach((cat) => PostCategory.create({
    postId: post.id,
    categoryId: cat,
  })));
  return post;
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