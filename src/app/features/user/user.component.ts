import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'aj-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription;
  userState: string;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.userState = params['id'];
      switch (this.userState) {
        case 'dashboard': {
          break;
        }
        case 'profile': {
          break;
        }
        case 'events': {
          break;
        }
        case 'messages': {
          break;
        }
        case 'uploads': {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
