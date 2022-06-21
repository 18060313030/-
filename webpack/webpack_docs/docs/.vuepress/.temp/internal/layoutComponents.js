import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("D:/HTML5/HTML5-CSS3/webpack/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("D:/HTML5/HTML5-CSS3/webpack/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
