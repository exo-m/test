$(function(){
	play(80);
	//封装大图滚动函数
	function play(n){
		var btn = document.getElementById("btn");
		var btnList = btn.getElementsByTagName("li");
		var pic = document.getElementById("pic");
		var uHTML = "",pHTML = "",zHTML = "",z = 0,tHTML = "";
		var _width = 1000 / n;
		var _css = document.getElementById("css");
		for(var k = 0;k < n;k++){
			if(k >= n/2){
				z--;
				zHTML += "#banner ul li:nth-child("+(k+1)+"){z-index:"+z+";}";
			}					
			uHTML += "<li><div></div><div></div><div></div><div></div></li>";
			pHTML +="#banner ul li:nth-child("+(k+1)+") div{background-position: "+(-_width*k)+"px 0;}";
			tHTML += "#banner ul li:nth-child("+(k+1)+"){transition: all 1s "+(k*0.5/n)+"s;}";
		}
		pic.innerHTML = uHTML;
		_css.innerHTML = tHTML + zHTML + pHTML + "#banner ul li{width:"+_width+"px;} #banner ul li div{width:"+_width+"px;}";
		var picList = pic.getElementsByTagName("li");
		for(var i = 0;i < btnList.length;i++){
			btnList[i].index = i;
			btnList[i].onclick = function(){
				for(var j = 0;j < picList.length;j++){
					_css.innerHTML += "#banner ul li{transform:translateZ(-210px) rotateX("+90*(this.index)+"deg)}";
					this.index == j ? this.className = "active" : btnList[j].className = "";
				}					
			}				
		}	
	}
	//随机函数
	function rand(min,max){
		return parseInt(Math.random()*(max - min + 1) + min);
	}
	//点击继续加载
	var timer = null;
	$(".jz").click(function(){
		$(this).html("<img src='images/mv-load.gif' class='jz-pic'>");
		var _index = 0;
		timer = setInterval(function(){
			_index++;
			var minHeight = $(".show-list li").eq(0);
			var num = rand(1,30);
			for(var i = 1;i < $(".show-list li").length;i++){
				if(minHeight.height() > $(".show-list li").eq(i).height()){
					minHeight = $(".show-list li").eq(i);
				}
			}
			if(_index >= 10){
				clearInterval(timer);
				$(".jz").html("加载更多");

			}else{
				var div = $("<div />").html("<img src='images/show-"+num+".jpg' alt=''><p class='like clearfix'><i></i><span>张艺兴</span></p>");
				minHeight.append(div);
			}		
		},500);
	});
	//收藏图片
	$(document).scroll(function(event) {
		if($(document).scrollTop() > $("#banner").offset().top){
			$("#carBar").show();
		}else{
			$("#carBar").hide();
		}
	});
	var mark = 0;
	$("#carBar .car span").click(function(){
		if(mark==0){
			$("#carBar").animate({"width":"260px"},500);
			mark = 1;
		}else{
			$("#carBar").animate({"width":"40px"},500);
			mark = 0;
		}
	});
	//收藏图片
	//抛物线
	$(document).on("click","i",function(event){
		$(this).css({backgroundPosition: '-111px -184px'});
		var _pic = $(this).parent().siblings("img").attr("src");
		var flyer = $("<img class='flyer-img' src='"+_pic+"' />");//抛物体对象
		// alert(flyer);
	    flyer.fly({
	        start: {
	            left: event.clientX, //抛物体起点横坐标
	            top: event.clientY,//抛物体起点纵坐标
	        },
	        end: {
	            left: 1390, //抛物体终点横坐标
	            top: 400, //抛物体终点纵坐标
	        },
	        onEnd: function() {
	            $("#tip").show().animate({width: '20px'}, 300).fadeOut(500);//成功加入购物车动画效果
	            this.destory();//销毁抛物体
	        }
	    });
		//append里面不能有空格
		$("<li><a href='javascript:void(0)'>×</a><img src='"+_pic+"' alt=''></li>").prependTo($(".carTxt ul"));
	});
	//如果是在js中动态添加元素，不能为其添加事件，只能依靠事件委托
	$(".carTxt ul").on("mouseover","li",function(){
		$(this).find("a").show();
	});
	$(".carTxt ul").on("mouseout","li",function(){
		$(this).find("a").hide();
	});
	$(".carTxt ul li a").click(function(){
		$(".carTxt ul").remove($(this).parent("li"));
	});
	$(".carTxt ul").on("click","a",function(){
		$(this).parent("li").remove();
	});
	$(".wx").hover(function(){
	  $(".ewm").show();
	},function(){
	  $(".ewm").hide();
	});
});
