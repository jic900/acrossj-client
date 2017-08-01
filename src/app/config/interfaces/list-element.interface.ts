/**
 * Created by LAE84266 on 31/07/2017.
 */

import { ILinkElement } from './link-element.interface';
import { IElement } from './element.interface';

export interface IListElement extends IElement {
  links: ILinkElement[];
}
