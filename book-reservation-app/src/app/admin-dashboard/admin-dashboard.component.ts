import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user.model';
import { Book } from '../book.model';
import { RoleType } from '../role-type.enum';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    userId: 0,
    userFirstName: '',
    userLastName: '',
    userDescription: '',
    Role: RoleType.Reader,
    username: '',
    password: '',
    reservedBooks: []
  };
  existingUser: User = {
    userId: 0,
    userFirstName: '',
    userLastName: '',
    userDescription: '',
    Role: RoleType.Reader,
    username: '',
    password: '',
    reservedBooks: []
  };

  books: Book[] = [];
  newBook: Book = {
    bookId: 0,
    bookName: '',
    bookAuthor: '',
    bookPublishedYear: 0,
    Category: '',
    bookSummary: '',
    isReserved: false,
    reservedBy: 0
  };
  existingBook: Book = {
    bookId: 0,
    bookName: '',
    bookAuthor: '',
    bookPublishedYear: 0,
    Category: '',
    bookSummary: '',
    isReserved: false,
    reservedBy: 0
  };

  RoleType = RoleType;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUsers();
    this.getBooks();
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addUser() {
    this.apiService.addUser(this.newUser).subscribe(
      (user: User) => {
        this.users.push(user);
        this.newUser = {
          userId: 0,
          userFirstName: '',
          userLastName: '',
          userDescription: '',
          Role: RoleType.Reader,
          username: '',
          password: '',
          reservedBooks: []
        };
        this.getUsers();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateUser() {
    this.apiService.updateUser(this.existingUser).subscribe(
      () => {
        this.existingUser = {
          userId: 0,
          userFirstName: '',
          userLastName: '',
          userDescription: '',
          Role: RoleType.Reader,
          username: '',
          password: '',
          reservedBooks: []
        };
        this.getUsers();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteUser(userId: number) {
    this.apiService.deleteUser(userId).subscribe(
      () => {
        this.getUsers();
      },
      (error) => {
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

  addBook() {
    this.apiService.addBook(this.newBook).subscribe(
      (book: Book) => {
        this.books.push(book);
        this.newBook = {
          bookId: 0,
          bookName: '',
          bookAuthor: '',
          bookPublishedYear: 0,
          Category: '',
          bookSummary: '',
          isReserved: false,
          reservedBy: 0
        };
        this.getBooks();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateBook() {
    this.apiService.updateBook(this.existingBook).subscribe(
      () => {
        this.existingBook = {
          bookId: 0,
          bookName: '',
          bookAuthor: '',
          bookPublishedYear: 0,
          Category: '',
          bookSummary: '',
          isReserved: false,
          reservedBy: 0
        };
        this.getBooks();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteBook(bookId: number) {
    this.apiService.deleteBook(bookId).subscribe(
      () => {
        this.getBooks();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
