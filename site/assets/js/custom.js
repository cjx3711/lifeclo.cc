// Custom Scripts for Primal Template //

jQuery(function($) {
    "use strict";


        // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
        var mainbottom = $('#main').offset().top;

        // on scroll,
        $(window).on('scroll',function(){

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
       }

      });


  // Collapse navbar on click

   $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });

    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
          $('#back-top').fadeIn();
      } else {
          $('#back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
      $('#back-top').tooltip('hide');
      $('body,html').animate({
          scrollTop: 0
      }, 1500);
      return false;
    });





  /*-------- Owl Carousel ---------- */
    $(".reviews").owlCarousel({

    slideSpeed : 200,
    items: 1,
    singleItem: true,
    autoPlay : true,
    pagination : false
    });


  /* ------ Clients Section Owl Carousel ----- */

    $(".clients").owlCarousel({
    slideSpeed : 200,
    items: 5,
    singleItem: false,
    autoPlay : true,
    pagination : false
    });


  /* ------ jQuery for Easing min -- */

    $(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
  });



/* --------- Wow Init ------ */

  new WOW().init();


  /* ----- Counter Up ----- */

$('.counter').counterUp({
		delay: 10,
		time: 1000
});

/* ----- Countdown ----- */

if($.find('#countdown')[0]) {
	 $('#countdown').countDown({
			 targetDate: {
					 'day': 		14,
					 'month': 	7,
					 'year': 	2017,
					 'hour': 	11,
					 'min': 		13,
					 'sec': 		0
			 },
			 omitWeeks: true
	 });
 //enter the count down date using the format year, month, day, time: hour, min, sec
 if( $('.day_field .top').html() == "0" ) $('.day_field').css('display','none');
}


/*----- Preloader ----- */

    $(window).load(function() {
  		setTimeout(function() {
        $('#loading').fadeOut('slow', function() {
        });
      }, 3000);
    });


/*----- Subscription Form ----- */

$(document).ready(function() {
  // jQuery Validation
  $("#signup").validate({
    // if valid, post data via AJAX
    submitHandler: function(form) {
      $.post("assets/php/subscribe.php", { email: $("#email").val() }, function(data) {
        $('#response').html(data);
      });
    },
    // all fields are required
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });

  const a = "clo"
  const b = "cc"
  const c = "llo"
  const d = "he"
  const e = "life"

  const f = d + c + "@" + e + a + '.' + b
  const email = document.getElementById("email")
  email.href = "mai" + "lto:" + f
  email.innerHTML = f

  const email2 = document.getElementById("email2");
  if (email2) {
    email2.href = "mai" + "lto:" + f
  }
});

});
