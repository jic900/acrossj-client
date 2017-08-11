/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';

export class PersonalInfoConfig implements IForm {
  elements: [IInputElement, IInputElement, IListElement, IInputElement, IInputElement, IInputElement, IInputElement, IElement] = [
    {
      name: 'fullname',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.FULLNAME'
    },
    {
      name: 'username',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.USERNAME'
    },
    {
      name: 'gender',
      type: 'select',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.GENDER_LABEL',
      list: [
        {name: 'male', display: 'USER.PROFILE.PERSONAL_INFO.GENDER_MALE'},
        {name:'female', display: 'USER.PROFILE.PERSONAL_INFO.GENDER_FEMALE'}
      ]
    },
    {
      name: 'birthday',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.BIRTHDAY_LABEL'
    },
    {
      name: 'address',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.ADDRESS'
    },
    {
      name: 'postcode',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.POSTCODE'
    },
    {
      name: 'phonenumber',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.PHONENUMBER'
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.PERSONAL_INFO.SAVEBTN_LABEL'
    }
  ];
}
