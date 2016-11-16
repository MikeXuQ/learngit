var server = require("./server");
var router = require("./route");
var handler = require("./handle");
var handles = {};
handles["start"] = handler.load;
handles["/register"] = handler.register;
handles["/"] = handler.signup;
server.start(router.route, handles);