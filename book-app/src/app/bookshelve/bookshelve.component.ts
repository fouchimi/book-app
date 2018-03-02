import { Component, OnInit, ElementRef } from '@angular/core';
import { BookService } from '../services/book.service';
import { localhostURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations';

@Component({
  selector: 'app-bookshelve',
  templateUrl: './bookshelve.component.html',
  styleUrls: ['./bookshelve.component.css'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class BookshelveComponent implements OnInit {
  favorites = [];
  show = false;
  constructor(private bookService: BookService, private myElement: ElementRef) { }

  ngOnInit() {
    this.bookService.getFavorites(localhostURL + '/bookshelves')
      .then(response => {
        this.favorites = response;
      }).catch(error => console.log(error));
  }

  deleteBook(book) {
    this.show = true;
    this.favorites = this.favorites.filter(b => b.volumeInfo.title !== book.volumeInfo.title);
    this.bookService.deleteBook(localhostURL + '/bookshelves', book.id).then(response => {
      const tempElement = this.myElement;
      setTimeout(() => { tempElement.nativeElement.previousElementSibling.remove(); }, 3000);
    })
    .then(() => { setTimeout(() => { this.show = false; }, 1000); })
    .catch(error => console.error(error));
  }

}
