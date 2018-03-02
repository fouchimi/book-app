import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { baseURL } from './shared/baseurl';
import { RestangularConfigFactory } from './shared/restConfig';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatButtonModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { SummaryPipe } from './summary.pipe';
import { BookshelveComponent } from './bookshelve/bookshelve.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: 'bookshelves', component: BookshelveComponent },
  { path: 'search', component: BookComponent},
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    BookshelveComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [BookService, { provide: 'BaseURL', useValue: baseURL }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
