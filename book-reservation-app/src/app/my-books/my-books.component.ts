import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from '../book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  reservedBooks: Book[] = [];
  books: Book[] = [];
  loggedInUserId: number | any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getReservedBooks();
    const loggedInUserId: string | null = localStorage.getItem('loggedInUserId');
    this.loggedInUserId = loggedInUserId ? parseInt(loggedInUserId) : 0;
    console.log(this.loggedInUserId);
  }

  getReservedBooks() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.reservedBooks = books.filter(book => (
          book.reservedBy === this.loggedInUserId
        ));
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getBooks() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  dropBook(bookId: number) {
    this.apiService.dropBook(bookId, this.loggedInUserId).subscribe(
      (response) => {
        console.log('Book dropped successfully:', response);
        this.getReservedBooks();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
