/**
 * Created by LAE84266 on 11/04/2017.
 */


export const SubMenuDef = {
  userMenu: {
    linkName: 'NAVBAR.SIDEMENU.USERNAME',
    items: [
      'Profile',
      'Your Trips',
      'Messages',
      'Uploads'
    ]
  },
  languageMenu: {
    linkName: 'NAVBAR.SIDEMENU.LANGUAGE',
    items: [
      'NAVBAR.SIDEMENU.SUBMENU_LANG.ENGLISH',
      'NAVBAR.SIDEMENU.SUBMENU_LANG.CHINESE',
      'NAVBAR.SIDEMENU.SUBMENU_LANG.JAPANESE'
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


