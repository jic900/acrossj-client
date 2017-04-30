import { IDate } from './date.interface';

export interface IDateSelected {
  type: number;
  date: IDate;
  formatted: string;
  jsdate: Date;
}
