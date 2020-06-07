const http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');//引入body parser用于解析post的body

app.use(bodyParser.json());//使用body parser用于解析post的body
app.use(bodyParser.urlencoded({ extended: true }));//使用body parser用于解析post的body

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

// 加 登录后  测试用户  没有ssh用  https

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
    res.send('This is test message!');
});

app.get('/json', function (req, res) { //添加的代码
    let myjson = {
        name : '盒装牛奶',
        price : '3元',
        date : '2018年1月1日'
    };
    res.send(myjson);
});

app.use(express.static('public'));

app.post('/password', function (req, res) {  //接收POST请求
    let data = req.body;   //解析body中的信息
    console.log(data);
    let message1 = {success:true};
    let message2 = {success:false};
    if(data.user==='hjh'&&data.password==='123456'){ //判断并返回结果
        res.send(message1);
    }
    else res.send(message2);
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
