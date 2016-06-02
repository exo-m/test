$(".menu ul li").hover(function(){
	$(this).find("span").animate({height:"56px"},100);
	var dataname = $(this).attr("data-Name");
	$("#MusicAudio").get(0).src="mp3/"+dataname+".mp3";
	$("#MusicAudio").get(0).play();
},function(){
	$(this).find("span").animate({height:"0"},100);
});
