const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.last_login = new Date();
    await user.save();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

exports.refresh = async (req, res) => {
  const oldToken = req.headers.authorization?.split(" ")[1];
  if (!oldToken) return res.status(403).json({ message: "Missing token" });
  try {
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token: newToken });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};
