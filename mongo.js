var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',28018,{auto_reconnect:true});
var db = new mongodb.Db('test',server,{safe:true});
db.open(function(err,db){
if(!err)
{   
  db.collection('user',{safe:true},function(err,collection){
	  var tmp1 = {title:'hello'};
	  var tmp2 = {title:'world'};
	  collection.insert([tmp1,tmp2],{safe:true},function(err,result){
		  console.log(result);
	  }); 
	  collection.find().toArray(function(err,docs){
		  console.log('find');
		  console.log(docs);
	  }); 
	  collection.findOne(function(err,doc){
		  console.log('findOne');
		  console.log(doc);
	  }); 
});	  
}
});  