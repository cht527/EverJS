{
  /* 
<div id="doubleY"  style="width: 600px;height:400px;">
	<div id="child">
		<a href="www.baidu">childSpan</a>
	</div>
	<p style="font-size: 14px">ppp</p>
	<span color="#888">span</span>
</div> 
*/
}

let template = document.getElementById("doubleY");
//console.log(template.trim().replace(/\s\t/g,''));
function JSONTree(parent) {
  var nAttrLen = 0,
    nLength = 0,
    text = "";
  if (parent.hasChildNodes()) {
    for (
      var oNode, sProp, vContent, nItem = 0;
      nItem < parent.childNodes.length;
      nItem++
    ) {
      oNode = parent.childNodes[nItem];
      if (((oNode.nodeType - 1) | 1) === 3) {
        // nodeType is "Text" (3) or "CDATASection" (4)
        text += oNode.nodeType === 3 ? oNode.nodeValue.trim() : oNode.nodeValue;
      } else if (oNode.nodeType === 1 && !oNode.prefix) {
        // nodeType is "Element" (1)
        sProp = oNode.nodeName.toLowerCase();
        vContent = new JSONTree(oNode);
        if (this.hasOwnProperty(sProp)) {
          if (this[sProp].constructor !== Array) {
            this[sProp] = [this[sProp]];
          }
          this[sProp].push(vContent);
        } else {
          this[sProp] = vContent;
          nLength++;
        }
      }
    }
    this.value = !text ? null : text;
  } else {
    this.value = null;
  }

  if (parent.hasAttributes()) {
    var oAttrib;
    this.attributes = {};
    for (nAttrLen; nAttrLen < parent.attributes.length; nAttrLen++) {
      oAttrib = parent.attributes[nAttrLen];
      this.attributes[oAttrib.name.toLowerCase()] = !oAttrib.value.trim()
        ? null
        : oAttrib.value.trim();
    }
  }
}

console.log(JSON.stringify(new JSONTree(template)));
