const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// -----------------------------
// CRUD BERITA UNTUK ADMIN
// -----------------------------


/**
 * @swagger
 * tags:
 *   name: Admin - News
 *   description: API untuk Admin melakukan CRUD berita
 */

/**
 * @swagger
 * /admin/news:
 *   post:
 *     summary: Admin membuat berita baru
 *     tags: [Admin - News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category_id
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Berita berhasil ditambahkan
 */

/**
 * @swagger
 * /admin/news/{id}:
 *   put:
 *     summary: Admin mengupdate berita
 *     tags: [Admin - News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID berita
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Berita berhasil diupdate
 */

/**
 * @swagger
 * /admin/news/{id}:
 *   delete:
 *     summary: Admin menghapus berita
 *     tags: [Admin - News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID berita yang akan dihapus
 *     responses:
 *       200:
 *         description: Berita berhasil dihapus
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Ambil semua berita
 *     tags: [Admin - News]
 *     responses:
 *       200:
 *         description: Daftar semua berita
 */



// CREATE
router.post(
  '/admin/news',
  authenticateToken,
  authorizeRole('admin'),
  upload.single('image'),
  newsController.createNews
);

// READ
router.get('/news', newsController.getAllNews);

// UPDATE
router.put(
  '/admin/news/:id',
  authenticateToken,
  authorizeRole('admin'),
  upload.single('image'),
  newsController.updateNews
);

// DELETE
router.delete(
  '/admin/news/:id',
  authenticateToken,
  authorizeRole('admin'),
  newsController.deleteNews
);

module.exports = router;
