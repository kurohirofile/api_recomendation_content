const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

async function register(req, res) {
  const { username, password, hobbies } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username dan password wajib diisi' });

  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) return res.status(400).json({ error: 'Username sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, hashedPassword);

    if (Array.isArray(hobbies) && hobbies.length > 0) {
      await userModel.setUserHobbies(userId, hobbies);
    }

    res.json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username dan password wajib diisi' });

  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) return res.status(400).json({ error: 'Username tidak ditemukan' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Password salah' });

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );

    res.json({ message: 'Login berhasil', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}

module.exports = { register, login };
