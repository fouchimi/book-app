import { Component } from '@angular/core';
import { baseURL, apiKey } from './shared/baseurl';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCategory = 'volumes';
  books = [];

  constructor(private bookService: BookService) { }

  onSelect(selectedCategory) {
    this.selectedCategory = selectedCategory;
  }

  onSearch(bookName: string) {
    bookName = bookName.trim();
    bookName = bookName.replace(/ /g, '+');
    const url = baseURL + '/' + this.selectedCategory + '?q=' + bookName + '&apiKey=' + apiKey;
    this.bookService.getBook(url)
      .then(result => {this.books = result.items; })
      .catch(error => console.log(error));
  }

  filterBooks(title) {
    this.books = this.books.filter(book => book.volumeInfo.title !== title);
  }

  sortBookList() {
    this.books.sort(this.compare);
  }

  compare(first, second) {
    const firstTitle = first.volumeInfo.title.toUpperCase();
    const secondTitle = second.volumeInfo.title.toUpperCase();
    return (firstTitle > secondTitle) ? 1 : ((secondTitle > firstTitle) ? -1 : 0);
  }
}
