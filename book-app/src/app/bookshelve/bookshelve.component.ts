import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { localhostURL } from '../shared/baseurl';

@Component({
  selector: 'app-bookshelve',
  templateUrl: './bookshelve.component.html',
  styleUrls: ['./bookshelve.component.css']
})
export class BookshelveComponent implements OnInit {
  favorites = [];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    const url = localhostURL + '/bookshelves';
    console.log(url);
    this.bookService.getFavorites(localhostURL + '/bookshelves')
      .then(response => {
        /*response.bookshelves.forEach(result => result.volumeInfo.title = result.volumeInfo.title.substr(0, 30));*/
        console.log(response);
        this.favorites = response;
      }).catch(error => console.log(error));
  }

}
