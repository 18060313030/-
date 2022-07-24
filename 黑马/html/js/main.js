/**
 * 
 * @authors lml (${email})
 * @date    2017-11-30
 * @version v1.0.0
 */

$(function(){
	function hover(obj) {
		$(obj).mouseover(function(event) {
			$(this).addClass('active');
			$(this).siblings('div').removeClass('active');
		}).mouseout(function(event) {
			$(this).removeClass('active');
		});
	}
	var imgHeight = $('.new-silder img').height();
	$('.new-silder').height(imgHeight);
	var mySwiper = new Swiper('.new-silder',{
		freeMode : true,
	    loop: true,
		autoplay: 10000
	  }); 
	hover('.side-bar div');
	hover('.study-item');
	hover('.dynamic-item');
	hover('.dynamic-box h3');
	var imgHeight = $('.swiper-container img').height();
	$('.swiper-container').height(imgHeight);
	var mySwiper = new Swiper('.swiper-container',{
		freeMode : true,
	    loop: true,
		autoplay: 10000
	  });
	$('.header-con-nav li').mouseover(function(event) {
			$(this).addClass('active');
			$(this).siblings('li').removeClass('active');
			$(this).siblings('li').children('ul').hide();
			$(this).children('ul').show();
		}).mouseout(function(event) {
			$(this).removeClass('active');
			$(this).children('ul').hide();
		});;

});
