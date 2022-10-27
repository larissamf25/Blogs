const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');
const categoryService = require('./category.service');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(
    id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
    },
  );
  return post;
};

const getBySearch = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } },
        { content: { [Op.like]: query } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
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

const updatePost = async (id, title, content) => {
  const [updatedPost] = await BlogPost.update({ title, content }, { where: { id } });
  const result = await getById(updatedPost);
  return result;
};

const deletePost = async (id) => {
  const result = await BlogPost.destroy({ where: { id } });
  return result;
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  getBySearch,
};