/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IOptions } from 'app/shared/components/daterangepicker/interfaces/options.interface';

export const DateRangePickerOptions: IOptions = {
  editableDateRangeField: false,
  openSelectorOnInputClick: true,
  // dateFormat: 'yyyy-mm-dd',
  dateFormat: 'mmm dd',
  dayLabels: {
    su: 'NAVBAR.SEARCH.DRP.WEEKDAY.SUN',
    mo: 'NAVBAR.SEARCH.DRP.WEEKDAY.MON',
    tu: 'NAVBAR.SEARCH.DRP.WEEKDAY.TUE',
    we: 'NAVBAR.SEARCH.DRP.WEEKDAY.WED',
    th: 'NAVBAR.SEARCH.DRP.WEEKDAY.THU',
    fr: 'NAVBAR.SEARCH.DRP.WEEKDAY.FRI',
    sa: 'NAVBAR.SEARCH.DRP.WEEKDAY.SAT'
  },
  monthLabels: {
    1: 'NAVBAR.SEARCH.DRP.MONTH.1',
    2: 'NAVBAR.SEARCH.DRP.MONTH.2',
    3: 'NAVBAR.SEARCH.DRP.MONTH.3',
    4: 'NAVBAR.SEARCH.DRP.MONTH.4',
    5: 'NAVBAR.SEARCH.DRP.MONTH.5',
    6: 'NAVBAR.SEARCH.DRP.MONTH.6',
    7: 'NAVBAR.SEARCH.DRP.MONTH.7',
    8: 'NAVBAR.SEARCH.DRP.MONTH.8',
    9: 'NAVBAR.SEARCH.DRP.MONTH.9',
    10: 'NAVBAR.SEARCH.DRP.MONTH.10',
    11: 'NAVBAR.SEARCH.DRP.MONTH.11',
    12: 'NAVBAR.SEARCH.DRP.MONTH.12'
  },
  selectBeginDateTxt: 'NAVBAR.SEARCH.DRP.BEGIN_DATE',
  selectEndDateTxt: 'NAVBAR.SEARCH.DRP.END_DATE',
}
