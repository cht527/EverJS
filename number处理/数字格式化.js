const unitMap = {
  10000: "(万)",
  1000: "(千)",
};

/**
 * 截断小数位，默认保留2位，兼容小于0.01的数保留有效数字两位
 * @param num 原数值(支持负数)
 * @param onlyInt  只保留整数
 * @param unit 基数
 * @param times  // num 数值 满足unit值 多少倍 才对num进行格式化
 * @param simplify 是否去除多余的0
 */
const numberFormatter = (num, onlyInt = false, simplify = true) => {
  const value = Math.abs(num);
  if (!value) {
    return "0";
  }
  let res = "";
  if (value >= 1) {
    const [intNum, floatNum = "0"] = `${value}`.split(".");
    const fixedFloatNum = floatNum.slice(0, 2);
    const commafyIntNum = intNum.replace(/^\d+/, (m) =>
      m.replace(/(?=(?!^)(\d{3})+$)/g, ",")
    );
    res =
      floatNum === "0" || onlyInt
        ? commafyIntNum
        : `${commafyIntNum}.${fixedFloatNum}`;
  } else if (value >= 0.1) {
    res = value.toFixed(2);
  } else if (value >= 0.01 && value < 0.1) {
    res = value.toFixed(3);
  } else {
    res = value.toFixed(4);
  }
  if (simplify && value < 1) {
    res = res.replace(/0+$/, "").replace(/\.$/, "");
  }
  return num < 0 ? `-${res}` : res;
};

/**
 * 数字增加单位
 * @param num       原数值(支持负数)
 * @param baseUnit  基数
 * @param times     num 数值 baseUnit 多少倍 才对num进行格式化
 */
const numberAddUnit = (num, baseUnit = 10000, times = 1) => {
  let value = num;
  let unit = "";
  if (baseUnit && times && Math.abs(value) >= baseUnit * times) {
    value = value / baseUnit;
    unit = unitMap[baseUnit];
  }

  return {
    value,
    unit,
  };
};

// 测试：

const test_value = -100120290.2342;
const { value, unit } = numberAddUnit(test_value, 10000, 10);
console.log(numberFormatter(value) + unit);


/*千分位格式化*/

// 方法一
var a=12;

function numToStrReverse(num){
	var numType=Object.prototype.toString.call(num);
	if (numType=="[object String]") {
		return num.split("").reverse().join("");
	}else if(numType=="[object Number]"){
		return num.toString().split("").reverse().join("");
	}
	
}
function thousand(num) {
	var reverseStr=numToStrReverse(num);
	var res="";
	for (var i = 1,len=reverseStr.length; i <=len ; i++) {
		res+=reverseStr[i-1];
		if (i%3==0&&i!=len) {
			res+=","
			
		}
		
	}
	return numToStrReverse(res);
}
console.log(thousand(a))


/*方法二、*/
var bb=1233345;
function thousandFormat(str){
  if (Object.prototype.toString.call(str)=="[object String]") {
  	return str.replace(/(\d)(?=(?:\d{3})+$)/g,function(res,$1){
  		return $1+","
  	})
  }else if(Object.prototype.toString.call(str)=="[object Number]"){
  	return str.toString().replace(/(\d)(?=(\d{3})+$)/g,function(res,$1){
		console.log(res,$1);
  		return $1+","
  	})
  }
}
alert(thousandFormat(bb));

/* 方法三、*/
var cc=121313;
console.log(cc.toLocaleString('zh',{style:'currency',currency: 'CNY'}))
