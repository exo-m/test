var swiper = new Swiper('.swiper-container', {
    effect: 'cube',
    autoplay: 5000,
    cube: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
    }
});
//MV
var _mvleft = 0;
$(".mv_start").hover(function(){
    _mvleft = $(".mv-container").position().left;
    if(_mvleft == 0){
        $("a.mv-arrow-left").hide();
        $("a.mv-arrow-right").show();
    }else if(_mvleft == -990){
         $("a.mv-arrow-right").hide();
        $("a.mv-arrow-left").show();
    }
},function(){
    $("a.mv-arrow").hide();
});
$("a.mv-arrow-left").click(function(){
    _mvleft += 990;
    if(_mvleft >= 0){
        _mvleft = 0;
    }
    $(".mv_start .mv_start_bot .mv-container").animate({left:_mvleft},500);
});
$("a.mv-arrow-right").click(function(){
    _mvleft -= 990;
     if(_mvleft <= -990){
        _mvleft = -990;
    }
    $(".mv_start .mv_start_bot .mv-container").animate({left:_mvleft},500);
});
$(".mv_start_sort a").click(function(){
    var _index = $(this).index();
    $(this).addClass('active').siblings('a').removeClass('active');
    $(".mv_start_con ul").css("left","0").eq(_index).addClass('mv-container').show().siblings('ul').removeClass('mv-container').hide();
});
//时钟
function clock(){
  var now = new Date();
  var ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,150,150);
  ctx.translate(75,75);
  ctx.scale(0.4,0.4);
  ctx.rotate(-Math.PI/2);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#f00";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (var i=0;i<12;i++){
    ctx.beginPath();
    ctx.moveTo(100,0);
    ctx.lineTo(120,0);
    ctx.stroke();
    ctx.rotate(Math.PI/6);
  }
  ctx.restore();
  // Minute marks
  ctx.save();
  ctx.lineWidth = 2;
  // ctx.strokeStyle = "#f00";
  for (i=0;i<60;i++){
    if (i%5!=0) {
      ctx.beginPath();
      ctx.moveTo(120,0);
      ctx.lineTo(110,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();
 
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  console.log
  hr = hr>=12 ? hr-12 : hr;

  ctx.fillStyle = "#f00";

  // write Hours
  ctx.save();
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  ctx.lineWidth = 8;
  ctx.beginPath();
//            ctx.moveTo(-20,0);
  ctx.moveTo(0,0);
  ctx.lineTo(70,0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
  ctx.lineWidth = 6;
  ctx.beginPath();
//            ctx.moveTo(-28,0);
  ctx.moveTo(0,0);
  ctx.lineTo(90,0);
  ctx.stroke();
  ctx.restore();
 
  // Write seconds
  ctx.save();
  ctx.rotate(sec * Math.PI/30);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#f00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-30,0);
  ctx.lineTo(83,0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI*2,true);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.arc(0,0,3,0,Math.PI*2,true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#fc9';
  ctx.arc(0,0,142,0,Math.PI*2,true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}           
window.requestAnimationFrame(clock);
//时钟碰壁效果
var sTimer = null;
var x = 2;
var y = 3;
function timePlay(){
    sTimer = setInterval(function(){
        var sLeft = $("#myCanvas").offset().left;
        var sTop = $("#myCanvas").offset().top;
        if(sLeft < 0 || sLeft > $(window).width() - $("#myCanvas").width() - 20){
            x *= -1;
        }
        if(sTop < 200 || sTop > $(".mask-bar").offset().top - $("#myCanvas").width()){
            y *= -1;
        }
        sLeft += x;
        sTop += y;
        $("#myCanvas").css({
            left: sLeft,
            top: sTop
        });
    },30);
}
$("#myCanvas").hover(function() {
    clearInterval(sTimer);
}, function() {
    timePlay();
});
timePlay();

//MV内地
var ndIndex = omIndex = rhIndex = 0;
$(".mv_part_one a.change").click(function(){
  ndIndex++;
  if(ndIndex >= $(".mv_part_one ul li").size()){
    ndIndex = 0;
  }
  $(".mv_part_one ul li").eq(ndIndex).fadeIn().siblings('li').fadeOut();
});
$(".mv_part_two a.change").click(function(){
  omIndex++;
  if(omIndex >= $(".mv_part_two ul li").size()){
    omIndex = 0;
  }
  $(".mv_part_two ul li").eq(omIndex).slideDown().siblings('li').slideUp();
});
$(".mv_part_three a.change").click(function(){
  rhIndex++;
  if(rhIndex >= $(".mv_part_three ul li").size()){
    rhIndex = 0;
  }
  $(".mv_part_three ul li").eq(rhIndex).animate({left:0}, {
    duration: 500,
    easing: "easeInBack"
  }).siblings('li').animate({left:"100%"}, {
    duration: 500,
    easing: "easeInBack"
  });
});
$(".wx").hover(function(){
  $(".ewm").show();
},function(){
  $(".ewm").hide();
});