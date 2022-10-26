const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  getAll,
  getById,
  createCategory,
};