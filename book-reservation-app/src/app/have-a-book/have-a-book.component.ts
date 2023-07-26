import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-have-a-book',
  templateUrl: './have-a-book.component.html',
  styleUrls: ['./have-a-book.component.css']
})
export class HaveABookComponent {
  searchText: string | any;
  searchedBooks: Book[] = [];
  loggedInUserId: number | any;
  books: Book[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getBooks();
    const loggedInUserId: string | null = localStorage.getItem('loggedInUserId');
    this.loggedInUserId = loggedInUserId ? parseInt(loggedInUserId) : 0;
    console.log(this.loggedInUserId);
  }

  searchBooks() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.searchedBooks = books.filter(book => (
          book.bookName.includes(this.searchText)
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

  reserveBook(book: Book) {
    this.apiService.reserveBook(book.bookId, this.loggedInUserId).subscribe(
      (response) => {
        console.log('Book reserved successfully:', response);
        this.router.navigate(['/my-books']);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
