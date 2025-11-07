const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_tracker';

// CORS: allow frontend origin (for dev); change if your front runs on another origin
app.use(cors({ origin: ['http://127.0.0.1:3000','http://localhost:3000'], methods: ['GET','POST','PUT','DELETE','OPTIONS'], credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connect error', err));

app.use('/api/books', booksRouter);

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
