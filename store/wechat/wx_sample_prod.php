<?php
/**
  * wechat php test
  */
include("wechat.class.php");

//define your token
define("TOKEN", "szgc"); //thjcj
//$wechatObj = new wechatCallbackapiTest();
//$wechatObj->valid();

$options = array(
		'token'=>'szgc', //填写你设定的key szgc
		'appid'=>'wx7fd8d219a89079f3',//wx81c05a579d2ab456',//wx7fd8d219a89079f3', //填写高级调用功能的app id, 请在微信开发模式后台查询
		'appsecret'=>'cee0122f11a19053b649ac593f856a5d',//fe2290189dc4815c4c84dcb4ecc3d41f',//cee0122f11a19053b649ac593f856a5d ', //填写高级调用功能的密钥

);
$weObj = new Wechat($options);

$weObj->valid();


//$menu = $weObj->getMenu();
//var_dump($menu);
//$menu = $weObj->deleteMenu();
//var_dump($menu);

/* $redir = urlencode("http://112.124.32.175/shengzhu/wechat/oauth_service.php");
$oauth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fd8d219a89079f3&redirect_uri="
. $redir
."&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
$newmenu =  array(
		"button"=>
		array(
					//array('type'=>'view','name'=>'进入平台','url'=>'http://112.124.32.175:8000/'),
				  array('type'=>'view','name'=>'进入平台','url'=>$oauth_url),
		)
);


$result = $weObj->createMenu($newmenu);

var_dump($result);*/ 

$rev = $weObj->getRev();
$type = $rev->getRevType();
//$toName = $rev->getRevTo();
//$userInfo = $weObj->getUserInfo($toName);

switch($type) {
	
	case Wechat::MSGTYPE_TEXT:
		//$weObj->text($userInfo['nickname'] . " 你说的一切都将成为呈堂证供")->reply();
		$weObj->text(" 你好")->reply();
		exit;
		break;
	case Wechat::MSGTYPE_EVENT:
		//$weObj->text("正在响应")->reply();
		$keyArr = $weObj->getRev()->getRevEvent();
		if($keyArr && isset($keyArr['key']) && !empty($keyArr['key']))
		{
			$key = $keyArr['key'];
			switch($key) {
				case 'MENU_KEY_NEWS':
					$weObj->text( "羽书科技最新消息：No news is good news")->reply();
					break;
				default:break;
			}
		}
		if($keyArr && isset($keyArr['event']) && !empty($keyArr['event']))
		{
			$key = $keyArr['event'];
			switch($key) {
				case 'subscribe':
					$weObj->text("欢迎关注羽书科技公众账号, 你很有思想")->reply();
					break;
				case 'unsubscribe':
					$weObj->text("不要啊，没有你，臣妾做不到啊")->reply();
					break;
				default:break;
			}
		}
		
		break;
	case Wechat::MSGTYPE_IMAGE:
			$weObj->text("恭喜你 都会传图片了")->reply();
		break;
	default:
		$weObj->text("help info")->reply();
}

class wechatCallbackapiTest
{
	public function valid()
    {
        $echoStr = $_GET["echostr"];

        //valid signature , option
        if($this->checkSignature()){
        	echo $echoStr;
        	exit;
        }
    }

    public function responseMsg()
    {
		//get post data, May be due to the different environments
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

      	//extract post data
		if (!empty($postStr)){
                
              	$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
                $fromUsername = $postObj->FromUserName;
                $toUsername = $postObj->ToUserName;
                $keyword = trim($postObj->Content);
                $time = time();
                $textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							<FuncFlag>0</FuncFlag>
							</xml>";             
				if(!empty( $keyword ))
                {
              		$msgType = "text";
                	$contentStr = "Welcome to wechat world!";
                	$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                	echo $resultStr;
                }else{
                	echo "Input something...";
                }

        }else {
        	echo "";
        	exit;
        }
    }
		
	private function checkSignature()
	{
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];	
        		
		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}

?>