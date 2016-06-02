var kgFlag = true;//开关 1 关 2 开
var MusicSrc = $(".Txt ul li:eq(0) a").attr("dataSrc");
var Audio = $("#music").get(0);
//点击列表播放按钮
$(".Txt ul li").click(function(){		
	MusicSrc = $(this).find("a").attr("dataSrc");
	$("#music").attr("src",MusicSrc);//创建播放器对象
	Audio = $("#music").get(0);		
	$(this).addClass("active").siblings().removeClass("active");
	Audio.play();//播放
	setInterval(changeBar,1000);
	kgFlag = true;
});
$(".btnPlay").click(function(){
	if(kgFlag){
		Audio.pause();//暂停
		Audio.removeEventListener("timeupdate");
		kgFlag = false;
	}else{
		Audio.play();//继续播放
		kgFlag = true;
		Audio.addEventListener("timeupdate",function(){
			var timer = this.currentTime;//这里不是$(this)
			var s = parseInt(timer);
			
			$("#"+s).addClass('hover').siblings().removeClass('hover');
			if($("#"+s).hasClass("hover")){
				_index1 += 4;
				$("#"+s).parent(".rightCon").animate({scrollTop:_index1+"px"},2000);
			}	
		});
	}	
});

//歌词部分
//进度条
function changeBar(){
	var allTime = Audio.duration;//总的播放时间
	var curTime = Audio.currentTime;//当前时间
	var bl = curTime / allTime;
	var oWidth = $(".bar").width()*bl;
	$(".barBlue").css("width",oWidth);
}

//把歌词和时间分开
function getGc(){
	var gc = $("#gc").text();
	var gcArr = gc.split("[");
	
	var html = "";
	for(var i = 0;i<gcArr.length;i++){
		//00:06.29]感恩的心 - 群星为例
		var gcs = gcArr[i].split("]");//["00:06.29","感恩的心 - 群星为例"]
		var gcTime = gcs[0].split(".");//["00:06","29"]
		var tt = gcTime[0].split(":");//["00","06"]
		var allTimes = tt[0]*60+tt[1]*1;
		var gcCon = gcs[1];//["感恩的心 - 群星为例"]
		if(gcCon){
			html = html + "<p id='"+allTimes+"'>"+gcCon+"</p>";
		}

	}
	$(".rightCon").html(html);
}
getGc();
var _index1 = 0;//初始化歌词滚动条
Audio.addEventListener("timeupdate",function(){
	var timer = this.currentTime;//这里不是$(this)
	var s = parseInt(timer);
	
	$("#"+s).addClass('hover').siblings().removeClass('hover');
	if($("#"+s).hasClass("hover")){
		_index1 += 4;
		$("#"+s).parent(".rightCon").animate({scrollTop:_index1+"px"},2000);
	}
	
});
