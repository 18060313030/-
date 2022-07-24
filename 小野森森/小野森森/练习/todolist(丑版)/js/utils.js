/*
 * 绑定监听事件的兼容性写法
 */

function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn)
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, function() {
            handler.call(ele)
        })
    } else {
        ele["on" + type] = fn
    }
}

/*
 * 处理获取页面滚动距离   兼容性处理
 */

function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            // 在IE678版本中，怪异模式不支持document.documentElement.scrollLeft，标准模式不支持document.body.scrollLeft
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
/*
 * 获取视口的宽高   兼容性处理
 */
function getViewPortSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        // 兼容性处理，如果模式为怪异模式，就使用怪异模式兼容的方法，否则使用标准模式兼容的方法
        if (document.compatMode === "BackCompat") {
            return {
                width: document.body.innerWidth,
                height: document.body.innerHeight
            }
        } else {
            return {
                width: document.documentElement.innerWidth,
                height: document.documentElement.innerHeight
            }
        }
    }
}
/*
 * 返回页面全部的宽高   兼容性设置
 */
function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}

/*
 * 获取值的方法，获取的值比较准
 */
function getEleValue(ele, prop, wele) {
    // 判断该属性方法是否存在
    if (window.getComputedStyle) {
        if (prop) { // 是否有传入指定的属性
            return window.getComputedStyle(ele, wele || null)[prop]
        } else { // 没有传入指定的属性，返回整个集合
            return window.getComputedStyle(ele, wele || null)
        }
    } else { // 使用ie8及以下兼容的方法
        if (prop) {
            return ele.currentStyle[prop]
        } else {
            return ele.currentStyle
        }
    }
}
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

/*
 * pageX/Y可以计算出包含滚动距离的鼠标点击坐标,但是有兼容性问题
 * 封装一个相同功能的函数
 * 求出滚动出视口的距离 + 当前视口的距离 - 偏移的距离
 * 有点问题,当滚动条拉动到【底部】，window.pageYOffset获取的值会有0.5-0.8的差距
 * 拉动到【顶部】，就又恢复了
 */
function pageResemble(e) {
    let scrollY = getScrollOffset().top, // 滚动出屏幕的距离
        scrollX = getScrollOffset().left,
        offsetX = document.documentElement.clientLeft || 0, // 文档偏移值,IE8之外的浏览器可能该值为undefined
        offsetY = document.documentElement.clientTop || 0

    return {
        // left: Math.round(e.clientX + scrollX - offsetX),
        // top: Math.round(e.clientY + scrollY - offsetY)
        left: e.clientX + scrollX - offsetX,
        top: e.clientY + scrollY - offsetY
    }
}

/**
 * 移出事件绑定监听的封装函数
 */

function removeEvent(ele, eventName, fn) {
    if (ele.addEventListener) {
        ele.removeEventListener(eventName, fn)
    } else if (ele.attachEvent) {
        ele.detachEvent("on" + eventName, fn)
    } else {
        ele["on" + eventName] = null
    }
}