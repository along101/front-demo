$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.removeEmpty = function (obj) {
    var o = {};
    $.each(obj, function (name, value) {
        if (value !== "" && value !== null) {
            o[name] = value;
        }
    });
    return o;
};

function postJson(url, data) {
    if (typeof data == "object") {
        data = JSON.stringify(data);
    }
    $.ajax({
        url: url,
        data: data,
        contentType: "application/json",
        type: "POST",
        success: function (rs) {
            print(rs);
        },
        error: function (rs) {
            print(rs);
        }
    })
}

function get(url, data) {
    $.get(url, data, function (rs) {
        print(rs);
    })
}

function print(rs) {
    console.log(rs);
    var message = typeof rs == "object" ? JSON.stringify(rs, null, 2) : rs;
    $("#console").val(message);
}

function test() {
    print("test");
    var url = "./test.json";
    var data = $("#test1").serializeObject();
    data = $.removeEmpty(data);
    print(data);
    get(url, data);
}
