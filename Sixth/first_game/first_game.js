var global_ = {
    in_start: 0,
    in_path: 0,
    origin_class_name: []
}

function touch_block_of_start() {
    global_.in_start = 1;
    var content = document.getElementById("information");
    content.innerText = "\n";
    document.body.style.cursor = "pointer";
}

function out_block_of_end() {
    if (global_.in_start) {
        global_.in_start = 0;
        if (global_.in_path) {
            var content = document.getElementById("information");
            content.innerText = "You Win";
            global_.in_path = 1;
        }
    }
    document.body.style.cursor = "default";
}


function touch_block_of_end() {
    if (global_.in_start && global_.in_path == 0) {
        var content = document.getElementById("information");
        content.innerText = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
    }
}


function touch_block_of_wall() {
    if (global_.in_start) {
        global_.origin_class_name = this.className;
        this.className = 'wrong';
        global_.in_start = 0;
        global_.in_path = 0;
        var content = document.getElementById("information");
        content.innerText = "You Lose";
    }
    global_.in_start = 0;
}

function out_block_of_wall() {
    if (this.className == 'wrong') {
        this.className = 'walls';
    }
    document.body.style.cursor = "default";
}

function touch_block_of_path() {
    global_.in_path = 1;
}

function out_block_of_path() {
    global_.in_path = 0;
}

// attach walls, S, E and paths with mouseover and mouseout 

window.onload=function () {
    var start = document.getElementById('start');
    var end = document.getElementById("end");
    var wall = document.getElementsByClassName("walls");
    var path_start = document.getElementById("path_1");
    var door = document.getElementById("door")
    start.onmouseover = touch_block_of_start;
    end.onmouseout = out_block_of_end;
    end.onmouseover = touch_block_of_end;
    for (var i = 0; i < wall.length; ++i) {
        wall[i].onmouseover = touch_block_of_wall;
        wall[i].onmouseout = out_block_of_wall;
    }
    path_start.onmouseover = touch_block_of_path;
    door.onmouseout = out_block_of_path;
}

