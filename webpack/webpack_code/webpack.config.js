let path = require("path")

module.exports = {
    // 模式--开发模式
    mode: "development",

    // 入口文件--相对路径
    entry: "./src/main.js",

    // 打包输出配置--绝对路径
    output: {
        // path: 所有文件的打包输出路径
        // resolve 返回一个绝对路径   __dirname: 当前文件所在的文件夹路径
        path: path.resolve(__dirname, "dist"),
        // filename：入口文件打包输出的文件名
        filename: "static/js/main.js",
        // 自动清空上次打包的结果，webpack4是使用插件
    },

    // 加载器: 处理webpack无法处理的除js以外的文件
    module: {
        rules: [
            // CSS及CSS预处理器
            {
                test: /\.css$/,
                // loader:"", 只能使用单个loader use可以使用多个loader
                //[将js中的css通过创建一个 Style 标签，放置到html页面中生效, 负责将 Css 文件编译成 Webpack 能识别的模块到js文件中]
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"] // less-loader将less文件编写出css样式文件
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"] // sass-loade将sass或scss文件编写成css样式文件
            },
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"] // stylus-loade将sass或scss文件编写成css样式文件
            },
            // 图片处理
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                    }
                },
                // 将图片资源打包到指定目录
                generator: {
                    // hash：文件名(hash:10表示取前10位)  ext：文件后缀名   query：其他参数
                    filename: 'static/images/[hash:10][ext][query]'
                }
            }
        ]
    },

    // 插件
    plugins: [

    ]
}