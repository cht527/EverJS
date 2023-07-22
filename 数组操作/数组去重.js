var arr = [1, 2, 3, 1, 1, 1, 1];
function toHeavy(array) {
  //这是一个缓存对象，用来实现过滤到重复的数据
  var cache = {};
  //定义一个中间数组，用来实现当容器
  var cacheArr = [];
  for (var i = 0, len = array.length; i < len; i++) {
    if (!cache[array[i]]) {
      cacheArr.push(array[i]);
      cache[array[i]] = array[i];
    }
  }
  return cacheArr;
}
arr = toHeavy(arr); //arr ==  [1,2,3]

console.log(arr);
/*1、Set实现

第一种方法就是使用es6新增的Array.from()和new Set()。如果现在你还不了解es6,那你可真是out了。建议阅读ECMAScript 6 入门或者learn-es2015。*/
//但是，对象类型不去重 NaN 去重
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};
/*简化版*/
var unique = (a) => [...new Set(a)];
/*2、结合{}实现

利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。示例代码如下：
*/
var array = [1, 2, 1, 1, "1"];

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true);
  });
}

console.log(unique(array)); // [1, 2]
/*
我们可以发现，是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，这是因为对象的键值只能是字符串，所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题：
*/
var array = [1, 2, 1, 1, "1"];

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

console.log(unique(array)); // [1, 2, "1"]
/*
然而，即便如此，我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，因为 typeof item + item 的结果都会是 object[object Object]，不过我们可以使用 JSON.stringify 将对象序列化：
*/
var array = [{ value: 1 }, { value: 1 }, { value: 2 }];

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    console.log(typeof item + JSON.stringify(item));
    return obj.hasOwnProperty(typeof item + JSON.stringify(item))
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true);
  });
}

console.log(unique(array)); // [{value: 1}, {value: 2}]

/*3、利用Array.prototype.filter实现

filter是es5中新增的数组的一个方法。不了解的同请阅读Array.prototype.filter()*/

Array.prototype.unique = function () {
  var sortArr = this.sort();
  return sortArr.filter(function (v, i, context) {
    return v !== context[i + 1];
  });
};
/*或者*/
function unique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

/*4、利用Array.prototype.forEach实现

includes也是es6新增的方法。不了解的同请阅读Array.prototype.includes()*/

Array.prototype.unique = function () {
  var result = [];
  this.forEach(function (v) {
    if (!result.includes(v)) {
      result.push(v);
    }
  });
  return result;
};
/*5、利用Array.prototype.splice()实现

这个方法是一个很常规的方法,关键点就是在splice一个元素之后,i要自减1。*/

Array.prototype.unique = function () {
  var sortArr = this.sort(),
    i = 0,
    len = sortArr.length;
  for (; i < len; i++) {
    if (sortArr[i] === sortArr[i++]) {
      sortArr.splice(i, 1);
      i--;
    }
  }
  return sortArr;
};
/*6、利用Array.prototype.reduce()实现

reduce是es5中新增的数组的一个方法。不了解的请阅读Array.prototype.reduce()。*/

var sortArr = this.sort(),
  result = [];
sortArr.reduce((v1, v2) => {
  if (v1 !== v2) {
    result.push(v1);
  }
  return v2;
});
result.push(sortArr[sortArr.length - 1]);
return result;
