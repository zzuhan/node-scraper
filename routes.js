var fs = require('fs');

var helper = require('./helper.js');

exports.index = function (req, res) {
	fs.readFile("site/index.html", function (err, data) {
		if(err) throw err;
		res.end(data);
	});
}

exports.cb = function (req, res) {

	fs.readFile(helper.getFileName('cb'), function (err, data) {
		data = JSON.parse(data.toString());
		// res.write(typeof data);
		var ret = '<div id="wrap">';
		for (var i = 0,len=data.length; i < len; i++) {
				ret +="<a href='http://www.chinabike.net/newbbs/"+ data[i].url +"' target='_blank'>"+data[i].title + "</a><br/><br/>";
		}
		ret += '</div>'
		res.write("<style>a{ text-decoration: none; color: black; } #wrap{ width:720px; margin:0 auto;}</style>")
		res.end(ret);
	});
}

exports.dfh = function (req, res) {
	
	
}

exports.get = function (req, res) {
	
	fs.readFile("site/index.html", function (err, data) {
		if(err) throw err;
		res.end(data);
	});
}

exports.updateCB = function (req, res) {
	res.write('正在更新中...<br/>');
	require('./update').updateCB(req, res);
}

exports.updateDFH = function (req, res) {
	res.write('正在更新中...<br/>');
	require('./update').updateDFH(req, res);
}

exports.notFound = function (req, res) {
	res.end('I\'m sorry 404');
}
