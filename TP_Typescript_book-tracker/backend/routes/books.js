const express = require('express');
const router = express.Router();
const Book = require('../models/BookModel');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create book
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // validate basic fields
    if (!data.title || !data.pages) return res.status(400).json({ error: 'title and pages required' });
    if (data.pagesRead && Number(data.pagesRead) > Number(data.pages)) data.pagesRead = data.pages;
    const book = new Book(data);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update book (partial update)
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    // ensure pagesRead doesn't exceed pages if both present
    if (update.pagesRead != null && update.pages != null && update.pagesRead > update.pages) {
      update.pagesRead = update.pages;
    }
    const book = await Book.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'not found' });
    // save triggers pre('save') only on save, but findByIdAndUpdate already applied validator and value; recalc finished:
    book.finished = (book.pagesRead >= book.pages);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
