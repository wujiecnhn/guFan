/**
 * Created by gufan on 2016/5/5.
 */
var mysql = require('mysql');

var db = {};
var connection;
db.connect=function(dataBase){
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root'
    });
    connection.connect();
    connection.query("use " + dataBase);
}
db.query= function (sql,params,res,callback) {
    connection.query(sql, params, function(err, rows, fields) {
        if (err) throw err;
        if(rows)
        {
            for(var i = 0; i < rows.length; i++)
            {
                console.log("%d\t%s\t%s", rows[i].id, rows[i].name, rows[i].password);
            }
        }
        console.log('The solution is: ', rows[0]);
        connection.end();
        callback&&callback(res,rows,params);
    });

}


//
module.exports = db;
