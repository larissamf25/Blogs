const { categoryService } = require('../services');

const getAll = async (_req, res) => {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: '"name" is required' });
  const { name } = req.body;
  const category = await categoryService.createCategory(name);
  return res.status(201).json(category);
};

module.exports = {
  getAll,
  createCategory,
};