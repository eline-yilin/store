<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>分享有礼</title>
<style>
.header{background:#333;color:#fff;padding:10px;text-align:center;}

</style>
<script>


	

    //所有功能必须包含在 WeixinApi.ready 中进行
    function onBridgeReady() {
    	 // 微信分享的数据
        var wxData = {
            "imgUrl":'http://112.124.32.175:8000/img/upload/news_%E5%BE%AE%E4%BF%A1.png',
            "link":'http://112.124.32.175:8000/',
            "desc":'大家好，我是Andy。正在测试微信开发 如有打扰多多包涵',
            "title":"大家好，我是Andy"
        };
        var wxCallbacks = {
                // 分享操作开始之前
                ready:function () {
                    // 你可以在这里对分享的数据进行重组
                },
                // 分享被用户自动取消
                cancel:function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                },
                // 分享失败了
                fail:function (resp) {
                    // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                },
                // 分享成功
                confirm:function (resp) { alert('suc');
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                },
                // 整个分享过程结束
                all:function (resp) {alert('all');
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                }
            };
        WeixinJSBridge.on('menu:share:appmessage', function(argv) 
        {
            WeixinJSBridge.invoke('sendAppMessage',wxData, function(resp){
                var msg = resp.err_msg;
                var statusIndex = msg.lastIndexOf(':') + 1;
                var status = msg.substring(statusIndex);
                alert(status);
            	switch(status)
            	{
	            	 // share_timeline:cancel 用户取消  
	                case 'cancel':  
	                    callbacks.cancel && callbacks.cancel(resp);  
	                    break;  
	                // share_timeline:fail　发送失败  
	                case 'fail':  
	                    callbacks.fail && callbacks.fail(resp);  
	                    break;  
	                // share_timeline:confirm 发送成功  
	                case 'confirm':  
	                    callbacks.confirm && callbacks.confirm(resp);  
	                    break;
					default: 
						 callbacks.default && callbacks.default(resp);  
						break;
                	}
            	});
            callbacks.all && callbacks.all(resp);  
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv) 
        {
        WeixinJSBridge.invoke("shareTimeline",wxData,
            function(e){
            alert(e.err_msg);
            })
        });
    }
     
    if (typeof WeixinJSBridge === "undefined"){
        if (document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }
    }else{
        onBridgeReady();
    }


</script>
</head>
<body>
<div class='header'>abc</div>
<div class='main'>def</div>
<div class='footer'>bbb</div>
</body>
</html>