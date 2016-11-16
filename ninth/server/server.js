var http = require('http');
var url = require('url');

// 建立服务器，添加数据传输监听器
function start (route, handle) {
    function onRequest(request, responce) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;    
        console.log("Request for " + pathname + " recieved.");        
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });
        request.addListener("end", function() {
            route(handle, pathname, responce, postData, url.parse(request.url).query);
        });
    }
    http.createServer(onRequest).listen(8000);
    console.log('Sever running at http://127.0.0.1:8000/index.html');
}
exports.start = start;

