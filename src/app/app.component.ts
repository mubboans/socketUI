import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(public local:LocalstorageService){}
  title = 'lazy-load-sample';

}
