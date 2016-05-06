/**
 * Created by gufan on 2016/5/5.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendfile(__dirname.replace('routes', 'views') + req.baseUrl);
});

module.exports = router;
