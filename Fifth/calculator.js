var value = 1;
function update(operate) {
    var str=document.getElementById("result").value;
    var len = str.length;
    var x = "", i = 0;
    if (value != 1) {
        str = "";
    }
    if (operate <= 9 && operate >= 0) {
        str += operate;
    }
    if (len != 0) {
        if (!(len == 1 && str.charAt(0) == '-') && (str.charAt(len - 2) != '+' && str.charAt(len - 2) != '*')) {
            if (operate == '+') {
                if (str.charAt(len - 1) == '-' || str.charAt(len - 1) == '*' || str.charAt(len - 1) == '/' || str.charAt(len - 1) == '+') {
                    for (i = 0; i < len - 1; ++i) {
                        x += str.charAt(i);
                    }
                    x += operate;
                    str = x;
                } else {
                    str += operate;
                }
            }
            if (operate == '*') {
                if (str.charAt(len - 1) == '-' || str.charAt(len - 1) == '/' || str.charAt(len - 1) == '+') {
                    for (i = 0; i < len - 1; ++i) {
                        x += str.charAt(i);
                    }
                    x += operate;
                    str = x;
                } else if (str.charAt(len - 1) == '*') {
                } else {
                    str += operate;
                }
            }
            if (operate == '/') {
                if (str.charAt(len - 1) == '-' || str.charAt(len - 1) == '*' || str.charAt(len - 1) == '+') {
                    for (i = 0; i < len - 1; ++i) {
                        x += str.charAt(i);
                    }
                    x += operate;
                    str = x;
                } else {
                    str += operate;
                }
            }
        }
    }
    if (operate == '-') {
        if (str.charAt(len - 1) == '+') {
            for (i = 0; i < len - 1; ++i) {
                x += str.charAt(i);
            }
            x += operate;
            str = x;
        } else if (str.charAt(len - 1) == '-') {
        } else {
            str += operate;
        }
    }
    
    // if (operate == '+' || operate == '-' || operate == '/' || operate == '*') {
    //     if ((str.charAt(len - 1) <= 9 && str.charAt(len - 1) >= 0) || str.charAt(len - 1) == '+' || str.charAt(len - 1) == '-')
    //         str += operate;
    // }
    if (operate == '(' || operate == ')') {
        str += operate;
    }
    if (operate == '.') {
        var key = 0;
        for (var i = 0; i < len; ++i) {
            if (str.charAt(i) == '.') {
                key = 1;
            }
            if (str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/') {
                key = 0;
            }
        }
        if (key == 0) {
            str += operate;
        }
    }
    if (operate == 'q') {
        var change = "";
        if (str.length != 0) {
            for (i = 0; i < str.length - 1; ++i) {
                change += str.charAt(i);
            }
            str = change;
        }
    }
    if (operate == 'C') {
        str = "";
    }
    value = 1;
    document.getElementById("result").value = str;
}

function calculator() {
    var str = document.getElementById("result").value;
    value = 0;
    try {
        document.getElementById("result").value = eval(str);
    }
    catch (ex) {
        document.getElementById("result").value = "";
        alert("runtime error!");
    }
}
