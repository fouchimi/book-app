import { Component, OnInit } from '@angular/core';
import { baseURL, apiKey, localhostURL } from '../shared/baseurl';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  selectedCategory = 'volumes';
  books = [];
  bookShelves = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    const url = localhostURL + '/bookshelves';
    this.bookService.getFavorites(url)
      .then(response => {
        this.bookShelves = response;
      }).catch(error => console.log(error));
  }

  onSelect(selectedCategory) {
    this.selectedCategory = selectedCategory;
  }

  onSearch(bookName: string) {
    bookName = bookName.trim();
    bookName = bookName.replace(/ /g, '+');
    const url = baseURL + '/' + this.selectedCategory + '?q=' + bookName + '&apiKey=' + apiKey;
    this.bookService.getBook(url)
      .then(response => {
         response.items.forEach(result => result.volumeInfo.title = result.volumeInfo.title.substr(0, 30));
         const tempBookShelves = this.bookShelves;
         this.books = response.items.filter(function (first) {
           return tempBookShelves.filter(function (second) {
            return second.volumeInfo.title === first.volumeInfo.title;
          }).length === 0;
        });
      }).catch(error => console.log(error));
  }

  addBook(book) {
    this.bookShelves.push(book);
    this.books = this.books.filter((b => b.volumeInfo.title !== book.volumeInfo.title));
    this.bookService.addBook(localhostURL + '/bookshelves', book)
      .then((response) => console.log('Book was successfully inserted'))
      .catch(error => console.log(error));
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
