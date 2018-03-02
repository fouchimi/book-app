import { Component, OnInit, ElementRef } from '@angular/core';
import { baseURL, apiKey, localhostURL } from '../shared/baseurl';
import { BookService } from '../services/book.service';

import { flyInOut, expand } from '../animations';

const fadeInMs = 3000;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class BookComponent implements OnInit {

  selectedCategory = 'volumes';
  books = [];
  bookShelves = [];
  show = false;

  constructor(private bookService: BookService, private myElement: ElementRef) { }

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
            return second.id === first.id;
          }).length === 0;
        });
      }).catch(error => console.log(error));
  }

  addBook(book) {
    this.show = true;
    this.bookShelves.push(book);
    this.books = this.books.filter((b => b.id !== book.id));
    this.bookService.addBook(localhostURL + '/bookshelves', book)
      .then((response) => {
        console.log('Book was successfully inserted');
        const tempElement = this.myElement;
        setTimeout(() => { tempElement.nativeElement.previousElementSibling.remove(); }, fadeInMs);
      })
      .then(() => { setTimeout(() => { this.show = false; }, 1000); })
      .catch(error => console.log(error));
  }

  sortBookList() {
    this.books.sort(this.compare);
  }

  compare(first, second) {
    const firstBookId = first.id.toUpperCase();
    const secondBookId = second.id.toUpperCase();
    return (firstBookId > secondBookId) ? 1 : ((secondBookId > firstBookId) ? -1 : 0);
  }

}
