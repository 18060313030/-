/*
 * 封装获取子元素节点的方法，保存到类数组中
 */
function getEleChilds(node) {
    let obj = {
        length: 0,
        splice: Array.prototype.splice,
    }
    let eleLength = node.childNodes.length // 父元素节点下的子节点长度

    // 先全部获取到obj中
    for (let i = 0; i < eleLength; i++) {
        let child = node.childNodes[i]
        if (child.nodeType === 1) {
            obj[obj.length] = child
            obj.length++
        }
    }
    return obj
}