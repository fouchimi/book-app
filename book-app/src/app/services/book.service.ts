import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getFavorites(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addBook(url: string, book: any): Promise<any> {
    return this.http
      .post(url, book, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getBook(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteBook(url: string, id: string): Promise<any> {
    url = url + '/' + id;
    console.log(url);
    return this.http
      .delete(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}


