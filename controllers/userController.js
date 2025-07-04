const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      first_name, last_name, email, password: hashedPassword, phone, role
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.update(req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.destroy();
  res.json({ message: 'User deleted' });
};

exports.searchUsers = async (req, res) => {
  const { q } = req.query;
  const users = await User.findAll({
    where: {
      [require('sequelize').Op.or]: [
        { first_name: { [require('sequelize').Op.iLike]: `%${q}%` } },
        { last_name: { [require('sequelize').Op.iLike]: `%${q}%` } },
        { email: { [require('sequelize').Op.iLike]: `%${q}%` } }
      ]
    }
  });
  res.json(users);
};
