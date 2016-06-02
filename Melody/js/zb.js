$(".wx").hover(function(){
  $(".ewm").show();
},function(){
  $(".ewm").hide();
});
$("#bottom_box span").mouseover(function(event) {
	var _index = $(this).index();
	$(".zb_container .zb_con").eq(_index).addClass("zb-active").siblings(".zb_con").removeClass("zb-active");
});