/**
 * Created by LAE84266 on 30/03/2017.
 */
import { trigger, state, style, transition, animate } from '@angular/animations';

export class Animations {
  public static slideInOut = trigger('slideInOut', [
    state('true', style({transform: 'translateX(0)'})),
    state('false', style({transform: 'translateX(-100%)'})),
    transition('1 => 0', animate('500ms ease-in-out')),
    transition('0 => 1', animate('500ms ease-in-out'))
  ]);
}
