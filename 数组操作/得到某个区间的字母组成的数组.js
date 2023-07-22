/*这里主要应用两个方法，一个字符串的charCodeAt和String上的一个静态方法fromCharCode。其思想主要是：先得到这个区间开头字母和结束字母的数字表示，然后就可以在这个区间内做一个循环，并且得到这个区间字母的数字表示，最后把数字传唤成字母依次push到数组里面返回*/
function getArrForAlphabet(startLetter, endLetter) {
  //var regExp = /^[a-zA-Z]$/gi;
  var regExp = new RegExp("^[a-zA-Z]$");
  if (!regExp.test(startLetter) || !regExp.test(endLetter)) {
    //console.log(regExp.test(startLetter));
    //console.log(regExp.test(endLetter));
    console.log("请传入字母！");
    return false;
  }
  //i是得到开始字母的数字表示，j得到结束字母的数字表示
  var i = startLetter.charCodeAt(0),
    j = endLetter.charCodeAt(0);
  console.log(i);
  console.log(j);
  //定义一个数组用于取出将来的字母
  var arr = [];
  //这里取<=符号是因为要取出结束的字母
  for (; i <= j; i++) {
    //fromCharCode是String上的一个静态方法，用于将一个数字转换成对应的字母
    var letter = String.fromCharCode(i);
    arr.push(letter);
  }
  //记得最后返回arr
  return arr;
}
console.log(getArrForAlphabet("a", "d"));
console.log(getArrForAlphabet("A", "D"));
