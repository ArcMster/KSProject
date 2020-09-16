/*jshint jquery:true */

$(document).ready(function($) {
	"use strict";

	/* global google: false */
	/*jshint -W018 */

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.iso-call');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.trigger('resize');
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});

				setTimeout(Resize, 1500);
			});
		} catch(err) {
		}

		winDow.on('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').on('click', function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	/* ---------------------------------------------------------------------- */
	/*	filter portfolio toggle
	/* ---------------------------------------------------------------------- */

	var togButton = $('a.filter-toggle'),
		filterList = $('ul.filter');

	togButton.on('click', function(event){
		event.preventDefault();
		filterList.slideToggle();
	});

	/*-------------------------------------------------*/
	/* =  Search animation
	/*-------------------------------------------------*/
	
	var searchToggle = $('.open-search'),
		inputAnime = $(".form-search"),
		body = $('body');

	searchToggle.on('click', function(event){
		event.preventDefault();

		if ( !inputAnime.hasClass('active') ) {
			inputAnime.addClass('active');
		} else {
			inputAnime.removeClass('active');			
		}
	});

	body.on('click', function(){
		inputAnime.removeClass('active');
	});

	var elemBinds = $('.open-search, .form-search');
	elemBinds.bind('click', function(e) {
		e.stopPropagation();
	});

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
	try {
		$('.statistic-post').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
		});
	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/
	try {
		var owlWrap = $('.owl-wrapper');

		if (owlWrap.length > 0) {

			if (jQuery().owlCarousel) {
				owlWrap.each(function(){

					var carousel= $(this).find('.owl-carousel'),
						dataNum = $(this).find('.owl-carousel').attr('data-num'),
						dataNum2,
						dataNum3;

					if ( dataNum == 1 ) {
						dataNum2 = 1;
						dataNum3 = 1;
					} else if ( dataNum == 2 ) {
						dataNum2 = 2;
						dataNum3 = dataNum - 1;
					} else {
						dataNum2 = dataNum - 1;
						dataNum3 = dataNum - 2;
					}

					carousel.owlCarousel({
						autoPlay: 10000,
						navigation : true,
						items : dataNum,
						  animateOut: 'slideOutUp',
  animateIn: 'slideInUp',

						itemsDesktop : [1199,dataNum2],
						itemsDesktopSmall : [991,dataNum3],
						itemsTablet : [768, dataNum3],
					});

				});
			}
		}

	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */

	try {
		mapfunction();
	} catch(err) {

	}
	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/

	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			slideshowSpeed: 10000,
			easing: "swing"
		});
	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');
	
	try{		
		slidertestimonial.bxSlider({
			mode: 'vertical'
		});
	} catch(err) {
	}
	

	/* ---------------------------------------------------------------------- */
	/*	menu responsive
	/* ---------------------------------------------------------------------- */
	var menuClick = $('a.elemadded'),
		navbarVertical = $('.nav-menu');
		
	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.slideUp(300).removeClass('active');
		} else {
			navbarVertical.slideDown(300).addClass('active');
		}
	});

	winDow.on('resize', function(){
		if ( winDow.width() > 991 ) {
			navbarVertical.slideDown(300).removeClass('active');
		} else {
			navbarVertical.slideUp(300).removeClass('active');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-danger').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 40;
			document.querySelector( 'header, a.go-top' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 100 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
				$( 'a.go-top' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
				$( 'a.go-top' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
	})();

});

function Resize() {
	$(window).trigger('resize');
}

function mapfunction() {
	var fenway = [37.7940035,-122.2463581]; //Change a map coordinate here!
	var markerPosition = [37.7940035,-122.2463581]; //Change a map marker here!
	$('#map').gmap3({
			center: fenway,
			zoom: 12,
			scrollwheel: false,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		})
		.marker({
			position: markerPosition,
			icon: 'images/marker.png'
	});
}
	
/* ---------------------------------------------------------------------- */
/*	works carousel
/* ---------------------------------------------------------------------- */

$(window).on('load', function() {
	var winDowHeight = $(window).outerHeight();
	$('header').css('height', winDowHeight);
});
$(window).on('resize', function() {
	var winDowHeight = $(window).outerHeight();
	$('header').css('height', winDowHeight);
});

		function notshowme(){
		$('.hovdiv').css("display","none");
		}

		$("#Egypt").on("click",function(){
			$(".eg").toggle()
		});
		$("#Saudi").on("click",function(){
			$(".sa").toggle()
		});
		$("#Qatar").on("click",function(){
			$(".qa").toggle()
		});
		$("#Algeria").on("click",function(){
			$(".al").toggle()
		});
		$("#Tunisia").on("click",function(){
			$(".tu").toggle()
		});
		$("#Morocco").on("click",function(){
			$(".mo").toggle()
		});
		$("#South-Africa").on("click",function(){
			$(".sou").toggle()
		});
		$("#Uae").on("click",function(){
			$(".ua").toggle()
		});
		$("#Brazil").on("click",function(){
			$(".bra").toggle()
		});
		$("#Argentina").on("click",function(){
			$(".arg").toggle()
		});
		$("#Canada").on("click",function(){
			$(".can").toggle()
		});
		$("#USA").on("click",function(){
			$(".us").toggle()
		});
		$("#Australia").on("click",function(){
			$(".au").toggle()
		});
		$("#Singapore").on("click",function(){
			$(".sin").toggle()
		});
		$("#India").on("click",function(){
			$(".in").toggle()
		});
		$("#Malaysia").on("click",function(){
			$(".mal").toggle()
		});
		$("#Indonesia").on("click",function(){
			$(".indo").toggle()
		});
		$("#Japan").on("click",function(){
			$(".jap").toggle()
		});
		$("#China").on("click",function(){
			$(".chi").toggle()
		});
		$("#Russia").on("click",function(){
			$(".ru").toggle()
		});
		$("#Greece").on("click",function(){
			$(".gr").toggle()
		});
		$("#Italy").on("click",function(){
			$(".ita").toggle()
		});
		$("#Spain").on("click",function(){
			$(".spa").toggle()
		});
		$("#Portugal").on("click",function(){
			$(".por").toggle()
		});
		$("#France").on("click",function(){
			$(".fra").toggle()
		});
		$("#Ireland").on("click",function(){
			$(".irl").toggle()
		});
		$("#Dach").on("click",function(){
			$(".dach").toggle()
		});
		$("#Czech").on("click",function(){
			$(".cz").toggle()
		});
		$("#Poland").on("click",function(){
			$(".pol").toggle()
		});
		$("#Netherlands").on("click",function(){
			$(".neth").toggle()
		});
		$("#United-Kingdom").on("click",function(){
			$(".uk").toggle()
		});
		$("#Thailand").on("click",function(){
			$(".thai").toggle()
		});
		$("#Ukraine").on("click",function(){
			$(".ukr").toggle()
		});
		$("#Croatia").on("click",function(){
			$(".cro").toggle()
		});
		$("#Norway").on("click",function(){
			$(".nor").toggle()
		});
		$("#Sweden").on("click",function(){
			$(".swed").toggle()
		});
		$("#Denmark").on("click",function(){
			$(".den").toggle()
		});
		$("#Serbia").on("click",function(){
			$(".serb").toggle()
		});
		$("#Bosnia-Herze").on("click",function(){
			$(".bos").toggle()
		});
		$("#Romania").on("click",function(){
			$(".rom").toggle()
		});
		$("#Hungary").on("click",function(){
			$(".hun").toggle()
		});
		$("#Belarus").on("click",function(){
			$(".bela").toggle()
		});
		$("#Finland").on("click",function(){
			$(".fela").toggle()
		});
