// 主要用来展示生成的结果

var http = require('http');

var routes = require('./routes.js');

var port = 8040,
	routeMap = {
		"/": "index",
		"/cb": "cb",
		"/dfh": "dfh",
		"/get": "get",
		"/updatecb": "updateCB",
		"/updatedfg": "updateDFH"
	};

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
	
	var methodName = routeMap[req.url] || "notFound";

	routes[methodName](req, res);

}).listen(port, '127.0.0.1');

console.log( 'Server Listen at 127.0.0.1:'+port);

// TODO
// 可以做成可定制的需求