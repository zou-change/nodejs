/**
 * 1.安装  express-session

cnpm install express-session  --save
*
*
* 2.引入

 var session = require("express-session");

 3.设置官方文档提供的中间件

 app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true
 }))
 * 
 */
var session = require("express-session");

// 4.使用设置值
 req.session.username = "张三";

//获取值 
req.session.username

    //req.session.cookie.maxAge=0;  /*改变cookie的过期时间*/
  //销毁
  req.session.destroy(function(err){
    console.log(err);
})
