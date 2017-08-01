import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-sendverifyemail',
  templateUrl: './sendverifyemail.component.html',
  styleUrls: ['../auth.component.css']
})
export class SendVerifyEmailComponent implements OnInit {

  message: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
