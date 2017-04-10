import { Component } from '@angular/core';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  backgroundImage = AppConfig.HOME_BACKGROUND;
}
