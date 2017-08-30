var express = require('express');
var router = express();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var path=require('path');
router.use(express.static(path.join(__dirname,"/public")));
/* 上传页面 */
router.get('/', function(req, res, next) {
	res.sendFile(__dirname+"/index2.html");
});
router.listen(3000, function() {
	console.log('start at http://localhost:3000/');
});