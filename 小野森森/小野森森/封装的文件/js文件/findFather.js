/**
 * 获取指定层级的父级节点
 */
function getFather(node, n) {
    // 传入的数值为空，或不为数字 
    if (n === undefined || typeof(n) !== "number") {
        return this.parentNode
    }
    // 传入的数值小于0
    if (n < 0) {
        return undefined
    }

    // 遍历，一直给当前元素找其父级节点，以此类推，直到找完
    while (n) {
        if (node === null) {
            break
        }
        node = node.parentNode
        n--
    }
    return node
}