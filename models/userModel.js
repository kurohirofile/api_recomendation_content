const pool = require('../config/db');

async function findUserByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function createUser(username, hashedPassword, role = 'user') {
  const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
  return result.insertId;
}

async function getUserHobbies(userId) {
  const [rows] = await pool.query('SELECT category_id FROM user_hobbies WHERE user_id = ?', [userId]);
  return rows.map(r => r.category_id);
}

async function setUserHobbies(userId, categoryIds) {
  if (!Array.isArray(categoryIds)) return;
  // Hapus dulu hobby lama
  await pool.query('DELETE FROM user_hobbies WHERE user_id = ?', [userId]);
  if (categoryIds.length === 0) return;

  const values = categoryIds.map(catId => [userId, catId]);
  await pool.query('INSERT INTO user_hobbies (user_id, category_id) VALUES ?', [values]);
}

module.exports = {
  findUserByUsername,
  findUserById,
  createUser,
  getUserHobbies,
  setUserHobbies,
};
