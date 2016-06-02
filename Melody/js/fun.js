var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheelControl: true
});
$(".swiper-ul li img").hover(function(){
	$(this).addClass("animated bounceIn");
},function(){
	$(this).removeClass("animated bounceIn");
});
var imgSrc1 = $(".xs1").attr("src");
var imgSrc2 = $(".xs2").attr("src");
$(".swiper-ul li:lt(2)").click(function(){
	imgSrc1 = $(this).find("img").attr("src");
	$(".xs1").attr("src",imgSrc1);
});
$(".swiper-ul li:gt(1)").click(function(){
	imgSrc2 = $(this).find("img").attr("src");
	$(".xs2").attr("src",imgSrc2);
	$(".game-ul li img").attr("src",imgSrc2);
});
//游戏
var _index = 1;
var score = 0;//分数
var gameTimer = null;
var time = 30;
$(".time span").html(time);
$(".score span").html(score);
var clickflag = flag = repeatFlag = true;
$(".play").on("click",function(){
	console.log(time);
	if(flag && repeatFlag){
		// $(".game-ul").html("<li><img src='"+imgSrc2+"' alt=''></li>");
		repeatFlag = false;
		console.log(_index);
		flag = false;
		clickflag = true;
		controlTime();
		if(time > 0){
			createImg();
		}	
	}	
});
$(".repeat").on("click",function(){
	repeatFlag = true;
	//$(".time span").html("10");这样没用
	time = 30;
	$(".time span").html(time);
	_index = 1;
	score = 0;
	$(".score span").html(score);
	$(".game-ul").html("<li><img src='"+imgSrc2+"' alt=''></li>");
});

//创建li函数
function createImg(){
	$(".game-ul").html("");
	_index++;
	if(_index > 5){
		_index = 5;
	}
	var _wid = parseInt(400 / _index);
	for(var i = 0;i < _index * _index;i++){
		$("<li style='width:"+_wid+"px;height:"+_wid+"px;'></li>").html("<img src='"+imgSrc2+"''>").appendTo($(".game-ul"));
	}
	changeImg();
}
//更换图片函数
function changeImg(){
	var ran = Math.floor(Math.random()*(_index*_index));
	var li = $(".game-ul li").eq(ran).find("img").attr("src",imgSrc1);
	li.click(function(){
		if(clickflag){
			score += 10;
			$(".score span").html(score);
			console.log(_index);		
			createImg();
		}		
	});		
}

//游戏时间函数
function controlTime(){
	gameTimer = setInterval(function(){
		time--;
		$(".time span").html(time);
		if(time <= 0){
			clearInterval(gameTimer);
			clickflag = false;
			flag = true;
			_index = 1;
			time = 0;
		}
	},500);
}

//表白墙
$(".bot span.left").click(function(){
	$(".bot ul").toggle("slow");//点击自动慢慢的隐藏和显示ul
});
//点击li时换颜色
$(".bot ul li").click(function(){
	//这里用jQuery里的data.("color")貌似不给力
	var col = $(this).attr("data-color");//获取li的颜色，即font的颜色
	//alert(col);
	$("span.left font").css("background-color",col);
	$(this).addClass('xz').siblings('li').removeClass('xz');
	$(".bot ul").toggle("slow");
});
//输入内容抬起键盘在墙上显示
var arr = [];
$(".bot p").keyup(function(e){
	var col = $(".bot ul li.xz").attr("data-color");
	var txt = "<span style='color:"+col+"'>"+$(this).text()+"</span>";
	$(".wrap").html(arr.join("").toString()+txt);
	//arr.join("").toString()表示之前存起来的内容
	//保证当前输入时是同步显示的
	//判断有没有按回车键（回车键返回值是13）
	if(e.keyCode == 13){
		$(this).empty();//清空内容
		arr.push("<p>"+txt+"</p>");
		var html = "";
		for(var i=0;i<arr.length;i++){
			html+=arr[i];
		}
		$(".wrap").html(html);
	}
});
$(".bot .right").click(function(){
	$(".wrap").html("");
});
$(".wx").hover(function(){
  $(".ewm").show();
},function(){
  $(".ewm").hide();
});
