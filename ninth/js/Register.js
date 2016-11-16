function check() {
    if (this.name == "Username") {
        return check_Username(this.value);
    }
    if (this.name == "ID") {
        return check_ID(this.value);
    }
    if (this.name == "Phone") {
        return check_Phone(this.value);
    }
    if (this.name == "Email") {
        return check_Email(this.value);
    }
}
function check_Username(value) {
    var val = value.toString();
    if (val.length < 6 || val.length > 18) {
        $(".User_hint:eq(0)").text("请输入6-18位字符");
        return false;
    }
    if (val.match(/^[a-zA-Z]/) == null) {
        $(".User_hint:eq(0)").text("请以英文字母开头");
        return false;
    }
    if (val.match(/^[a-zA-Z](\w)*/) == null) {
        $(".User_hint:eq(0)").text("字符必须为英文字母、数字或下划线");
        return false;
    }
    $(".User_hint:eq(0)").text("");
    return true;
}
function check_ID(value) {
    var val = value.toString();
    if (val.length != 8) {
        $(".ID_hint:eq(0)").text("请输入8位数字");
        return false;
    }
    if (val.match(/[^(0-9)]/)) {
        $(".ID_hint:eq(0)").text("请输入8位数字");
        return false;
    }
    if (val.match(/^[1-9]([0-9])*/) == null) {
        $(".ID_hint:eq(0)").text("学号不能以0开头");
        return false;
    }
    $(".ID_hint:eq(0)").text("");
    return true;
}
function check_Phone(value) {
    var val = value.toString();
    if (val.length != 11) {
        $(".Phone_hint:eq(0)").text("请输入11位数字");
        return false;
    }
    if (val.match(/^[0-9]([0-9])*/) == null) {
        $(".Phone_hint:eq(0)").text("电话的第一位不能为0");
        return false;
    }
    $(".Phone_hint:eq(0)").text("");
    return true;
}
function check_Email(value) {
    var val = value.toString();
    if (val.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) != null) {
        $(".Email_hint:eq(0)").text("");
        return true;
    }
    $(".Email_hint:eq(0)").text("邮箱地址格式不对");
    return false;
}

function initial() {
    $("input:text").val("");
    $(".Phone_hint:eq(0)").text("");
    $(".Email_hint:eq(0)").text("");
    $(".ID_hint:eq(0)").text("");
    $(".User_hint:eq(0)").text("");
}

function post_infor() {
    if (!check_Username($("input:text:eq(0)").val())) return false;
    if (!check_ID($("input:text:eq(1)").val())) return false;
    if (!check_Phone($("input:text:eq(2)").val())) return false;
    if (!check_Email($("input:text:eq(3)").val())) return false;
    $.ajax({
        url: 'register',
        type: 'POST',
        data: $('form').serialize() ,
        success: function (data) {
            if (data.match(/\"/) != null) {
                alert(data + "重复了\"");
            } else {
                window.location.href = '/?Username=' + data;
            }
        },
        error: function(err) {
            alert(err);
            console.log(err);
        }
    })  
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

$(function () {
    $(".Reset:eq(0)").click(initial);
    $("input:text").blur(check);
    $(".submit").click(post_infor);
})
