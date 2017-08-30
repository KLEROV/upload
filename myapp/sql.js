var express = require('express'),
  app = express(),	
  fs = require('fs'),
  path=require('path'),
  util=require('util');
  var mysql=require('mysql');
  var TEST_DATABASE='ceshi';
  var TEST_TABLE='user';
  var client=mysql.createConnection({
  	user:'root',
  	password:''
  })
  client.connect();
  client.query('use'+TEST_DATABASE);
  client.query(
  	'SLECT * FORM ' +TEST_TABLE,
  	function selectCb(err,result,fields){
  		if(err){
  			throw err;
  		}
  		if(result){
  			for(var i=0;i<result.length;i++){
  				console.log("%d\t%s\t%s",result[i].id,result[i].name,result[i].age);
  			}
  		}
  		client.end();
  	}
  )
  app.get('/',function(req,res){
  	res.send('123');
  })
	app.listen(3000,function(){
		console.log('http://localhost:3000 start');
	});
