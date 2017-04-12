/**
 * Created by LAE84266 on 11/04/2017.
 */


export const SubMenuDef = {
  userMenu: {
    linkName: 'Username',
    items: [
      'Profile',
      'Event History',
      'Upload'
    ]
  },
  languageMenu: {
    linkName: 'Language',
    items: [
      'English',
      'Chinese',
      'Japanese',
      'German',
      'French'
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


