num = 0;
nth = 0;
function get_data_of_td(parent) {
    var save = [];
    var n = parent.find("th").length;
    for (var i = 0; i < parent.find("td").length; ) {
        var sub_save = [];
        for (var x = 0; x < n; ++x) {
            sub_save.push(parent.find("td").eq(i).html());
            ++i;
        }
        save.push(sub_save);
    }
    return save;
}

function write_on_table(save, parent) {
    for (var i = 0; i < save.length; ++i) {
        for (var x = 0; x < save[i].length; ++x) {
            parent.find("td").eq(i * save[i].length + x).html(save[i][x]);
        }
    }
}

function event_of_sort() {
    add_class_name($(this));
    nth = $(this).index();
    var array = get_data_of_td($(this).parents("table"));
    array.sort(compare);
    write_on_table(array, $(this).parents("table"));
    ++num;
    delete_class_name($(this));
}

function add_class_name(it) {
    if (num % 2) {
        it.addClass("sort down");
    } else {
        it.addClass("sort up");
    }
}

function delete_class_name(it) {
    setTimeout(function () {
        it.removeClass("sort down");
        it.removeClass("sort up");
    }, 300);
}

function compare(x, y) {
    if (num % 2 == 0) {
        return x[nth] > y[nth];
    } else {
        return x[nth] < y[nth];
    }
}


function set_color() {
     $("tr:even:not(:nth-child(1))").addClass("even");
}

$(document).ready(function () {
    $("tr > th").click(event_of_sort);
    set_color();
})