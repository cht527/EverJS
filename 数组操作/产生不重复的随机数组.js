//---------part1-----------
function randomAndSort(n, min, max, sortType, isRepeated) {
  var arr = [];
  var sortType = sortType || 0; //默认升序排列
  var isRepeated = isRepeated || false; //默认不可重复
  for (var i = 0; i < n; i++) {
    var this_random = Math.floor(Math.random() * (max - min + 1) + min);
    if (isRepeated || arr.indexOf(this_random) == -1) {
      arr.push(this_random);
    } else {
      i--;
    }
  }

  arr.sort(function (a, b) {
    if (sortType === 1) {
      //降序排列
      return b - a;
    } else if (sortType === 0) {
      //升序排列
      return a - b;
    }
  });
  return arr;
}


//-----------------part 2------------------------------------
function fn(n, min, max) {
  //--输入数组元素个数，取值范围：最大值，最小值
  var arr = []; //---容器，存放满足要求的数组
  for (var i = 0; i < n; i++) {
    var item = ~~(Math.random() * (max - min) + min); //产生介于最大值和最小值之间的整数
    if (arr.indexOf(item) == -1) {
      //判断是否重复，无重复，则将随机整数存到数组
      arr.push(item);
    } else {
      // 重复 则将计数器减一，增加一次循环
      i--;
    }
  }
  return arr;
}

//-----------------part 3------------------------------------

function getRandomInRange(start, end) {
  // 验证输入
  if (start >= end) {
    throw new Error('Start must be less than end.');
  }

  // 计算所需范围内的值数量
  const range = end - start + 1;

  // 创建一个 Uint32Array 数组来存储随机值
  const buffer = new Uint32Array(1);

  // 使用 crypto.getRandomValues() 来填充数组
  window.crypto.getRandomValues(buffer);

  // 获取数组中的第一个元素，并限制它在所需范围内
  const maxUint32 = Math.pow(2, 32);
  const randomNumberInRange = (buffer[0] / maxUint32) * range + start;

  // 返回整数部分，确保结果是介于 start 和 end（包括）之间的整数
  return Math.floor(randomNumberInRange);
}

// 使用示例：
const randomInt = getRandomIntInRange(10, 20);
console.log(randomInt); // 输出：介于10到20之间（包括10和20）的随机整数
