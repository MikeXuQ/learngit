var fs = require("fs");
var url = require("url");
var queryString = require("querystring")
var save = [];

// 加载html,css,js文件和图片
function load(responce, pathname) {
    console.log("load");
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            responce.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            if (pathname.substr(1).toString().match(/\.css/)) {
                responce.writeHead(200, {'Content-Type': 'text/css'});
            }
            if (pathname.substr(1).toString().match(/\.html/)) {
                responce.writeHead(200, {'Content-Type': 'text/html'});
            }
            if (pathname.substr(1).toString().match(/\.js/)) {
                responce.writeHead(200, {'Content-Type': 'text/javescript'});
            }
            if (pathname.substr(1).toString().match(/\.jpeg/)) {
                responce.writeHead(200, {'Content-Type': 'image/jpeg'});
                console.log("jpeg");
            }
            console.log('test');
            responce.write(data, "binary");
            responce.end();
        }
    });
}

// 比较已经缓存的数据与注册数据
function compare(data, arr) {
    var repeat = "";
    var key = 1;
    console.log(save);
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i]["Username"] == data["Username"]) {
            repeat += "Username";
            key = 0;
        }
        if (arr[i]["ID"] == data["ID"]) {
            if (repeat.length == 0) {
                repeat += "ID";
            } else {
                repeat += ",ID";
            }
            key = 0;
        }
        if (arr[i]["Phone"] == data["Phone"]) {
            if (repeat.length == 0) {
                repeat += "Phone";
            } else {
                repeat += ",Phone";
            }
            key = 0;
        }
        if (arr[i]["Email"] == data["Email"]) {
            if (repeat.length == 0) {
                repeat += "Email";
            } else {
                repeat += ",Email";
            }
            break;
        }
        if (!key) break;
    }
    return repeat;
}

// 注册信息的处理
function register(postData, query, responce) {
    console.log("register");
    var change = queryString.parse(postData);
    console.log(change);
    if (compare(change, save) == "") {
        save.push(change);
        console.log(change["Username"]);
        responce.end(change["Username"]);
    } else {
        responce.end("\"" + compare(change, save));
    }
}

// 查找登录用户
function find(data, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i]["Username"] == data) {
            return arr[i];
        }
    }
}

// 登录，如果用户存在则显示详情，如果不存在则返回注册页面
function signup(postData, query, responce) {
    console.log("signup");
    var infor = queryString.parse(query);
    console.log(query);
    console.log(infor);
    fs.readFile("./content.html", function(err, data) {
        if (err) {
            console.log(err);
            responce.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            var user = find(infor["Username"], save);
            console.log(user);
            if (typeof user !== "undefined") {
                responce.writeHead(200, {'Content-Type': 'text/html'});
                var content = data.toString();
                content = content.replace("{user}", user["Username"]);
                content = content.replace("{id}", user["ID"]);
                content = content.replace("{phone}", user["Phone"]);
                content = content.replace("{email}", user["Email"]);
                responce.write(content);
                responce.end();
            } else {
                fs.readFile("./index.html", function(err, data) {
                    if (err) {
                        console.log(err);
                        responce.writeHead(404, {'Content-Type': 'text/html'});
                    } else {
                        responce.writeHead(200, {'Content-Type': 'text/html'});
                        responce.end(data.toString());
                    }
                });
            }
        }
    });
}

exports.register = register;
exports.load = load;
exports.signup = signup;
