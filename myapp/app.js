var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
//var multipartMiddleware = require('multiparty');
//var urlencodeParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

// 主页面输出
app.get('/',function(rep,res){
	res.send("hello world!");
});

//post 请求
app.post('/',function(rep,res){
	console.log("主页 POST");
	res.send("Hello POST");
});
//del_user 请求
app.get('/del_user',function(rep,res){
	console.log("del_user");
	res.send("del_user");
});
//list_user 请求
app.get('/list_user',function(rep,res){
	console.log("list_user");
	res.send("list_user");
});
//abcd请求
app.get('/ab*cd',function(rep,res){
	console.log("ab*cd");
	res.send("abcd");
});
//跳转请求 登录
app.get('/login.html',function(rep,res){
	console.log("login.html");
	res.sendFile(__dirname+"/login.html");
});
//login 请求
app.post('/login',function(req,res){
	console.log("login POST");
	response ={
		user_name:req.body.user_name,
	        pwd:req.body.pwd
	};

	res.send(JSON.stringify(response));
});
//contentList 请求
app.get('/list',function(req,res){
        var type = req.query.type;
	console.log("parme:"+type);
	response={};
	if(0==type){//书籍
		response={"data": [
			{
				"name": "《皇帝内经素问》"
			},
			{
				"name": "《四圣心源》"
			},
			{
				"name": "《本草求真》"
			},
			{
				"name": "《医宗金鉴》"
			},
			{
				"name": "《医学衷中参西录》"
			},
			{
				"name": "《景岳全书》"
			},
			{
				"name": "《园运动的古中医学》"
			}
			]};
	}else if(1==type){//中草药
		response={
			"data": [
			{
				"name": "人参"
			},
			{
				"name": "党参"
			},
			{
				"name": "太子参"
			},
			{
				"name": "三七"
			},
			{
				"name": "柴胡"
			},
			{
				"name": "菊花"
			},
			{
				"name": "黄连"
			}
			]
		};
	}else if(2==type){//方剂
response={
		"data": [
		{
			"name": "四君子汤"
		},
		{
			"name": "八位地黄丸"
		},
		{
			"name": "麻黄汤"
		},
		{
			"name": "调胃承气汤"
		},
		{
			"name": "温胆汤"
		},
		{
			"name": "猪苓汤"
		},
		{
			"name": "百合固金汤"
		}
		]
};

	   	
	}
	res.send(JSON.stringify(response));
});

//jsonList
app.get('/home',function(req,res){
	console.log("=======HOME========");
	response =  {
		"data": [
		{
			"ca": "书籍",
			"value": [
			{
				"name": "《皇帝内经素问》"
			},
			{
				"name": "《四圣心源》"
			},
			{
				"name": "《本草求真》"
			},
			{
				"name": "《医宗金鉴》"
			},
			{
				"name": "《医学衷中参西录》"
			},
			{
				"name": "《景岳全书》"
			},
			{
				"name": "《园运动的古中医学》"
			}
			]
		},
		{
			"ca": "中草药",
			"value": [
			{
				"name": "人参"
			},
			{
				"name": "党参"
			},
			{
				"name": "太子参"
			},
			{
				"name": "三七"
			},
			{
				"name": "柴胡"
			},
			{
				"name": "菊花"
			},
			{
				"name": "黄连"
			}
			]
		},
		{
			"ca": "方剂",
			"value": [
			{
				"name": "四君子汤"
			},
			{
				"name": "八位地黄丸"
			},
			{
				"name": "麻黄汤"
			},
			{
				"name": "调胃承气汤"
			},
			{
				"name": "温胆汤"
			},
			{
				"name": "猪苓汤"
			},
			{
				"name": "百合固金汤"
			}
			]
		}
		]
	}	    
	res.send(JSON.stringify(response));
});

//文件上传
//跳转请求 文件上传
//app.get('/upload.html',function(rep,res){
//	console.log("upload.html");
//	res.sendFile(__dirname+"/upload.html");
//});
////文件上传 请求
//app.post('/file_upload',multipartMiddleware,function(req,res){
//	console.log("文件上传！=================");
//	console.log(req.files);
//	
//	multipartMiddleware.encoding = "utf-8"; 
//	multipartMiddleware.uploadDir=__dirname+"/";
//	multipartMiddleware.maxFilesSize = 2*1024*1024;
//        multipartMiddleware.parse(req,function(err,fields,files){
//		console.log(files.originalFilename);
//		console.log(files.path);
//		fs.renameSync(files.path,files.originalFilename);
//
//		}); }); 
/**
	var des_file =__dirname+"/"+req.files.originalFilename;
	fs.readFile(req.files.path,function(err,data){
		fs.writeFile(des_file,data,function(err){
			if(err){
				console.log(err);
			}else{
				response ={
					message:"File uploaded successfully!",
					filename:req.files[0].originalname
				};
			}
			console.log(respose);
			res.end(JSON.stringify(respose));
		});
		});});

*/
	

var server = app.listen(8088,function(){
	var host =server.address().address;
	var port =server.address().port;
	console.log("应用实例，访问地址为%s,%s",host,port);
});
