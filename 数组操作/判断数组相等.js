function arrayEqual(array1, array2, deep) {
  //  deep：false  不要求数组元素顺序一致
  //  deep：true   要求数组元素顺序一致
  if (!deep) {
    var array1 = array1.sort();
    var array2 = array2.sort();
  }

  if (!array1 || !array2) {
    return false;
  }

  if (array1.length != array2.length) {
    return false;
  }

  for (var i = 0, l = array1.length; i < l; i++) {
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      if (!arrayEqual(array1[i], array2[i])) {
        return false;
      }
    } else if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
