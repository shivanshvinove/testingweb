const { AdminProfile, User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  const profile = await AdminProfile.findOne({ where: { admin_id: req.user.id } });
  res.json(profile);
};

exports.updateProfile = async (req, res) => {
  const profile = await AdminProfile.findOne({ where: { admin_id: req.user.id } });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  await profile.update(req.body);
  res.json(profile);
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  if (!await bcrypt.compare(oldPassword, user.password)) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: "Password changed successfully" });
};

exports.uploadPicture = async (req, res) => {
  const profile = await AdminProfile.findOne({ where: { admin_id: req.user.id } });
  profile.profile_picture = req.file.path;
  await profile.save();
  res.json(profile);
};
