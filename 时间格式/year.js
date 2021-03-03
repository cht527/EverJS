
export function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

export function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
} // YYYY和YY