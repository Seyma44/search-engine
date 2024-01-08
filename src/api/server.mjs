// server.mjs
import convertData from './convertFile.mjs';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/minify-url', async (req, res) => {
  try {
    const originalUrl = req.query.url;
    const apiUrl = `https://ulvis.net/API/write/get?url=${encodeURIComponent(originalUrl)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/minify-url`);
});

// convert my mock-data
convertData();
