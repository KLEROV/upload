var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var formidable = require('formidable'),
	http = require('http'),
	util = require('util'),//将对象转换成字符串
	path=require('path'),
	fs = require('fs');
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"/public")));

app.get('/', function(req, res) {	
	res.sendFile(__dirname+"/index.html");

})
app.get('/json', function(req, res) {
	console.log(req.query.type);
	var type=req.query.type;
	fs.readFile(__dirname+"/json.json",function(err,data){
		if(err) return false;
		data = new Buffer(data).toString();
		res.setHeader('content-type', 'text/html;charset=utf-8');
		res.send(JSON.parse(data).user1);
	})
})
app.post('/post', multipartMiddleware,function(req, res) {
	res.send(JSON.stringify(req.body));
});
app.post('/load', function(req, res) {
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8'; //设置编码			
	form.uploadDir = "./public/"; //设置文件存储路径
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //form.maxFields = 1000;  设置所有文件的大小总和
//	form.on('file', function(name, files) { 
//	});
//	form.on('filed', function(name, files) { 
//	});
	form.on('fileBegin', function(name, files) { //开始时执行
//		console.log(files);
		console.log('开始文件上传....');
	});
	form.on('error', function(err) { //文件上传错误时执行
		console.log('文件上传错误....');
	});
	
	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files);
		var files=JSON.parse(JSON.stringify(files));
		var arr=[files.file,files.file];
		for(var i=0;i<2;i++){
			var oldpath = path.normalize(arr[i].path);//输出规范格式路径
			var newpath = './public/'+arr[i].name;
			if(arr[i].name==""||arr[i].name.trim()==""){
				console.log('文件为空....');
				fs.unlink(oldpath,function(){
					console.log('删除成功');
				});
			}else{
				var oldpath = path.normalize(arr[i].path);//输出规范格式路径
				var newpath = './public/'+arr[i].name;
				fs.rename(oldpath,newpath,function(e){
					if(err){
						console.log(err);
					}
					return ;
				});
			}
			
		}
	});
	form.on('end', function() { //文件上传结束时执行
		console.log('文件上传结束....');
		res.send('文件上传结束....');
	});
	//	res.send('文件上传结束....');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})

