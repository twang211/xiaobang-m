var baseUrl = "http://47.92.165.114:8999/fire-service"

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    if (timestamp.length == 10) {
        date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    }
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = change(date.getDate()) + ' ';
    h = change(date.getHours()) + ':';
    m = change(date.getMinutes()) + ':';
    s = change(date.getSeconds());
    return Y + M + D + h + m + s;
}

function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}