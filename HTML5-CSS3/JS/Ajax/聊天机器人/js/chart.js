$(function() {

    // 发送对话
    $("#btnSend").on("click", function() {
        let chart = $("#iptChart").val().trim()
        if (chart.length <= 0) return $("#iptChart").val("")
        let li = "<li class='right_word'><img src='img/person02.png' /> <span>" + chart + "</span></li>"
        $("ul").append(li)
        $("#iptChart").val("")
        getrobotChart(chart)
        getVoice(chart)
        resetui()
    })

    // 获取机器人对话信息
    function getrobotChart(text) {
        $.get("http://www.liulongbin.top:3006/api/robot", {
            spoken:  text
        }, function(res) {
            console.log(res);
            if (res.message  ===  'success')  {
                var  msg  =  res.data.info.text
                let li = "<li class='left_word'><img src='img/person02.png' /> <span>" + msg  + "</span></li>"
                $("ul").append(li)
                resetui()
            }
        })
    }

    // 获取机器人语音（失效）
    function getVoice(text) {
        $.ajax({
            method: "GET",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text
            },
            success(res) {
                console.log(res);
                if (res.status === 200) {
                    let voice = res.voiceUrl
                    $("voice").attr("src", voice)
                }
            }
        })
    }

    // 按下enter发送消息
    $("#iptChart").on("keyup", function(e) {
        if (e.keyCode === 13) {
            $("#btnSend").click()
        }
    })
})