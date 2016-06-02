<?php 
	header("Content-Type:text/html;charset=utf8;");
	session_start();//要放在开头
	$img = imagecreatetruecolor(80, 40);
	$black = imagecolorallocate($img, 0x00, 0x00, 0x00);
	$green = imagecolorallocate($img, 0x00, 0xFF, 0x00);
	$red = imagecolorallocate($img, 0xFF, 0x00,0x00);
	$white = imagecolorallocate($img, 0xFF, 0xFF, 0xFF);
	imagefill($img,0,0,$white);
	//生成随机的验证码
	$code = '';
	for($i = 0; $i < 4; $i++) {
	    $code .= rand(0, 9);
	}
	$_SESSION['check_code_number'] = $code;
	imagestring($img, 16, 10, 10, $code, $black);
	//加入噪点干扰
	for($i=0;$i<50;$i++) {
	  imagesetpixel($img, rand(0, 100) , rand(0, 100) , $black); 
	  imagesetpixel($img, rand(0, 100) , rand(0, 100) , $green);
	  imagesetpixel($img,rand(0,100),rand(0,100),$red);
	}
	//输出验证码
	header("content-type: image/png");
	imagepng($img);
	imagedestroy($img);
?>