export type BookStatus = 'Read'|'Re-read'|'DNF'|'Currently reading'|'Returned Unread'|'Want to read';
export type BookFormat = 'Print'|'PDF'|'Ebook'|'AudioBook';

export interface IBookData {
  _id?: string;
  title: string;
  author?: string;
  pages: number;
  status?: BookStatus;
  price?: number;
  pagesRead?: number;
  format?: BookFormat;
  suggestedBy?: string;
  finished?: boolean;
  createdAt?: string|Date;
}

export class Book {
  _id?: string;
  title: string;
  author: string;
  pages: number;
  status: BookStatus;
  price: number;
  pagesRead: number;
  format: BookFormat;
  suggestedBy?: string;
  finished: boolean;

  constructor(data: IBookData) {
    this._id = data._id;
    this.title = data.title;
    this.author = data.author || '';
    this.pages = data.pages;
    this.status = data.status || 'Want to read';
    this.price = data.price || 0;
    this.pagesRead = data.pagesRead || 0;
    this.format = data.format || 'Print';
    this.suggestedBy = data.suggestedBy;
    this.finished = !!data.finished || (this.pagesRead >= this.pages);
  }

  currentlyAt(): number {
    if (!this.pages || this.pages <= 0) return 0;
    return Math.round((this.pagesRead / this.pages) * 100);
  }

  deleteBook() {
    // the actual deletion is done by backend API; this returns identifier for it
    return { id: this._id };
  }
}
