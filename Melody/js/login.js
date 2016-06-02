//登录按钮
$("#login").click(function(){
	$("#wrap,#Login").show();
	autoPlace();
});
//关闭按钮
$("a.close").click(function(){
	//var e = ev || window.event;
	//e.cancelBubble = true;
	$("#wrap").hide();
});
$("#wrap").click(function(){
	//var e = ev || window.event;
	//e.stopPropagation();	
	$("#wrap").hide();
});
$("#Login").click(function(ev){
	var e = ev || window.event;
	e.stopPropagation();
	//e.cancelBubble = true;
	$("#Login").show();
});
//当浏览器窗口动态改变时，实现居中效果
$(window).resize(function(){
	autoPlace();
});
//封装函数，减少代码
function autoPlace(){
	var _top=($(window).height()-$("#Login").height())/2;
	var _left=($(window).width()-$("#Login").width())/2;
	$("#Login").css({"top":_top,"left":_left});
}	
//拖动效果
var l=0,t=0;
var Domtitle = document.getElementById("Login");
Domtitle.onmousedown = function(event){
	var e = event || window.event;//兼容IE和火狐
	l = e.clientX-Domtitle.offsetLeft;
	t = e.clientY-Domtitle.offsetTop;

	
	//清除默认行为(这里不能加，加了之后input就不能输入了？？？)
	/*if(e.preventDefault){
		e.preventDefault();
		
	}else{
		//IE
		e.returnValue=false;
	}*/
	document.onmousemove = function(event){
		var tempX=window.innerWidth-Domtitle.offsetWidth;
		var tempY=window.innerHeight-Domtitle.offsetHeight;
		//或者是下面这种写法
		//var tempX=document.documentElement.clientWidth-Domtitle.offsetWidth;
		//var tempY=document.documentElement.clientHeight-Domtitle.offsetHeight;

		var e = event || window.event;//兼容IE和火狐

		var newLeft = e.clientX-l;
		var newTop = e.clientY-t;
		if(newLeft>=tempX){newLeft=tempX;}
		if(newTop>=tempY){newTop=tempY;}
		if(newTop<0){newTop=0;}
		if(newLeft<0){newLeft=0;}
		//注意这里一定要加单位px！！！
		Domtitle.style.left=newLeft+"px";
		Domtitle.style.top=newTop+"px";
	}
	//鼠标抬起时清除移动操作
	document.onmouseup = function(){
		document.onmousemove = null;
	}

}
//刷新验证码
$(".flash").on("click",function(e){
	e.stopPropagation();
	$(".codeImg").attr("src","code.php?d="+new Date().getTime());
});