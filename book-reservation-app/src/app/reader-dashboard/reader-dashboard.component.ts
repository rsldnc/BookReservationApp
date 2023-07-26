import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-dashboard',
  templateUrl: './reader-dashboard.component.html',
  styleUrls: ['./reader-dashboard.component.css']
})
export class ReaderDashboardComponent implements OnInit {
  loggedInUserId: any;

  constructor(private apiService: ApiService, private router: Router) { }
  
  ngOnInit() {
    const loggedInUserId: string | null = localStorage.getItem('loggedInUserId');
    this.loggedInUserId = loggedInUserId ? parseInt(loggedInUserId) : 0;
    console.log(this.loggedInUserId);
  }
  
  navigateToMyBooks() {
    this.router.navigate(['/my-books']);
  }

  navigateToHaveABook() {
    this.router.navigate(['/have-a-book']);
  }

}
