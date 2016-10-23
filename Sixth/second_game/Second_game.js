var global_ = {
    seconds: 30,
    ifstart: 0,
    score: 0,
    time: 1,
    contain: [],
    timeId: 0
}

function initial() {
    global_.time = 1;
    global_.timeId = 0;
    global_.score = 0;
    global_.ifstart = 0;
}

function draw_circle() {
    var display = document.getElementById("display");
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            var mole = document.createElement("button");
            mole.className = "hole";
            global_.contain[10*i+j] = mole;
            mole.onclick = button_click;
            frag.appendChild(mole);
        }
        var newline = document.createElement("br");
        frag.appendChild(newline);
    }
    display.appendChild(frag);
}

function show_time() {
    var _time = document.getElementById("time");
    _time.value = global_.seconds - global_.time;
    ++global_.time;
    if (global_.time > 30) {
        var condition = document.getElementById("condition");
        condition.value = "Game over";
        clearInterval(timeId);
        alert("Game over.\nYour score is " + global_.score);
        initial();
        for (var i = 0; i < 60; ++i) {
            global_.contain[i].className = 'hole';
        }
    }
}

function button_click() {
    if (this.className == 'change' && global_.seconds - global_.time > 0) {
        ++global_.score;
        var _score = document.getElementById("score");
        _score.value = global_.score;
        this.className = 'hole';
        update_mole();
    } else if (this.className != 'change' && global_.seconds - global_.time > 0) {
        if (global_.score > 0) {
            --global_.score;
            var _score = document.getElementById("score");
            _score.value = global_.score;
        }
    }
}

function update_mole() {
    var id = Math.floor(Math.random() * 60);
    global_.contain[id].className = 'change';
}

function start() {
    if (global_.ifstart  == 0) {
        var condition = document.getElementById("condition");
        condition.value = "Playing";
        var _score = document.getElementById("score");
        _score.value = global_.score;
        var _time = document.getElementById("time");
        _time.value = global_.seconds - global_.time + 1;
        timeId = window.setInterval("show_time()", 1000);
        update_mole();
        global_.ifstart = 1;
    } else {
        clearInterval(timeId);
        for (var i = 0; i < 60; ++i) {
            global_.contain[i].className = 'hole';
        }
        global_.ifstart = 0;
    }
}

window.onload=function() {
    var _score = document.getElementById("score");
    _score.value = 0;
    draw_circle();
    var _start = document.getElementById("switch");
    _start.onclick=start;
}

