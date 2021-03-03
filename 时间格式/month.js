
import {isLeapYear} from './year';

var MONTH_DATE_MAP = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function daysInMonth(year, month) {
  if (month !== 1) { // 非二月
    return MONTH_DATE_MAP[month];
  }

  return isLeapYear(year) ? 29 : 28;
} // MMMM