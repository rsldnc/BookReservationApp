// book.model.ts

export interface Book {
    bookId: number;
    bookName: string;
    bookAuthor: string;
    bookPublishedYear: number;
    Category: string;
    bookSummary: string;
    isReserved: boolean;
    reservedBy: number;
  }
  