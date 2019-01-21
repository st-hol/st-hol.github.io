$(document).ready(function(){
  $('.slider').slick({
 	autoplay: true,
 	autoplaySpeed: 4000,
 	dots: true,

  });


  $('.one-time-slider').slick({

  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
 
});
	
});





