const { postService } = require('../services');
const { validatePost } = require('./utils/validateCredentials');

// const error500Message = 'Algo deu errado';

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

const getBySearch = async (req, res) => {
  const { q } = req.query;
  let posts;
  if (!q || q === '') posts = await postService.getAll();
  else posts = await postService.getBySearch(q);
  return res.status(200).json(posts);
};

const createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  const post = await postService.createPost(req.id, req.body);
  if (post.type) return res.status(400).json({ message: post.message });
  return res.status(201).json(post);
};

const updatePost = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { id } = req.params;
  const user = await postService.getById(id);
  if (Number(user.userId) !== Number(req.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { title, content } = req.body;
  const updatedPost = await postService.updatePost(id, title, content);
  if (updatedPost.type) return res.status(404).json({ message: updatedPost.message });
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (Number(post.userId) !== Number(req.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  await postService.deletePost(id);
  res.status(204).end();
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  getBySearch,
};