const { postService } = require('../services');
const { validatePost } = require('./utils/validateCredentials');

const getAll = async (_req, res) => {
  const posts = await postService.getAll();
  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const createPost = async (req, res, next) => {
  const { error } = validatePost(req.body);
  if (error) return next(error);
  const post = await postService.createPost(req.email, req.body);
  return res.status(201).json(post);
};

const updatePost = async (req, res) => {
  // o post existe
  // o usuário é dono do post
  const { title, content } = req.body;
  const updatedPost = await postService.updatePost(title, content);
  res.status(200).json(updatedPost);
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
};