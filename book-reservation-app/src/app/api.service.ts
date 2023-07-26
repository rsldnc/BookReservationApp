import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'http://localhost:5263/api'; // Web API'nizin URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/User/GetAllUsers`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/Book/GetAllBooks`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/User`, user);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/Book`, book);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/User`, user);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/Book`, book);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/User/${userId}`);
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Book/${bookId}`);
  }

  // Other Methods

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/Login`, loginData);
  }

  
  reserveBook(bookId: number, loggedInUserId: number): Observable<any> {
    const reservationData = {
      bookId: bookId,
      userId: loggedInUserId,
    };
  
    return this.http.post<any>(`${this.apiUrl}/Reserve/reserve-book`, reservationData);
  }

  dropBook(bookId: number, loggedInUserId: number): Observable<any> {
    const reservationData = {
      bookId: bookId,
      userId: loggedInUserId,
    };
  
    return this.http.post<any>(`${this.apiUrl}/Reserve/drop-book`, reservationData);
  }

}
