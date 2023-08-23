// Reference: https://github.com/woai3c/tiny-rendering-engin

### 1.解析 HTML，生成 DOM 树
HTML 解析器的作用就是将一连串的 HTML 文本解析为 DOM 树。比如将这样的 HTML 文本：
```html
 <div class="lightblue test" id=" div " data-index="1">test!</div>

```
解析为一个 DOM 树：
```javascript
{
    "tagName": "div",
    "attributes": {
        "class": "lightblue test",
        "id": "div",
        "data-index": "1"
    },
    "children": [
        {
            "nodeValue": "test!",
            "nodeType": 3
        }
    ],
    "nodeType": 1
}
```

为了让解析器实现起来简单一点，我们需要对 HTML 的功能进行约束：

1.标签必须要成对出现：```<div>...</div>```
2.HTML 属性值必须要有引号包起来 ```<div class="test">...</div>```
3.不支持注释
4.尽量不做错误处理
5.只支持两种类型节点 Element 和 Text

HTML 解析器的入口方法为 parse()，从这开始执行直到遍历完所有 HTML 文本为止：

1.判断当前字符是否为 <，如果是，则当作元素节点来解析，调用 parseElement()，否则调用 parseText()
2.parseText() 比较简单，一直往前遍历字符串，直至遇到 < 字符为止。然后将之前遍历过的所有字符当作 Text 节点的值。
3.parseElement() 则相对复杂一点，它首先要解析出当前的元素标签名称，这段文本用 parseTag() 来解析。
4.然后再进入 parseAttrs() 方法，判断是否有属性节点，如果该节点有 class 或者其他 HTML 属性，则会调用 parseAttr() 把 HTML 属性或者 class 解析出来。
5.至此，整个元素节点的前半段已经解析完了。接下来需要解析它的子节点。这时就会进入无限递归循环回到第一步，继续解析元素节点或文本节点。
6.当所有子节点解析完后，需要调用 parseTag()，看看结束标签名和元素节点的开始标签名是否相同，如果相同，则 parseElement() 或者 parse() 结束，否则报错

### 2.解析 CSS，生成 CSS 规则集合
### 3.生成 Style 树
### 4.生成布局树
### 5.绘制