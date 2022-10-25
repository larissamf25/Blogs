const postModel = require('../models/BlogPost');
const postCategoryModel = require('../models/PostCategory');
const { getByEmail } = require('./user.service');

const getAll = async () => {
  const posts = await postModel.findAll();
  return posts;
};

const getById = async (id) => {
  const post = await postModel.findByPk(id);
  return post;
};

const createPost = async (email, { title, content, categoryIds }) => {
  const { id } = await getByEmail(email);
  const post = await postModel.create({ userId: id, title, content });
  await Promise.all(categoryIds.forEach((cat) => postCategoryModel.create({
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