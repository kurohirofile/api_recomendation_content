/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints untuk registrasi dan login
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               username: "user1"
 *               password: "password123"
 *               hobbies: [1, 2, 4]
 *     responses:
 *       200:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Request tidak valid
 *       500:
 *         description: Kesalahan server
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user / admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "user1"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Username atau password salah
 *       500:
 *         description: Kesalahan server
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
