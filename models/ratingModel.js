const pool = require('../config/db');

async function getAllRatings() {
  const [rows] = await pool.query('SELECT user_id, news_id, rating FROM ratings');
  const data = {};
  rows.forEach(r => {
    if (!data[r.user_id]) data[r.user_id] = {};
    data[r.user_id][r.news_id] = r.rating;
  });
  return data;
}

module.exports = { getAllRatings };
