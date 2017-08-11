/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IImageElement } from 'app/config/interfaces/image-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

export class NavBarConfig implements IComponent {
  elements: [IImageElement, IElement] = [
    {
      name: 'logo',
      type: 'image',
      path: '/assets/images/home_logo.png'
    },
    {
      name: 'searchButton',
      type: 'button',
      iconClass: 'fa fa-search'
    }
  ]
}
