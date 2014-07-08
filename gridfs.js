var mongo = require('mongodb');
var fs = require('fs');

var server = new mongo.Server('localhost', 28018, {
	auto_reconnect: true
});
var db = new mongo.Db('mydb', server, {safe:true});

db.open(function(err, db) {
	if(err) throw err;

	var gridFs = new mongo.Grid(db, 'fs');
	var buffer = fs.readFileSync('C:\\work\\20140516\\dataI1.txt');
	//该种方式存文件需要读取所有文件信息，如果文件过大可能会导致内存溢出
	gridFs.put(buffer, {filename:'fs'}, function(err, fileInfo) {
		if(!err) {
			console.log('write file success!');
		}

		//通过ID获取文件
		gridFs.get(fileInfo._id, function(err, data) {
			if(err) throw err;
			console.log("data=================="+data);
			//使用nodejs 原生api写入文件到硬盘
			fs.writeFile('C:\\work\\20140516\\dataO1.txt', data, 'utf-8', function(err) {
				if(!err) {
					console.log('write file to local file system succeed!');
				}else{
					console.log(err);
				}
			});
		})
	});

	//使用GridStore方式操作文件
	var gridStore = new mongo.GridStore(db, 'store', 'w', {root: 'fs'});

	gridStore.writeFile('C:\\work\\20140516\\dataI2.txt', function(err, fileInfo) {

		if(err) throw err;
		console.log("filename======================"+fileInfo.filename);
		//新建一个gridstore用于读取文件
		var readGrid = new mongo.GridStore(db, fileInfo.filename, 'r');
		readGrid.open(function(err, gridStore) {
			//读取数据
			readGrid.read(function(err, data) {
				console.log("data======================"+data);
				//写入到本地文件系统
				fs.writeFile('C:\\work\\20140516\\dataO2.txt', data, function(err) {
					if(!err) {
						console.log('write file to local file system succeed!');
					}else{
						console.log(err);
					}
				});
				db.close();
			});
		});
	});


});