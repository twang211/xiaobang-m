$(function() {
    console.log(getParam("buildingId"))
    console.log(getParam("fireAreaCode"))
    setTimeout(function() {
        getInfos()
    }, 1000);
})

function getInfos() {
    $.ajax({
        url: baseUrl + "/api/public/qr/area-scan",
        type: "get",
        dataType: "json",
        data: { "buildingId": getParam("buildingId"), "fireAreaCode": getParam("fireAreaCode") },
        async: true,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function(res) {
            if (res.resultCode == 0) {
                $(".loadingImg").hide()
                var datas = res.resultData
                var basedata = datas.base
                console.log(datas)
                $(".companyName").html(basedata.companyName)
                $(".buildingName").html(basedata.buildingName)
                $(".fireAreaCode").html(basedata.fireAreaCode + "区")
                $(".floor").html(basedata.floor + "层")


                var appListdata = datas.appList
                for (var i = 0; i < appListdata.length; i++) {
                    var html = ""
                    typehtml = ""
                    var troublethml = ""
                    if (appListdata[i].troubleList.length > 0) {
                        typehtml = "<p><span>目前设备情况：</span><span class='troubleList'>不正常</span><a  class='button button-fill checkInfo'>V展开</a></p>"
                        var troubleList = appListdata[i].troubleList
                        for (var index = 0; index < troubleList.length; index++) {
                            troublethml += "<tr><td><span style='color: #FFD306;font-size: 15px;'>" + troubleList[index].checkPoint + "</span> </td><td><span style='color: #FF5809;font-size: 15px;'>" + timestampToTime(troubleList[index].createTime) + "</span> </td></tr>"
                        }
                    } else {

                        typehtml = "<p><span>目前设备情况：</span><span class='troubleList'>正常</span><a  class='button button-fill checkInfo'>V展开</a></p>"
                    }

                    var divtoghtml = ""
                    divtoghtml += "<div class='collapse' style='padding:10px 20px'><div class='well'><p><span>近一年累计巡查次数：</span><span class='checkCountOneYear'>" + appListdata[i].checkCountOneYear + "次</span></p><p><span>目前存在隐患数量：</span><span class='troubleCount'>" + appListdata[i].troubleList.length + "处</span></p><table style='text-align:center'><thead><th>隐患类别</th><th>隐患发现时间</th></thead><tbody class='errloginfos'>" + troublethml + "</tbody></table></div>"

                    html += "<li><p><span>设备名称：</span><span class='apparatusName'>" + appListdata[i].apparatusName + "</span></p><p><span>名称编码：</span><span class='apparatusCode'>" + appListdata[i].apparatusCode + "</span></p>" + typehtml + divtoghtml + "</li>"


                    $(".appinfos").append(html)
                }
                $(".checkInfo").click(function() {
                    $(this).parent().parent().find(".collapse").toggle();
                });

                // $(".apparatusName").html(data.apparatusName)
                // $(".apparatusUuid").html(data.apparatusUuid)
                // $(".apparatusCode").html(data.apparatusCode)
                // $(".checkCount").html(datas.checkCount + "次")
                // if (datas.lastCheckTime) {

                //     $(".lastCheckTime").html(timestampToTime(datas.lastCheckTime))
                // }
                // if ((data.troubleList).length > 0) {
                //     $(".troubleList").html("不正常")
                //     $(".checkInfo").show()

                //     $(".checkInfo").on("click", function() {
                //         $(".errloginfos").empty()
                //             // $(".bgdialog").show()
                //         $(".errlog").show()
                //         var logs = data.troubleList
                //         for (var i = 0; i < logs.length; i++) {
                //             var html = ""
                //             html += "<tr><td>" + logs[i].checkPoint + "</td><td>" + timestampToTime(logs[i].createTime) + "</td></tr>"
                //             $(".errloginfos").append(html)
                //         }

                //     })
                //     $(".closeBtn").on("click", function() {
                //         console.log("1111111111")
                //             // $(".bgdialog").hide()
                //         $(".errlog").hide()
                //     })
                // } else {
                //     // $(".bgdialog").hide()
                //     $(".errlog").hide()
                //     $(".troubleList").html("正常")
                //     $(".checkInfo").hide()
                // }
            } else {
                $.toast(res.resultMsg);
                console.log(res.resultMsg, "res")
            }

        },
        error: function() {
            $("#error").html("请求失败！")
        }
    });
}