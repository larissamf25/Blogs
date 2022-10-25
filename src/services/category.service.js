const categoryModel = require('../models/Category');

const getAll = async () => {
  const categories = await categoryModel.findAll();
  return categories;
};

const createCategory = async (name) => {
  const category = await categoryModel.create({ name });
  return category;
};

module.exports = {
  getAll,
  createCategory,
};