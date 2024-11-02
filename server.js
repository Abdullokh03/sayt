const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных MongoDB (замените строку подключения на свою)
mongoose.connect('mongodb://localhost/mynews', { useNewUrlParser: true, useUnifiedTopology: true });

const NewsSchema = new mongoose.Schema({
    title: String,
    content: String
});

const News = mongoose.model('News', NewsSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Получение новостей
app.get('/api/news', async (req, res) => {
    const news = await News.find();
    res.json(news);
});

// Добавление новостей
app.post('/api/news', async (req, res) => {
    const newsItem = new News(req.body);
    await newsItem.save();
    res.status(201).send(newsItem);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
