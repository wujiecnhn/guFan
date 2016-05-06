var express = require('express');
var app = require('../app');
var db = require('../common/dbconfig/db');
var dataBean = require('../common/base/dataBean.js');

var router = express.Router();

/* GET home page. */
router.get('/:name-:password', function(req, res, next) {

  var name = req.params.name;
  var password = req.params.password;
  var params = [name, password];
  console.log(name+"--------------name");
  db.connect("node");
  db.query("SELECT * from users where name = ? and password = ?",params);
  // res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

    // 定义回调函数
    var callback=function(res,data,params){
        var bean = new dataBean();// 结果集bean

        // 判断用户名密码是否正确
        if(data.length == 1 && data[0].name == params[0] && data[0].password == params[1]){
            // 为结果集赋值
            bean.info = "success";
            bean.obj = data[0];
            bean.list = null;
            bean.status = 1;
            // 返回结果集给浏览器
            res.send(JSON.stringify(bean));
        } else {
            // 登录验证失败 返回错误代码
            // 为结果集赋值
            bean.info = "failure";
            bean.obj = data[0];
            bean.list = null;
            bean.status = 0;
            res.send(JSON.stringify(bean));
        }

    }

    /*var callback=function(res,data){

    }*/
    // 接收客户端参数
    var name = req.body.name;
    var password = req.body.password;
    var params = [name, password];
    console.log(name+"--------------name");
    // 指定操作数据库
    db.connect("node");
    // 执行查询sql
    db.query("SELECT * from users where name = ? and password = ?",params,res,callback);
    //rowsres.send('respond with a resource');
});

module.exports = router;
