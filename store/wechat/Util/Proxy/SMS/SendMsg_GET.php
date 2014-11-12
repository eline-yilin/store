<?php
$msg=$_GET["smsText"];
$phone=$_GET["smsMob"];
$Uid='yudongpan';
$Key='927b82a679860d0548c7';
$url = "http://utf8.sms.webchinese.cn/?Uid=$Uid&Key=$Key&smsMob=$phone&smsText=$msg";
Get($url);       
function Get($url)
{  
   //header('Content-Type: text/html; charset=UTF-8');  
   //return  json_encode($url);

	if(function_exists('file_get_contents'))
	{
		$file_contents = file_get_contents($url);
	}
	else
	{
		$ch = curl_init();
		$timeout = 5;
		curl_setopt ($ch, CURLOPT_URL, $url);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$file_contents = curl_exec($ch);
		curl_close($ch);
	}
	return $file_contents;
}

?>