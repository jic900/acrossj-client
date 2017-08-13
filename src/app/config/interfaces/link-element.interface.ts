/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IElement } from './element.interface';
import { ILink } from './link.interface';

export interface ILinkElement extends IElement {
  link: ILink;
  navIconClass?: string;
}
