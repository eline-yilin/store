<?php 
include("wechat.class.php");
if(!isset($_GET['code']))
die;
$options = array(
		'token'=>'szgc', //填写你设定的key
		'appid'=>'wx81c05a579d2ab456',//wx7fd8d219a89079f3', //填写高级调用功能的app id, 请在微信开发模式后台查询
		'appsecret'=>'fe2290189dc4815c4c84dcb4ecc3d41f',//cee0122f11a19053b649ac593f856a5d ', //填写高级调用功能的密钥

);
$weObj = new Wechat($options);
//$weObj->valid();
$code = $_GET['code'];
$json = $weObj->getOauthAccessToken();
$openid = $json['openid'];
setcookie('SHENGZHU_OPENID',$openid);
header('Location: http://112.124.32.175:8000/?openid='.$openid);//yue/register.php
?>