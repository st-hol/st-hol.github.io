$(window).scroll(function() {
   if($(window).scrollTop() >= 100) {
      $('#myTopnav').addClass('topnav-downed');

     /* $('.soc-icon-li').css('display', 'none');*/
    
      $('.my-nav-soc-li').css('display', 'none');



      } else {
        $('#myTopnav').removeClass('topnav-downed');
     
       /* $('.soc-icon-li').css('display', 'block');*/
        $('.my-nav-soc-li').css('display', 'block');
   }   
  });﻿

function myFunction() {
    var x = document.getElementById("myTopnav");
    x.classList.toggle("responsive");
   /* $('#myTopnav').toggle('responsive');*/

}




  

  

/*function myFunction() {
    var x = document.getElementsByClassName("topnav");
    x = [].slice.call(x); //I have converted the HTML Collection an array
    x.forEach(function(item, i, arr) {
   		 x[i].classList.toggle("responsive");
   		 
	});
}*/



/*  window.addEventListener("scroll", function(event) {
    var top = this.scrollY;
  if (top >= 200) {
          document.getElementById('myTopnav').classList.add('topnav-downed'); // изменяем меню

// if (window.matchMedia("(max-width: 680px)").matches) { 
//               var x = document.getElementsByClassName('share-icon-li');               //прячем все одиночные иконки
//               x = [].slice.call(x); //I have converted the HTML Collection an array
//               x.forEach(function(item, i, arr) {
//               x[i].style.display = "none";
//               });
// }

                 document.getElementsByClassName('my-nav-share-li')[0].style.display="none";    //прячем блок иконк
  
} else {
          document.getElementById('myTopnav').classList.remove('topnav-downed');
              
// if (window.matchMedia("(max-width: 680px)").matches) {                                //отображаем одиночные иконки только на скрин<680

//               var x = document.getElementsByClassName('share-icon-li');          
//               x = [].slice.call(x); //I have converted the HTML Collection an array
//               x.forEach(function(item, i, arr) {
//               x[i].style.display = "block";  
//               });
// }
              

                  document.getElementsByClassName('my-nav-share-li')[0].style.display="block";

}
}, false);﻿*/