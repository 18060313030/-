// let tab_items = document.getElementsByClassName("tab_item")
// let page_items = document.getElementsByClassName("page_item")

// for (let i = 0; i < tab_items.length; i++) {
//     tab_items[i].onclick = function() {
//         for (let j = 0; j < tab_items.length; j++) {
//             tab_items[j].className = "tab_item"
//             page_items[j].className = "page_item"
//         }
//         this.className += " active"
//         page_items[i].className += " cur"
//     }
// }

;
(function() {
    function TabSwitch(opt) {
        this.tab_items = document.getElementsByClassName(opt.tab_items)
        this.page_items = document.getElementsByClassName(opt.page_items)
        this.tabClick(opt.tab_item, opt.page_item, opt.active, opt.cur)
    }
    TabSwitch.prototype = {
        tabClick: function(tab_item, page_item, active, cur) {
            let tab_items = this.tab_items
            let page_items = this.page_items
            for (let i = 0; i < tab_items.length; i++) {
                tab_items[i].onclick = function() {
                    for (let j = 0; j < tab_items.length; j++) {
                        tab_items[j].className = tab_item
                        page_items[j].className = page_item
                    }
                    this.className = tab_item + " " + active
                    page_items[i].className = page_item + " " + cur
                }
            }
        }
    }
    window.TabSwitch = TabSwitch
})()