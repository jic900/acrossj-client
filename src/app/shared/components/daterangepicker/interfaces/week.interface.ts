import { ICalendarDay } from './calendarday.interface';

export interface IWeek {
  week: Array<ICalendarDay>;
  weekNbr: number;
}
