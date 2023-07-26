import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { HaveABookComponent } from './have-a-book/have-a-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReaderDashboardComponent,
    AdminDashboardComponent,
    MyBooksComponent,
    HaveABookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
