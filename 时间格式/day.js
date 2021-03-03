import {daysInMonth} from './month';

export function buildFromDayOfYear(year, day) {
    var month = 0;
  
    while (month < 12) {
      var monthDay = daysInMonth(year, month);
  
      if (monthDay >= day) {
        return new Date(year, month, day);
      }
  
      month++;
      day -= monthDay;
    }
  
    throw new Error('day of year should < 365/366');
}