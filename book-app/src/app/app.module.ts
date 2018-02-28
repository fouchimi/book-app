import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { baseURL } from './shared/baseurl';
import { RestangularConfigFactory } from './shared/restConfig';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { MatCardModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { SummaryPipe } from './summary.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    MatCardModule,
    MatButtonModule
  ],
  providers: [BookService, { provide: 'BaseURL', useValue: baseURL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
