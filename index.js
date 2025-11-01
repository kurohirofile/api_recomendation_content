const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

setupSwagger(app);  // <-- dokumentasi swagger di `/api-docs`

app.use('/api/auth', authRoutes);
app.use('/api', newsRoutes);
app.use('/api', recommendationRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>API Berita & Rekomendasi</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        .container {
          background: rgba(34, 34, 34, 0.75);
          padding: 40px 60px;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        h1 {
          font-size: 2.2em;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.1em;
          margin-bottom: 20px;
        }
        a {
          background: #fff;
          color: #0078ff;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.3s, color 0.3s;
        }
        a:hover {
          background: #0078ff;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🟢 API Berita & Rekomendasi</h1>
        <p>Server berjalan dengan baik</p>
        <a href="/api-docs">Lihat Dokumentasi API (Swagger)</a>
      </div>
    </body>
    </html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Swagger UI tersedia di http://localhost:${PORT}/api-docs`);
});
