/**
 * Created by LAE84266 on 19/03/2017.
 */

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_ZH_NAME, LANG_ZH_TRANS } from './lang-zh';
import { LANG_JA_NAME, LANG_JA_TRANS } from './lang-ja';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations
const dictionary = {
  LANG_EN_NAME : LANG_EN_TRANS,
  LANG_ZH_NAME : LANG_ZH_TRANS,
  LANG_JA_NAME : LANG_JA_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
