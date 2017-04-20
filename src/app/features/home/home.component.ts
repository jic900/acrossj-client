import { Component } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import {Util} from "../../shared/util/util";

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  backgroundImage = AppConfig.HOME_BACKGROUND;
  osType;
  deviceType = 'Your device type is ';

  constructor() {
    // this.osType = window.navigator.platform + ' ' + window.navigator.userAgent;
    // this.osType = JSON.stringify(window.navigator).replace(' ', '&nbsp;').replace('\n', '<br/>');
    // this.osType = JSON.stringify(window.navigator, undefined, 2);
    let _navigator = {};
    for (const i in window.navigator) {
      _navigator[i] = window.navigator[i];
    }
    this.osType = JSON.stringify(_navigator, undefined, 2);
    // console.log(window.navigator);
    this.deviceType += Util.deviceType();
    // window.navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
  }
}
