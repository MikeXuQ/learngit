var _global = {
    contain: [],
    num: 0,
    white: "",
    start: 0,
    timeId: 0,
    _time: 0,
    steps: 0
}

// jugde whether it should move

function change(pos_origin, pos_change) {
    var flat;
    if (pos_change >= 0 && pos_change <= 15) {
        if (_global.contain[pos_change].className == _global.white) {
            switch_(pos_origin, pos_change);
            ++_global.steps;
            var step = document.getElementsByClassName('steps');
            step[0].value = _global.steps;
            if (win()) {
                alert("congradulations!");
                initial();
            }
        }
    }
}

// an onclick event for 15 blocks

function move() {
    if (_global.start) {
        var len = this.className.length;
        var row = parseInt(this.className[len - 2]);
        var column = parseInt(this.className[len - 1]);
        var pos = 4 * row + column;
        var left = pos - 1;
        var right = pos + 1;
        var up = pos - 4;
        var down = pos + 4;
        if (row === 0) {
            change(pos, down);
            if (column === 0) {
                change(pos, right);
            } else if (column === 3) {
                change(pos, left);
            } else {
                change(pos, right);
                change(pos, left);
            }
        } else if (row === 3) {
            change(pos, up);
            if (column === 0) {
                change(pos, right);
            } else if (column === 3) {
                change(pos, left);
            } else {
                change(pos, right);
                change(pos, left);
            }
        } else {
            change(pos, up);
            change(pos, down);
            change(pos, left);
            change(pos, right);
        }
    }
}

// add 16 blocks in the div named game

function draw_pic() {
    var location = document.getElementsByClassName('game');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 4; ++i) {
        for (var x = 0; x < 4; ++x) {
            var block = document.createElement('div');
            block.onclick = move;
            block.className = 'b0 ' + 'block' + ' a' + i + x + ' p' + i + x;
            _global.contain[i * 4 + x] = block;
            frag.appendChild(block);
        }
        var newline = document.createElement("br");
        frag.appendChild(newline);
    }
    _global.contain[15].className = 'white p33';
    _global.white = 'white p33';
    location[0].appendChild(frag);
}

function win() {
    for (var i = 0; i < 15; ++i) {
        var str = _global.contain[i].className;
        if (_global.contain[i].className.length < 10) {
            var pos = parseInt(str.substr(-1)) + parseInt(str.substr(-2, 1)) * 4;
            if (pos != 15) {
                return false;
            }
        } else {
            var pos_to = parseInt(str.substr(-6, 1)) * 4 + parseInt(str.substr(-5, 1));
            var pos_now = parseInt(str.substr(-2, 1) * 4) + parseInt(str.substr(-1));
            if (pos_to != pos_now) {
                return false;
            }
        }
    }
    return true;
}

// restroe the picture

function initial() {
    if (_global.start) {
        var q = 3;
        var i = 0;
        while (q--) {
            for (i = 0; i < 16; ++i) {
                var str = _global.contain[i].className;
                if (_global.contain[i].className.length < 10) {
                    var pos = parseInt(str.substr(-1)) + parseInt(str.substr(-2, 1)) * 4;
                    switch_(pos, 15);
                } else {
                    var pos_to = parseInt(str.substr(-6, 1)) * 4 + parseInt(str.substr(-5, 1));
                    var pos_now = parseInt(str.substr(-2, 1) * 4) + parseInt(str.substr(-1));
                    switch_(pos_now, pos_to);
                }
            }
        }
        var save = [];
        for (var x = 0; x < 16; ++x) {
            var str = _global.contain[x].className;
            if (_global.contain[x].className.length < 10) {
                var pos = parseInt(str.substr(-1)) + parseInt(str.substr(-2, 1)) * 4;
                save[pos] = str;
            } else {
                var pos = parseInt(str.substr(-6, 1)) * 4 + parseInt(str.substr(-5, 1));
                save[pos] = str;
            }
        }
        for (var x = 0; x < 16; ++x) {
            _global.contain[x].className = save[x];
        }
        var button = document.getElementsByClassName('cl1');
        button[1].className = 'change cl0';
        button[0].className = 'start cl0';
        clearInterval(_global.timeId);
        var time_ = document.getElementsByClassName('time');
        time_[0].value = 0;
        _global.start = 0;
        _global.timeId = 0;
        _global.time_ = 0;
        _global.steps = 0;
        var step = document.getElementsByClassName('steps');
        step[0].value = _global.steps;
        _global.white = 'white p33';
    }
}

// jugde the picture whether has a solution by the reverse pairs

function able_to_solve() {
    var save = [];
    var pos_x = 0;
    var pos_y = 0;
    for (var i = 0; i < 16; ++i) {
        var len = _global.contain[i].className.length;
        if (len < 10) {
            var x = '3';
            var y = '3';
            pos_y = Math.floor(i / 4);
            pos_x = i % 4;
            save[i] = x + y;
        } else {
            var x = _global.contain[i].className.substr(-6, 1);
            var y = _global.contain[i].className.substr(-5, 1);
            save[i] = (x + y);
        }
    }
    var count = 0;
    for (var i = 0; i < 15; ++i) {
        for (var x = i + 1; x < 16; ++x) {
            if (save[i] > save[x]) {
                ++count;
            }
        }
    }
    count = count + pos_y + pos_x;
    return count%2 == 0;
}

// switch_ two blocks by change their className

function switch_(pos_1, pos_2) {
    var str1 = "", str2 = "", tail1 = "", tail2 ="";
    var flat = _global.contain[pos_1].className;
    var len_2 = _global.contain[pos_2].className.length;
    var len_1 = flat.length;
    var i;
    for (i = 0; i < len_1 - 2; ++i) {
        str1 += flat[i];
    }
    tail1 = flat[i] + flat[i + 1];
    for (i = 0; i < len_2 - 2; ++i) {
        str2 += _global.contain[pos_2].className[i];
    }
    tail2 = _global.contain[pos_2].className[i] + _global.contain[pos_2].className[i + 1];
    var x = "";
    x = str1 + tail2;
    _global.contain[pos_1].className = x;
    x = str2 + tail1
    if (len_1 != len_2) {
        _global.white = x;
    }
    _global.contain[pos_2].className = x;
    var z = _global.contain[pos_1];
    _global.contain[pos_1] = _global.contain[pos_2];
    _global.contain[pos_2] = z;
}

// start the game

function start_game() {
    if (!_global.start) {
        var x;
        for (var i = 0; i < 16; ++i) {
            x = Math.floor(Math.random() * 16);
            switch_(i, x);
        }
        while (!able_to_solve()) {
            for (var i = 0; i < 16; ++i) {
            x = Math.floor(Math.random() * 16);
            switch_(i, x);
            }
        }
        _global.start = 1;
        var button = document.getElementsByClassName('cl0');
        button[1].className = 'change cl1';
        button[0].className = 'start cl1';
        _global.timeId = window.setInterval("show_time()", 1000);
    }
}

// change the picture under the game

function show_picture() {
    var show_ = document.getElementsByClassName('show');
    if (_global.num == 0) {
        show_[0].className = 'show a';
    } else if (_global.num == 1) {
        show_[0].className = 'show b';
    } else {
        show_[0].className = 'show c';
    }
}

// change 15 blocks' background-img

function change_picture() {
    if (!_global.start) {
        _global.num++;
        _global.num %= 3;
        for (var i = 15; i >= 0; i--) {
                var str = _global.contain[i].className;
                if (str.length > 10) {
                    var str1 = str.substr(2);
                    var str2 = 'b' + _global.num;
                    _global.contain[i].className = str2 + str1;
                }
        }
        initial();
        _global.contain[15].className = 'white p33';
        _global.white = 'white p33';
        show_picture();
    }
}

// update the time by seconds

function show_time() {
    var _time = document.getElementsByClassName("time");
    _time[0].value = 0;
    _time[0].value = _global._time + 1;
    ++_global._time;
}

window.onload = function () {
    draw_pic();
    var change = document.getElementsByClassName('change');
    change[0].onclick = change_picture;
    var start = document.getElementsByClassName('start');
    start[0].onclick = start_game;
    show_picture();
    var reverse = document.getElementsByClassName('reverse');
    reverse[0].onclick = initial;
    var time_ = document.getElementsByClassName('time');
    time_[0].value = 0;
    var step = document.getElementsByClassName('steps');
    step[0].value = _global.steps;
}