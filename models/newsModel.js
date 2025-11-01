const db = require('../config/db');

const NewsModel = {
  create: async ({ title, content, category_id, image_url }) => {
    const [result] = await db.query(
      'INSERT INTO news (title, content, category_id, image_url) VALUES (?, ?, ?, ?)',
      [title, content, category_id, image_url]
    );
    return result;
  },

  update: async (id, { title, content, category_id, image_url }) => {
    let sql, values;

    if (image_url) {
      sql = 'UPDATE news SET title = ?, content = ?, category_id = ?, image_url = ? WHERE id = ?';
      values = [title, content, category_id, image_url, id];
    } else {
      sql = 'UPDATE news SET title = ?, content = ?, category_id = ? WHERE id = ?';
      values = [title, content, category_id, id];
    }

    const [result] = await db.query(sql, values);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM news WHERE id = ?', [id]);
    return result;
  },

  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    return rows;
  },

  findByIds: async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];

    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await db.query(`SELECT * FROM news WHERE id IN (${placeholders})`, ids);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = NewsModel;
