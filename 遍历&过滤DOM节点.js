/** ---- DOM template ---- 
 * <div id="div1">
	<button id="click">点击</button>
	<div id="template"></div>
	<div id="template2"></div>
	<div id="content">结果:</div>
	<div id="content2">结果:</div>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
	<li>6</li>
	<p></p><p></p>
	<p></p><p></p>
	<span></span>	
  </div>
 */

/*
可以使用document.createNodeIterator()方法创建NodeIterator类型的新实例。这个方法接受下列4个参数

root：想要作为搜索起点的树中的节点
whatToShow：表示要访问哪些节点的数字代码
filter：是一个NodeFilter对象，或者一个表示应该接受还是拒绝某种特定节点的函数
entityReferenceExpansion：布尔值，表示是否要扩展实体引用。这个参数在HTML页面中没有用，因为其中的实体引用不能扩展

其中：
第二个参数：whatToshow参数是一个位掩码，通过应用一或多个过滤器(filter)来确定要访问哪些节点。这个参数的值以常量形式在NodeFilter类型中定义：

NodeFilter.SHOW_ALL：显示所有类型的节点
NodeFilter.SHOW_ELEMENT：显示元素节点
NodeFilter.SHOW_ATTRIBUTE：显示特性节点。由于DOM结构原因，实际上不能使用这个值
NodeFilter.SHOW_TEXT：显示文本节点
NodeFi1ter.SHOW_COMMENT：显示注释节点
NodeFilter.SHOW_DOCUMENT：显示文档节点
NodeFilter.SHOW_DOCUMENT_TYPE：显示文档类型节点

第三个参数：可以通过createNodeIterator()方法的filter参数来指定自定义的NodeFilter对象，或者指定一个功能类似节点过滤器(node filter)的函数。每个NodeFilter对象只有一个方法，即acceptNode()；如果应该访问给定的节点，该方法返回NodeFilter.FILTER_ACCEPT，如果不应该访问给定的节点，该方法返回NodeFilter.FILTER_SKIP。由于NodeFilter是一个抽象的类型，因此不能直接创建它的实例。在必要时，只要创建一个包含acceptNode()方法的对象，然后将这个对象传入createNodeIterator()中即可
如下所示
var filter = function(node){
        return node.tagName.toLowerCase() == "p" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
var iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, filter, false);

*/

//----1、输出所有节点----
var html = document.getElementsByTagName("html")[0];
var iterator = document.createNodeIterator(html, NodeFilter.SHOW_ELEMENT, null, false);
var node = iterator.nextNode();
while(node !== null) {
    console.log(node.tagName);    //输出标签名
    node = iterator.nextNode();
}

//----2、输出特定某类标签----

var div = document.getElementById("div1");
var targetNodeArr = []; //保存所有节点
var filter = function (node) {
  return node.tagName.toLowerCase() == "li"
    ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP;
};
var iterator = document.createNodeIterator(
  div,
  NodeFilter.SHOW_ELEMENT,
  filter,
  false
);

var node = iterator.nextNode();
while (node !== null) {
  console.log(node.tagName); //输出标签名
  targetNodeArr.push(node);
  node = iterator.nextNode();
}
console.log(targetNodeArr);

/*
TreeWalker
　　TreeWalker是NodeIterator的一个更高级的版本。除了包括nextNode()和previousNode()在内的相同的功能之外，这个类型还提供了下列用于在不同方向上遍历DOM结构的方法

parentNode()：遍历到当前节点的父节点
firstChild()：遍历到当前节点的第一个子节点
lastChild()：遍历到当前节点的最后一个子节点
nextSibling()：遍历到当前节点的下一个同辈节点
previousSibling()：遍历到当前节点的上一个同辈节点
　　创建TreeWalker对象要使用document.createTreeWalker()方法，这个方法接受的4个参数与document.createNodelterator()方法相同：作为遍历起点的根节点、要显示的节点类型、过滤器和一个表示是否扩展实体引用的布尔值。由于这两个创建方法很相似，所以很容易用TreeWalker来代替NodeIterator，如下所示

*/

var div = document.getElementById("div1");
var filter = function (node) {
  return node.tagName.toLowerCase() == "li"
    ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP;
};
var walker = document.createTreeWalker(
  div,
  NodeFilter.SHOW_ELEMENT,
  filter,
  false
);
var node = walker.nextNode();
while (node !== null) {
  console.log(node.tagName); //输出标签名
  node = walker.nextNode();
}

/*

　　在这里，filter可以返回的值有所不同。除了NodeFilter.FILTER_ACCEPT和NodeFilter.FILTER_SKIP之外，还可以使用NodeFilter.FILTER_REJECT。在使用NodeIterator对象时，NodeFilter.FILTER_SKIP与NodeFilter.FILTER_REJECT的作用相同：跳过指定的节点。但在使用TreeWalker对象时，NodeFilter.FILTER_SKIP会跳过相应节点继续前进到子树中的下一个节点，而NodeFilter.FILTER_REJECT则会跳过相应节点及该节点的整个子树。例如，将前面例子中的NodeFilter.FILTER_SKIP修改成NodeFilter.FILTER_REJECT，结果就是不会访问任何节点。这是因为第一个返回的节点是<div>，它的标签名不是"li"，于是就会返回NodeFilter.FILTER_REJECT，这意味着遍历会跳过整个子树。在这个例子中，<div>元素是遍历的根节点，于是结果就会停止遍历

　　当然，TreeWalker真正强大的地方在于能够在DOM结构中沿任何方向移动。使用TreeWalker遍历DOM树，即使不定义过滤器，也可以取得所有<li>元素，如下所示
*/

var div = document.getElementById("div1");
var walker = document.createTreeWalker(
  div,
  NodeFilter.SHOW_ELEMENT,
  null,
  false
);
walker.firstChild(); //转到<p>
walker.nextSibling(); //转到<ul>
var node = walker.firstChild(); //转到第一个<li>
while (node !== null) {
  console.log(node.tagName);
  node = walker.nextSibling();
}

/*

　　因为我们知道<li>元素在文挡结构中的位置，所以可以直接定位到那里，即使用firstChild()转到<p>元素，使用nextSibling()转到<ul>元素，然后再使用firstchild()转到第一个<li>元素

　　[注意]此处TreeWalker只返回元素(由传入到createTreeWalker()的第二个参数决定)。因此，可以放心地使用nextSibling()访问每一个<li>元素，直至这个方法最后返回null

　　TreeWalker类型还有一个属性，名叫currentNode，表示任何遍历方法在上一次遍历中返回的节点。通过设置这个属性也可以修改遍历继续进行的起点，如下所示
*/
var node = walker.nextNode();
console.log(node === walker.currentNode); //true
walker.currentNode = document.body; //修改起点

/*
　　与NodeIterator相比，TreeWalker类型在遍历DOM时拥有更大的灵活性。由于IE8-浏览器中没有对应的类型和方法，所以使用遍历的跨浏览器解决方案非常少见

*/
