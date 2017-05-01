import { IDayLabels } from './daylabels.interface';
import { IMonthLabels } from './monthlabels.interface';
import { IDate } from './date.interface';
import { IDateRange } from './daterange.interface';
import { IMarkedDates } from './markeddates.interface';
import { IMarkedDate } from './markeddate.interface';

export interface IOptions {
  dayLabels?: IDayLabels;
  monthLabels?: IMonthLabels;
  dateFormat?: string;
  showTodayBtn?: boolean;
  todayBtnTxt?: string;
  firstDayOfWeek?: string;
  sunHighlight?: boolean;
  markCurrentDay?: boolean;
  disableUntil?: IDate;
  disableSince?: IDate;
  disableDays?: Array<IDate>;
  enableDays?: Array<IDate>;
  markDates?: Array<IMarkedDates>;
  markWeekends?: IMarkedDate;
  disableDateRanges?: Array<IDateRange>;
  disableWeekends?: boolean;
  showWeekNumbers?: boolean;
  height?: string;
  width?: string;
  selectionTxtFontSize?: string;
  inline?: boolean;
  showClearDateBtn?: boolean;
  alignSelectorRight?: boolean;
  openSelectorTopOfInput?: boolean;
  indicateInvalidDate?: boolean;
  editableDateField?: boolean;
  editableMonthAndYear?: boolean;
  disableHeaderButtons?: boolean;
  minYear?: number;
  maxYear?: number;
  componentDisabled?: boolean;
  showSelectorArrow?: boolean;
  showInputField?: boolean;
  openSelectorOnInputClick?: boolean;
  ariaLabelInputField?: string;
  ariaLabelClearDate?: string;
  ariaLabelOpenCalendar?: string;
  ariaLabelPrevMonth?: string;
  ariaLabelNextMonth?: string;
  ariaLabelPrevYear?: string;
  ariaLabelNextYear?: string;
}
