/**
 * Created by LAE84266 on 11/04/2017.
 */


export const SubMenuDef = {
  userMenu: {
    linkName: 'NAVBAR.SIDE.USER.LABEL',
    items: [
      'Profile',
      'Your Trips',
      'Messages',
      'Uploads'
    ]
  },
  languageMenu: {
    linkName: 'NAVBAR.SIDE.LANGUAGE.LABEL',
    items: [
      'NAVBAR.SIDE.LANGUAGE.MENU.ENGLISH',
      'NAVBAR.SIDE.LANGUAGE.MENU.CHINESE',
      'NAVBAR.SIDE.LANGUAGE.MENU.JAPANESE'
    ]
  }
};

export const SubMenuType = {
  user: 'User',
  language: 'Language'
}

export const MenuState = {
  default: 0,
  collapsed: 1,
  expanded: 2
}

// export const SearchState = {
//   default: 0,
//   collapsed: 1,
//   expanded: 2
// }


