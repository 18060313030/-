const express = require("express")
const app = express()
const compression = require('compression');
// gzip压缩
app.use(compression());
// 托管静态文件
app.use(express.static("./dist"))

app.listen(3333, () => {
    console.log("srver run at http://127.0.0.1:3333");
})