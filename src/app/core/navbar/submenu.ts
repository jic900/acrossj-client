export class Submenu {

  items: string[];
  subMenuState = 1;

  constructor(itemList : string[]) {
    this.items = itemList;
    this.subMenuState = 1;
  }

  toggleSubMenuState() {
    this.subMenuState = this.subMenuState === 1 ? 2 : 1;
    console.log('this.subMenuState === ' + this.subMenuState);
  }

  isSubMenuExpanded() {
    return this.subMenuState === 2;
  }
}
