$(function() {
    console.log(getParam("buildingId"))
    console.log(getParam("fireAreaCode"))
    getInfos()
})

function getInfos() {
    $.ajax({
        url: baseUrl + "/api/public/qr/random-scan",
        type: "get",
        dataType: "json",
        data: { "buildingId": getParam("buildingId"), "fireAreaCode": getParam("fireAreaCode") },
        async: true,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function(res) {
            if (res.resultCode == 0) {
                var datas = res.resultData
                var data = datas.apparatusInfo
                console.log(datas)
                $(".companyName").html(data.companyName)
                $(".buildingName").html(data.buildingName)
                $(".fireAreaCode").html(data.fireAreaCode + "区")
                $(".roomNo").html(data.roomNo)
                $(".apparatusName").html(data.apparatusName)
                $(".apparatusUuid").html(data.apparatusUuid)
                $(".apparatusCode").html(data.apparatusCode)
                $(".checkCount").html(datas.checkCount + "次")
                if (datas.lastCheckTime) {

                    $(".lastCheckTime").html(timestampToTime(datas.lastCheckTime))
                }
                if ((data.troubleList).length > 0) {
                    $(".troubleList").html("不正常")
                    $(".checkInfo").show()

                    $(".checkInfo").on("click", function() {
                        $(".errloginfos").empty()
                        $(".bgdialog").show()
                        $(".errlog").show()
                        var logs = data.troubleList
                        for (var i = 0; i < logs.length; i++) {
                            var html = ""
                            html += "<tr><td>" + logs[i].checkReminder + "</td><td>" + timestampToTime(logs[i].createTime) + "</td></tr>"
                        }
                        $(".errloginfos").append(html)

                    })
                    $(".closeBtn").on("click", function() {
                        console.log("1111111111")
                        $(".bgdialog").hide()
                        $(".errlog").hide()
                    })
                } else {
                    $(".bgdialog").hide()
                    $(".errlog").hide()
                    $(".troubleList").html("正常")
                    $(".checkInfo").hide()
                }
            } else {
                console.log(res.resultMsg, "res")
            }

        },
        error: function() {
            $("#error").html("请求失败！")
        }
    });
}