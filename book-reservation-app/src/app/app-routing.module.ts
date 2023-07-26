import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { HaveABookComponent } from './have-a-book/have-a-book.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ana sayfa login sayfası olacak
  { path: 'reader-dashboard', component: ReaderDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'my-books', component: MyBooksComponent }, // My Books sayfası
  { path: 'have-a-book', component: HaveABookComponent } // Have A Book sayfası
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
