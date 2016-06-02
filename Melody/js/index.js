//搜索框搜索内容（jsonp）
function abc(data) {
	if(data.data != undefined) {
		var html = "";
		var _data = data.data.song;
	 	for(var i = 0; i < _data.itemlist.length; i++) {
	 		html += "<li class='open'><a href = '#' class='clearfix'><span class='name'>"+_data.itemlist[i].name+"</span><span class='singer'>"+_data.itemlist[i].singer+"</span></a></li>";
	 	}
	 	$(".searchCon").html(html);
	 	$(".searchCon").css("display","block");
	 }else {
	 	$(".searchCon").css("display","none");
	 }
}
$("input.search").on("input propertychange",function() {
	//生成script 
	var script = $("<script />");
	script.attr("src","http://s.plcloud.music.qq.com/fcgi-bin/smartbox_new.fcg?utf8=1&is_xml=0&key="+$("input.search").val()+"&format=jsonp&inCharset=GB2312&outCharset=utf-8&jsonpCallback=abc");
	$("body").append(script);
	script.remove();
});
//分享
window._bd_share_config = {"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"4","bdPos":"right","bdTop":"200"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

//轮播
var _index = 0;
$(".swiper-wrapper .next").click(function(){
	next();
});
$(".swiper-wrapper .prev").click(function(){
	prev();
});
function btn(){
	$(".swiper-wrapper .banner-btn span").eq(_index).addClass("active").siblings("span").removeClass("active");
}
function next(){
	_index++;
	if(_index > 4){
		_index = 0;
	}
	btn();
	$(".swiper-wrapper .banner-top").stop().animate({left:-3*1000},500,function(){
		$(this).append($(".swiper-wrapper .banner-top a:first"));
		$(this).css("left","-2000px");
	});
}
function prev(){
	_index--;
	if(_index < 0){
		_index = 4;
	}
	btn();
	$(".swiper-wrapper .banner-top").stop().animate({left:-1000},500,function(){
		$(this).prepend($(".swiper-wrapper .banner-top a:last"));
		$(this).css("left","-2000px");
	});
}
//自动轮播
var timer = null;
function autoPlay(){
	timer = setInterval(next,5000);
}
autoPlay();
$(".swiper-container .swiper-wrapper").hover(function(){
	$(this).find(".btn").show();
	clearInterval(timer);
},function(){
	$(this).find(".btn").hide();
	autoPlay();
});
//新碟推荐
$(".new-music-top-list span").mouseover(function() {
	var index = $(this).index();
	$(this).addClass("new-active").siblings().removeClass('new-active');
	$(".new-music-bot ul").eq(index).addClass('new-show-active').siblings().removeClass('new-show-active');
});
//歌手
$(".singer-wrap .singer-top .pattern-more").click(function(){
	$("ul.singer-list li").each(function(index,key){
		$(this).css("margin-left","100%").animate({marginLeft:0},(index+1)*300);
	});
});
//意识流滑动效果
var timer1 = null;
$(".new-music-mask").mouseenter(function(e) {
    var oDiv = $(this).find('.play-mask');
    oDiv.find(".play").addClass('animated flash');
    oDiv.css({left: 0, top: 0});
    var iDirection = mousemovedirection(this, e);
    switch(iDirection) {
        case 0 : oDiv.css('top', '-200px'); break;
        case 1:  oDiv.css('left', '200px'); break;
        case 2: oDiv.css('top', '200px'); break;
        default: oDiv.css('left', '-200px')
    }
    timer1 = setTimeout(function() {
        oDiv.animate({left: 0, top: 0}, 200)
    }, 100)
}).mouseleave(function(e) {
    clearTimeout(timer1);
    var oDiv = $(this).find('.play-mask');
    oDiv.find(".play").removeClass('animated flash');
    var iDirection = mousemovedirection(this, e);
    switch(iDirection) {
        case 0 : oDiv.animate({top: -200}, 200); break;
        case 1: oDiv.animate({left: 200}, 200); break;
        case 2: oDiv.animate({top: 200}, 200); break;
        default: oDiv.animate({left: -200}, 200)
    }
});

function mousemovedirection(o, e) {
     var w = o.offsetWidth;
     var h = o.offsetHeight;
     var x = (e.pageX - o.offsetLeft - (w/2)) * (w > h ? (h/w) : 1);  // w > h  
     var y = (e.pageY - o.offsetTop - (h/2)) * (h > w ? (w/h) : 1);
     var direction = Math.round((((Math.atan2(y, x) * (180/Math.PI)) + 180) / 90) + 3) % 4;
     var evenType = e.type;
     return direction;
}

$(".pattern-list li p a").hover(function(){
	$(this).addClass("animated rotateIn");
},function(){
	$(this).removeClass("animated rotateIn");
});

$(document).on("scroll",function(){
	var _scrollTop = $(this).scrollTop();
	var maxTop = $(".singer-bot").offset().top;
	if(_scrollTop > maxTop){
		$(".pattern-list li").each(function(index,key){
			$(key).addClass("animated bounceInUp");
		});
		$("a.returntop").fadeIn();
	}else{
		$("a.returntop").hide();
	}
});
$(".pattern-list li a div").hover(function(){
	$(this).css("color","#c66").addClass("animated pulse");
},function(){
	$(this).css("color","#666").removeClass("animated pulse");
});
//右边hot
var _hotIndex = 0;
$(".hot-goethe-bot .goethe-bot").mouseover(function() {
	$(this).find("span").show();
}).mouseout(function() {
	$(this).find("span").hide();
});
$(".hot-goethe-bot .goethe-bot span.hot-arrow-left").click(function(){
	_hotIndex--;
	if(_hotIndex < 0){
		_hotIndex = 4;
	}
	$(this).parent().find("a").eq(_hotIndex).fadeIn().siblings("a").fadeOut();
});
$(".hot-goethe-bot .goethe-bot span.hot-arrow-right").click(function(){
	_hotIndex++;
	if(_hotIndex > 4){
		_hotIndex = 0;
	}
	$(this).parent().find("a").eq(_hotIndex).fadeIn().siblings("a").fadeOut();
});
//标签效果
$(".label-pic img").hover(function(){
	$(this).addClass("animated bounceIn");
},function(){
	$(this).removeClass("animated bounceIn");
});
//MV
var _mvleft = 0;
$(".mv-wrap").hover(function(){
	_mvleft = $(".mv-container").position().left;
	if(_mvleft == 10){
		$("a.mv-arrow-right").show();
	}else if(_mvleft == -950){
		$("a.mv-arrow-left").show();
	}
},function(){
	$("a.mv-arrow").hide();
});
$("a.mv-arrow-left").click(function(){
	_mvleft = $(".mv-container").position().left;
	_mvleft += 710;
	if(_mvleft <= 10){
		$("a.mv-arrow-left").hide();
		_mvleft = 10;
	}
	$(".mv-wrap .mv-bot .mv-container").animate({left:_mvleft},500);
});
$("a.mv-arrow-right").click(function(){
	_mvleft = $(".mv-container").position().left;
	_mvleft -= 710;
	if(_mvleft >= -950){
		$("a.mv-arrow-right").hide();
		_mvleft = -950;
	}
	$(".mv-wrap .mv-bot .mv-container").animate({left:_mvleft},500);
});
$(".mv-right .mv-play").hover(function() {
	$(this).addClass("animated rotateIn");
}, function() {
	$(this).removeClass("animated rotateIn");
});
//返回顶部
$("a.returntop").click(function(){
	$("html,body").animate({scrollTop:0},500);
});

//侧边音乐播放器
var audio = $("#myMusic").get(0);
var n = m = 0;
$(".but a.play").click(function(){
	if(n==0){
		audio.play();
		$(".banner .pic").addClass("zq");
		$(this).css("background-position","-343px -92px");
		n=1;
	}else{
		audio.pause();
		$(".banner .pic").removeClass("zq");
		$(this).css("background-position","-115px -3px");
		n=0;
	}	
});
$(".banner .close").click(function(){
	if(m==1){
		$(this).css("background-position","-23px 0");
		$(".banner").animate({"left":"-548px"},500);
		m=0;
	}else{
		$(this).css("background-position","0 0");
		$(".banner").animate({"left":"-10px"},500);
		m=1;
	}
});

$(".wx").hover(function(){
	$(".ewm").show();
},function(){
	$(".ewm").hide();
});



