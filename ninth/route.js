// 路由分配不同的函数处理
function route(handle, pathname, responce, postData, query) {
    console.log("About to route a request for " + pathname);
    if (pathname.match(/([\.css|\.html|\.js|\.jpeg])$/)) {
        handle['start'](responce, pathname);
    } else {
        console.log(typeof handle[pathname] == "function");
        if (typeof handle[pathname] === "function") {
            handle[pathname](postData, query, responce);
        }
    }
}
exports.route = route;