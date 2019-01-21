

//чтобы отключить ВСЕ возможные методы скрола

 $('.card-item').on('click', event => {
    $(event.currentTarget).addClass('active-card');
    
    $(event.currentTarget).siblings().removeClass('active-card');  

    var plasticChosen = $(event.currentTarget).find(".card-color-title").text();
     $('#input1').val(plasticChosen); 
 
  });


 $('.card-item-lamination').on('click', event => {
    $(event.currentTarget).addClass('active-lam');
    
    $(event.currentTarget).siblings().removeClass('active-lam');    

       var lamChosen = $(event.currentTarget).find(".lam-title").text();
       
     $('#input2').val(lamChosen); 

  });


 $('.range-item').on('click', event => {
    $(event.currentTarget).addClass('active-range');
    
    $(event.currentTarget).siblings().removeClass('active-range'); 

    var rangeChosen = $(event.currentTarget).find(".how-much").text();
     $('#input11').val(rangeChosen); 
     
    
  });





$(window).load(function() {
                $('#glance-blick').shiningImage({
                    scale : 0.4,
                    speed : 150,
                    opacity: 0.3,
                    delay : 400
                });
                $('.page3').on('mouseenter', event => {
                  setTimeout(function(){  $('#glance-blick').data('shiningImage').stopshine();}, 300);
                });
 });









function check() {
  var pole1 = document.getElementById('name'),
      pole2 = document.getElementById('phone');
   pole1.value && pole2.value ?  $('#subm1').removeClass('disabled') : $('#subm1').addClass('disabled')
}
function checkP7() {
  var pole1 = document.getElementById('name-p7'),
      pole2 = document.getElementById('phone-p7');
   pole1.value && pole2.value ?  $('#subm2').removeClass('disabled') : $('#subm2').addClass('disabled')
}







//ФОРМА ОБРАТНОЙ СВЯЗИ
$(function() {
 
    $('#popupbutton').fancybox({
        
        'padding': 37,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 320,
        'minHeight': 270

 
    });
 
    $('#phone').mask('0 (000) 000-00-00');
 
    $("#form-feedback").submit(function(event) {
 
        if ($('#name').val() == "")
            {
                $('#bthrow_error_name').fadeIn(1000).html('Представьтесь, пожалуйста.');
            }
        else if ($('#phone').val() == "")
            {
                $('#bthrow_error_name').empty();
                $('#bthrow_error_phone').fadeIn(1000).html('Как с Вами связаться?');
            }
        else
            {
                var postForm = {
                    'name'  : $('#name').val(),
                    'phone'  : $('#phone').val()
                };
 
                $.ajax({
                    type        : 'POST',
                    url         : 'feedback.php',
                    data        : postForm,
                    dataType    : 'json',
                    success     : function(data)
                        {
                            if (!data.success)
                                {
                                    if (data.errors.name)
                                        {
                                            $('.throw_error').fadeIn(1000).html(data.errors.name);
                                        }
                                }
                            else
                                {
                                    $('#form-feedback').fadeIn(1000).html(data.posted);
                                }
                        }
                });
            }
 
        event.preventDefault();
 
    });
 
});
//ФОРМА ОБРАТНОЙ СВЯЗИ



$(function() {
 
   
    $('#phone-p7').mask('0 (000) 000-00-00');
 
    $("#form-feedback-p7").submit(function(event) {
 
        if ($('#name-p7').val() == "")
            {
                $('#bthrow_error_name-p7').fadeIn(1000).html('Представьтесь, пожалуйста.');
            }
        else if ($('#phone-p7').val() == "")
            {
                $('#bthrow_error_name-p7').empty();
                $('#bthrow_error_phone-p7').fadeIn(1000).html('Как с Вами связаться?');
            }
        else
            {
                 var postForm = {
                    'name-p7'  : $('#name-p7').val(),
                    'phone-p7'  : $('#phone-p7').val(),
                    'тип_пластика'  : $('#input1').val(),
                    'ламинация'  : $('#input2').val(),
                    'фольгирование'  : $('#input3').val(),
                    'порядковый_номер'  : $('#input4').val(),
                    'эмбоссирование'  : $('#input5').val(),
                    'полоса для подписи'  : $('#input6').val(),
                    'магнитная полоса'  : $('#input7').val(),
                    'скретч-полоса'  : $('#input8').val(),
                    'штрих-код'  : $('#input9').val(),
                    'чип'  : $('#input10').val(),
                    'тираж'  : $('#input11').val(),
                    'нужен_ли_образец'  : $('#input12').val(),

                    
                };
 
                $.ajax({
                    type        : 'POST',
                    url         : 'feedback-p7.php',
                    data        : postForm,
                    dataType    : 'json',
                    success     : function(data)
                        {
                            if (!data.success)
                                {
                                    if (data.errors.name)
                                        {
                                            $('.throw_error-p7').fadeIn(1000).html(data.errors.name);
                                        }
                                }
                            else
                                {
                                    $('#form-feedback-p7').fadeIn(1000).html(data.posted);
                                }
                        }
                });
            }
 
        event.preventDefault();
 
    });
 
});




$('.checking').on('click', function () {
    if ($('#checkbox1').is(':checked')) {
        $('.star').css('opacity', '1');
        $('#input3').val('<span style="color:blue;">Фольгирование --- нужно</span>');
       
    } else {
          $('.star').css('opacity', '0.35');
          $('#input3').val('---не_выбрано---');
       
    }
    if ($('#checkbox2').is(':checked')) {
        $('.number-short').css('opacity', '1');
        $('#input4').val('<span style="color:blue;">Порядковый_номер --- нужно</span>');        
    } else {
          $('.number-short').css('opacity', '0.35');
          $('#input4').val('---не_выбрано---');
    }
    if ($('#checkbox3').is(':checked')) {
        $('.number').css('opacity', '1');
        $('#input5').val('<span style="color:blue;">Эмбоссирование --- нужно</span>');
    } else {
          $('.number').css('opacity', '0.35');
          $('#input5').val('---не_выбрано---');
    }
    if ($('#checkbox4').is(':checked')) {
        $('.signature').css('opacity', '1');
        $('#input6').val('<span style="color:blue;">Полоса для подписи --- нужно</span>');
    } else {
          $('.signature').css('opacity', '0.35');
          $('#input6').val('---не_выбрано---');
    }
    if ($('#checkbox5').is(':checked')) {
        $('.magnit').css('opacity', '1');
        $('#input7').val('<span style="color:blue;">Магнитная полоса --- нужно</span>');
    } else {
          $('.magnit').css('opacity', '0.35');
          $('#input7').val('---не_выбрано---');
    }
    if ($('#checkbox6').is(':checked')) {
        $('.scratch-code').css('opacity', '1');
        $('#input8').val('<span style="color:blue;">Cкретч-полоса --- нужно</span>');
    } else {
          $('.scratch-code').css('opacity', '0.35');
          $('#input8').val('---не_выбрано---');
    }
    if ($('#checkbox7').is(':checked')) {
        $('.shtr-code').css('opacity', '1');
        $('#input9').val('<span style="color:blue;">Штрих-код --- нужно</span>');       
    } else {
          $('.shtr-code').css('opacity', '0.35');
          $('#input9').val('---не_выбрано---');
    }
    if ($('#checkbox8').is(':checked')) {
        //here can be visual effect
        $('#input10').val('<span style="color:blue;">Чип --- нужно</span>');       
    } else {
        //here can be visual effect
          $('#input10').val('---не_выбрано---');
    }
});


$('.checking-example').on('click', function () {
    if ($('#checkbox-example1').is(':checked')) {
       $('#input12').val('<span style="color:blue;">Да. Нужен образец</span>');
    } else {
          $('#input12').val('Нет. Образец не нужен');
    }
});






$('#conf-popup').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 850,
        'minHeight': 570,

 
});





//fancybox popup
$(document).ready(function() {
    $(".various").fancybox({

    allowfullscreen: 'true',
    autoDimensions: 'false',
    'padding' : 0,  
    'autoSize': false,      
   /* 'width': 650, 
    'height': 370*/
 /*   width : (window.innerWidth*0.50),
    height : (window.innerWidth*0.28913396),*/
       width : (window.innerWidth*0.70),
    height : (window.innerWidth*0.38913396),
        });
})


$('#watch-about-popup1').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 255,
      
        
 
});
$('#watch-about-popup2').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 255,
       

 
});
$('.close-btn').click(function(){parent.$.fancybox.close();})



$('#info-popup1').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup2').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup3').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup4').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup5').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup6').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup7').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});
$('#info-popup8').fancybox({
        'padding': 25,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 520,
        'minHeight': 570,

 
});







