var tagArr1 = {};
var tagArr2 = {};
function countTag1(node) {
  if (node.nodeType === 1) {
    var thisName = node.tagName;
    if (!tagArr1[thisName]) {
      tagArr1[thisName] = 1;
    } else {
      tagArr1[thisName]++;
    }
  }
}
function countTag2(node) {
  if (node.nodeType === 1) {
    var thisName = node.tagName;
    if (!tagArr2[thisName]) {
      tagArr2[thisName] = 1;
    } else {
      tagArr2[thisName]++;
    }
  }
}
function findNodeDFS(node, callback) {
  let stack = [node];
  while (stack.length) {
    const currentNode = stack.pop();
    callback(currentNode);
    if (currentNode.nodeType === 1 || currentNode.nodeType === 9) {
      // 标签节点或根节点
      if (currentNode.children.length > 0) {
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          if (currentNode.children[i].nodeType === 1) {
            stack.push(currentNode.children[i]);
          }
        }
      }
    }
  }
}

function findNodeBFS(node, callback) {
  let queue = [];
  while (node) {
    if (node.nodeType === 1 || node.nodeType === 9) {
      // 标签节点或根节点
      callback(node);
      if (node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].nodeType === 1) {
            queue.push(node.children[i]);
          }
        }
      }
      node = queue.shift();
    }
  }
}
findNode1(document, countTag1);
console.log(tagArr1);
findNode2(document, countTag2);
console.log(tagArr2);
