var jsdom = require('jsdom'),
	iconv = require('iconv'),
	request = require('request'),
	EventEmitter = require('events').EventEmitter;

var	helper = require('./helper.js'),
	cfg = require('./config.js');

var data = [],
	getLinkLis = new EventEmitter();

var app = {
	cb: {
		html: "",
		scripts: "http://code.jquery.com/jquery.js"
	},
	dfh: {
		html: "",
	}
}

function makeDone (siteName) {
	var count = cfg[siteName].pageCount;

	return function (errors, window) {
		var ret = helper['get'+siteName.toUpperCase()].call(this, errors, window);
		data = data.concat(ret);

		count--;
		console.log(count);
		if(count == 0) getLinkLis.emit('done');
	}
	
}

function updateCB (req, res) {
	helper.init('cb');

	for (var i = 0; i < (cfg['cb'].pageCount); i++) {
		request({ uri: (cfg['cb'].url = helper.nextPage(cfg['cb'].url)), encoding: "binary"},
			function (error, response, body) {
				body = helper.convertBody(body);
				app['cb'].html = body;
				app['cb'].done = makeDone('cb');
				jsdom.env(app.cb);
			}
		);
	};

	getLinkLis.on('done', function () {
		// 给出相应链接
		res.write("<a href='/'>点击查看</a><br/>")
		res.end('更新完毕');
	});

	getLinkLis.on('done', function () {
		console.log( "完成了" );
		helper.appendToFile(JSON.stringify(data), "cb");
	});
}

updateCB();

function updateDFH (req, res) {
	helper.init('dfh');


}

exports.updateCB = updateCB;
exports.updateDFH = updateDFH


