const FormatSet = {
  dividerArray: [
    { divider: 1000000000, symbol: "B" },
    { divider: 1000000, symbol: "M" },
    { divider: 1000, symbol: "K" },
  ],
  /**
   *
   * @param {*} num number
   * @returns
   */
  isValidNumber: (num) => !isNaN(num) && num !== Infinity,
  /**
   *
   * @param {*} num number
   * @returns
   */
  isValidInt: (num) => FormatSet.isValidNumber(num) && num % 1 === 0,
  /**
   *
   * @param {*} value number | string
   * @param {*} isZeroValid
   * @returns
   */
  isNumberInPercent100: (value, isZeroValid = true) => {
    const isValid = isZeroValid ? true : parseFloat(`${value}`) !== 0;

    return (
      isValid &&
      /^(100(\.0{1,9})?|(([1-9]){1}[0-9]?|0{1})((\.)([0-9]){1,9})?)$/.test(
        `${value}`
      )
    );
  },
  /**
   *
   * @param {*} num string
   * @returns
   */
  removeSuffixZero: (num) => {
    if (num.indexOf(".") < 0) {
      return num;
    }
    const processedNum = num.replaceAll(/0+$/g, "");

    return processedNum.endsWith(".")
      ? processedNum.substring(0, processedNum.length - 1)
      : processedNum;
  },
  /**
   * 随机取介于给定最大值和最小值的数字
   * @param {*} min number
   * @param {*} max number
   * @param {*} decimalPlaces
   * @returns
   */
  getRandomNumber: (min, max, decimalPlaces = 0) => {
    const randomData = new Uint8Array(1);

    window.crypto.getRandomValues(randomData);
    return Number(
      ((Number(randomData.toString()) / 256) * (max - min + 1) + min).toFixed(
        decimalPlaces
      )
    );
  },
  /**
   * 0.0020001 => '0.00200', 0.0021 => 0.002
   * @param {*} num number
   * @returns string
   */
  getStringOfFloat: (num) => {
    if (num <= -1 || num >= 1 || num === 0) {
      return num.toString();
    }
    const notation = num.toExponential();
    const [base, exp] = notation.split("e-");

    return num.toFixed(Math.max(base.length - 1, parseInt(exp, 10)));
  },
  /**
   *
   * @param {*} num number
   * @param {*} matchUnitAutomatically
   * @param {*} unit  K、M、B
   * @returns
   */
  convertNumberToShortFormAndUnit: (
    num,
    matchUnitAutomatically = true,
    unit
  ) => {
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const foundDividerItem = dividerArray.find(({ divider, symbol }) =>
      matchUnitAutomatically ? absNum >= divider : symbol === unit
    );
    const absShortForm = foundDividerItem
      ? Number((absNum / foundDividerItem.divider).toFixed(2))
      : absNum;

    const shortForm = FormatSet.getStringOfFloat(
      isNegative ? absShortForm * -1 : absShortForm
    );

    return {
      shortForm,
      unit: foundDividerItem?.symbol,
      valueStr: `${shortForm} ${foundDividerItem?.symbol ?? ""}`,
    };
  },
  /**
   *
   * @param {*} text string
   * @param {*} separator
   * @returns
   */
  moneyFormatter: (text, separator = ",") => {
    const strs = text.split(".");

    return strs
      .map((str, index) => {
        if (!index) {
          return str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        return str;
      })
      .join(".");
  },
  /**
   *
   * @param {*} number number
   * @param {*} options  precision?: number; isRemoveSuffixZero?: boolean
   * @returns
   */
  getFormatNumberStr: (number, options) => {
    if (
      number <= Number.MAX_SAFE_INTEGER &&
      number >= Number.MIN_SAFE_INTEGER
    ) {
      const { precision = 2, isRemoveSuffixZero = true } = options ?? {};
      // 先处理小数精度
      const formattedNumber = number.toFixed(precision);
      // 再判断是否去掉小数点后面的 0
      const numberToFormat = isRemoveSuffixZero
        ? FormatSet.removeSuffixZero(formattedNumber)
        : formattedNumber;
      // 最后格式化千分位（包括小数）
      return FormatSet.moneyFormatter(numberToFormat);
    }
  },
  /**
   *
   * @param number
   * @param edgeSmallNumber 绝对值大于等于该值调用 getFormatNumberStr 处理，否则取到小数后第一位有效数字
   * @param options
   */
  getPreciseFormatNumber: (number, options) => {
    const {
      precision = 2,
      isRemoveSuffixZero = true,
      edgeSmallNumber = 0.01,
    } = options ?? {};

    const absValue = Math.abs(number);

    if (absValue >= edgeSmallNumber) {
      return getFormatNumberStr(number, { precision, isRemoveSuffixZero });
    }
    // 处理0的特殊情况
    if (number === 0) {
      return number.toFixed(precision);
    }

    const sign = Math.sign(number); // 获取数值的符号
    const magnitude = Math.floor(Math.log10(absValue)); // 计算数量级
    const factor = Math.pow(10, magnitude); // 根据数量级计算因子

    // 四舍五入到一位有效数字，并根据数量级调整小数点位置
    const rounded = (Math.round(absValue / factor) * factor).toPrecision(1);

    return sign < 0 ? `-${rounded}` : rounded; // 如果原始数值为负，则添加负号
  },
};
