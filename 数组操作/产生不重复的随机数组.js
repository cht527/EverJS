//---------part1-----------
function randomAndSort(n, min, max, sortType, isRepeated) {
  var arr = [];
  var sortType = sortType || 0; //默认升序排列
  var isRepeated = isRepeated || false; //默认不可重复
  if (isRepeated) {
    //允许重复
    for (var i = 0; i < n; i++) {
      var this_random = Math.floor(Math.random() * (max - min + 1) + min);
      arr.push(this_random);
    }
  } else {
    //不允许重复
    for (var i = 0; i < n; i++) {
      var this_random = Math.floor(Math.random() * (max - min + 1) + min);
      if (arr.indexOf(this_random) == -1) {
        arr.push(this_random);
      } else {
        i--;
      }
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

// 判断数组中是否有重复
function isArrayRepeated(arr) {
  var copy_arr = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (copy_arr.indexOf(arr[i]) == -1) {
      copy_arr[arr[i]];
    } else {
      return true;
    }
  }
  return false;
}

for (var i = 0; i < 20; i++) {
  console.log(isArrayRepeated(randomAndSort(10, 10, 100, 1, false)));
}
//-----------------part 2------------------------------------
function fn1(n, min, max) {
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
function fn2(n, min, max) {
  //--输入数组元素个数，取值范围：最大值，最小值
  var temp = [];
  var max = parseInt(max);
  var min = parseInt(min);
  for (var j = 0; j <= max - min; j++) {
    temp.push(min + j);
  }
  var target = [];
  for (var i = 0; i < n; i++) {
    //将随机删除的元素存放到target中
    target.push(
      temp.splice(Math.floor(Math.random() * temp.length), 1).toString()
    );
  }
  return target;
}
