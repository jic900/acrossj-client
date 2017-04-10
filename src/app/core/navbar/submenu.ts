import { MenuState } from "./MenuState";

export class Submenu {

  items: string[];
  subMenuState : number;

  constructor(itemList : string[]) {
    this.items = itemList;
    this.subMenuState = MenuState.collapsed;
  }

  toggleSubMenuState() {
    this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    console.log('this.subMenuState === ' + this.subMenuState);
  }

  isSubMenuExpanded() {
    return this.subMenuState === MenuState.expanded;
  }
}
