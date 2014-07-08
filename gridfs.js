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
	//���ַ�ʽ���ļ���Ҫ��ȡ�����ļ���Ϣ������ļ�������ܻᵼ���ڴ����
	gridFs.put(buffer, {filename:'fs'}, function(err, fileInfo) {
		if(!err) {
			console.log('write file success!');
		}

		//ͨ��ID��ȡ�ļ�
		gridFs.get(fileInfo._id, function(err, data) {
			if(err) throw err;
			console.log("data=================="+data);
			//ʹ��nodejs ԭ��apiд���ļ���Ӳ��
			fs.writeFile('C:\\work\\20140516\\dataO1.txt', data, 'utf-8', function(err) {
				if(!err) {
					console.log('write file to local file system succeed!');
				}else{
					console.log(err);
				}
			});
		})
	});

	//ʹ��GridStore��ʽ�����ļ�
	var gridStore = new mongo.GridStore(db, 'store', 'w', {root: 'fs'});

	gridStore.writeFile('C:\\work\\20140516\\dataI2.txt', function(err, fileInfo) {

		if(err) throw err;
		console.log("filename======================"+fileInfo.filename);
		//�½�һ��gridstore���ڶ�ȡ�ļ�
		var readGrid = new mongo.GridStore(db, fileInfo.filename, 'r');
		readGrid.open(function(err, gridStore) {
			//��ȡ����
			readGrid.read(function(err, data) {
				console.log("data======================"+data);
				//д�뵽�����ļ�ϵͳ
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