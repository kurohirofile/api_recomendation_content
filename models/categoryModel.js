const pool = require('../config/db');

async function getAllCategories() {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
}

module.exports = { getAllCategories };
