/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Endpoint untuk mengambil rekomendasi berita bagi user
 */

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Mendapatkan rekomendasi berita untuk user yang sudah login
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar rekomendasi berita
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       category_id:
 *                         type: integer
 *                       image_url:
 *                         type: string
 *       401:
 *         description: Token tidak ditemukan
 *       403:
 *         description: Token tidak valid
 *       500:
 *         description: Kesalahan server
 */

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/recommendations', authenticateToken, recommendationController.getRecommendations);

module.exports = router;
