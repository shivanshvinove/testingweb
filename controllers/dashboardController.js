const { User, Order } = require('../models');
const { Op } = require('sequelize');

exports.getStats = async (req, res) => {
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { status: 'Active' } });
  const totalOrders = await Order.count();
  res.json({ totalUsers, activeUsers, totalOrders });
};
