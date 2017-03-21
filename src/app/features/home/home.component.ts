import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'config/app.config';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  backgroundImage = AppConfig.HOME_BACKGROUND;

  constructor() { }

  ngOnInit() {
  }

}
