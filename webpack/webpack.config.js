const path = require("path") // 处理文件路径的模块
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包自动删除旧的dist文件的第三方插件模块

// html-webpack-plugin 是 webpack 中的 HTML 插件，可以通过此插件自定制 index.html 页面的内容。
// 需求：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，复制到项目根目录中一份！
const HtmlPlugin = require("html-webpack-plugin") // 导入插件，得到一个构造函数
// new一个HtmlPlugin构造函数的实例对象
const htmlPlugin = new HtmlPlugin({
    template: "./src/index.html", // 需要复制哪个文件
    filename: "./index.html" // 文件复制的名称和路径
})

// 使用node.js的导出语法，向外导出一个webpack的配置文件
module.exports = {
    mode: "development", // mode用来指定构建模式，可选值有development和production
    devtool: "eval-source-map", // 保证运行时报错提示错误位置的行数与源代码的行数相同，生产环境下需要改成nosources-source-map或直接不配置devtool
    entry: path.join(__dirname, "./src/index.js"), // 指定要处理哪个文件
    output: {
        path: path.join(__dirname, "./dist"), // 指定生成的文件要放到哪里
        filename: "js/main.js"  // webpack打包时将js文件放置在dist的js文件夹的目录下
    },
    plugins: [htmlPlugin, new CleanWebpackPlugin()], // 通过plugin节点，使插件生效
    devServer: {
        open: true, // 初次打包文件(npm run dev)，自动打开浏览器
        host: "127.0.0.1", // 指定的地址
        port: 80, // 指定的端口号
    },
    // 在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块。其他非 .js 后缀名结尾的模块，
    // webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！
    module: {
        rules: [
            // test 表示匹配的文件类型， use 表示对应要调用的 loader
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            // limit 用来指定图片的大小，单位是字节（byte）只有 ≤ limit 大小的图片，才会被转为 base64 格式的图片
            // outputPath=images 指定将图片在webpack打包时，存放在dist/images文件夹下
            {test: /\.jpg|jpeg|gif|png$/, use: "url-loader?limit=22229&outputPath=images"},
            // webpack 只能打包处理一部分高级的 JavaScript 语法。对于那些 webpack 无法处理的高级 js 语法，需要借
            // 助于 babel-loader 进行打包处理
            // 使用exclude排除指定项，因为第三方模块不需要被打包
            {test: /\.js$/, use: ["babel-loader"], exclude: /node_modules/}
        ]
    },
    resolve: {
        alias: {
            // 告诉webpack，@表示src这一层目录
            "@": path.join(__dirname, "./src/")
        }
    }
}