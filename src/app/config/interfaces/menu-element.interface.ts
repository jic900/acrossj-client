/**
 * Created by LAE84266 on 31/07/2017.
 */

import { ILinkElement } from './link-element.interface';
import { IElement } from './element.interface';
import { IListElement } from './list-element.interface';

export interface IMenuElement extends IElement {
  links?: ILinkElement[];
  submenus?: IListElement[];
}
