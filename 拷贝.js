/* 一、浅复制----*/
/*1、slice、concat 实现  */
// 只是浅拷贝，如果数组元素是基本类型，就会拷贝一份新的；但是如果数组元素是对象或者数组，就只会拷贝引用（类似指针），修改其中一个就会影响另外一个
var arr = ["old", 1, true, null, undefined];

var new_arr1 = arr.slice();
var new_arr2 = arr.concat();

/*3、复制数组或对象方法 */
var shallowCopy = function (obj) {
  // 判断是否是数组或者对象
  if (typeof obj !== "object") {
    return;
  }
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/* 二、深度复制----*/
/*JSON.stringify实现数组深拷贝*/

var arr = [
  "old",
  1,
  true,
  ["old1", "old2"],
  {
    old: 1,
  },
];

var new_arr = JSON.parse(JSON.stringify(arr));

/*-----方法1：原生stackoverflow提供 ------*/
function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

  if (reference.includes(obj.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepClone(e);
    });
  } else if (typeof obj === "object" && obj !== null) {
    res = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone(obj[key]);
      }
    }
    hash.set(obj, res);
  } else {
    res = obj;
  }
  return res;
}
/*---jquery 方法----*/
var copiedObject = jQuery.extend({}, originalObject); // shallow copy浅复制

var copiedObject = jQuery.extend(true, {}, originalObject); // deep copy深复制
