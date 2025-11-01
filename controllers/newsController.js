const News = require('../models/newsModel');

exports.createNews = async (req, res) => {
  try {
    const { title, content, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await News.create({ title, content, category_id, image });
    res.status(201).json({ message: 'Berita berhasil ditambahkan', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan berita', error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.findAll();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil berita', error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { title, content, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    await News.update(newsId, { title, content, category_id, image });
    res.json({ message: 'Berita berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui berita', error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    await News.delete(newsId);
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus berita', error: err.message });
  }
};
