const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: '' },
  pages: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['Read','Re-read','DNF','Currently reading','Returned Unread','Want to read'], default: 'Want to read' },
  price: { type: Number, default: 0 },
  pagesRead: { type: Number, default: 0, min: 0 },
  format: { type: String, enum: ['Print','PDF','Ebook','AudioBook'], default: 'Print' },
  suggestedBy: { type: String, default: '' },
  finished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Ensure pagesRead <= pages and set finished automatically before save
BookSchema.pre('save', function(next) {
  if (this.pagesRead > this.pages) this.pagesRead = this.pages;
  this.finished = (this.pagesRead >= this.pages);
  next();
});

module.exports = mongoose.model('Book', BookSchema);
