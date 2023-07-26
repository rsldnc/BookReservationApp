import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Role!: number;
  username: string = '';
  password: string = '';
  loggedInUserId: number | any;

  constructor(private router: Router,private apiService: ApiService) { }

  login(username: string, password: string) {
    this.apiService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        if (response.message === 'Login as admin.') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.loggedInUserId = response.userId;
          localStorage.setItem('loggedInUserId', this.loggedInUserId);
          this.router.navigate(['/reader-dashboard']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
