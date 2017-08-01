/**
 * Created by LAE84266 on 31/07/2017.
 */

import { ISimpleElement } from './simple-element.interface';
import { ILink } from './link.interface';

export interface ILinkElement extends ISimpleElement {
  link: ILink;
}
