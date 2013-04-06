exports.getPostId = getPostId;
exports.getCB = getCB;
exports.nextPage = nextPage;
exports.init = init;
exports.convertBody = convertBody;
exports.getFileName = getFileName;
exports.appendToFile = appendToFile;

var fs = require('fs');
var Iconv = require('iconv').Iconv;

var cfg = require('./config');

function getPostId (url) {
	return url.match(/&ID=(\d*&)/)[1];
}

function getCB (errors, window) {
	var $ = window.$;

	var titles = $("form[action='admin_batch.asp?boardid=35']").find(".listtitle").filter(function (index) {
		var innerText = $(this).text();
			rLike = cfg.rLike,
			rDislike = cfg.rDislike;

		return rLike.test(innerText) && !rDislike.test(innerText);
	}).map(function (el) {
		// return $(this).text() + getPostId($(this).find('a').attr('href'));
		return {
			"title": $(this).text(),
			"url": $(this).find('a').attr('href')
		}
	});

	return titles.get();
}

function convertBody (body) {
	body = new Buffer(body, "binary");
	iconv = new Iconv("gbk", "utf8");
	return body = iconv.convert(body).toString();
}

function nextPage (url) {
	var nowIndex = url.charAt(url.length - 1);
	return url.replace(/page=(\d*)/, "page="+(++nowIndex));
}


function init (name) {
	// 可以write一个空
	fs.unlink(getFileName(name));
}

function appendToFile (data, siteName) {
	// 可以添加到文件后面
	fs.appendFile( getFileName(siteName),  data, function (err) {
		if(err) throw err;
		console.log('It\'s saved!');
	});
}

function getFileName (name) {
	return name+ "/" + new Date().getMonth() + "-" + new Date().getDate() +'.json';
}