import { Component } from '@angular/core';
import { baseURL } from './shared/baseurl';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  categories = ['volumes', 'bookshelves'];
  selectedCategory = this.categories[0];
  apiKey = 'AIzaSyAG_VtxzJs5c5Hhz2gc8ebzLgw84R6qfck';
  books = [];

  constructor(private bookService: BookService) {
  }

  onSelect(selectedCategory) {
    this.selectedCategory = selectedCategory;
  }

  onSearch(bookName: string) {
    console.log('Searched book name is: ' + bookName);
    bookName = bookName.trim();
    bookName = bookName.replace(/ /g, '+');
    const url = baseURL + '/' + this.selectedCategory + '?q=' + bookName + '&apiKey=' + this.apiKey;
    this.bookService.getBook(url)
      .then(result => { console.log(result.items);
      this.books = result.items; })
      .catch(error => console.log(error));
  }
}
