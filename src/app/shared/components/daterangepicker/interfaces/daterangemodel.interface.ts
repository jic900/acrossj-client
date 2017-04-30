import { IDate } from './date.interface';

export interface IDateRangeModel {
  beginDate: IDate;
  beginJsDate: Date;
  endDate: IDate;
  endJsDate: Date;
  formatted: string;
  beginEpoc: number;
  endEpoc: number;
}
