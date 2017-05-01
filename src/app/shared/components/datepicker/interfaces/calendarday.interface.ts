import { IDate } from './date.interface';
import { IMarkedDate } from './markeddate.interface';

export interface ICalendarDay {
  dateObj: IDate;
  cmo: number;
  currDay: boolean;
  dayNbr: number;
  disabled: boolean;
  markedDate: IMarkedDate;
}
