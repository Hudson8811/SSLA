$(document).ready(function () {
	$(".scroll").click(function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top - 40;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({
			scrollTop: top
		}, 1500);
		$('.mobile-menu-trigger').removeClass('open');
		$('#header .menu').removeClass('open');
		$('body').removeClass('hid');
	});
});

$(window).scroll(function () {
	var pos = $(this).scrollTop();
	var destination1 = $('.banner_block').outerHeight();
	if (pos > destination1)
		$('#header .call_me').addClass('active');
	else
		$('#header .call_me').removeClass('active');
});

$(document).ready(function () {
	$('body').click(function (e) {
		if (!$(e.target).parents('.open').length && !$(e.target).hasClass('open')) {
			$('.open').removeClass('open');
			$('body').removeClass('hid');
		}
	});

	$('.mobile-menu-trigger').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('open');
		$('#header .menu').toggleClass('open');
		$('body').toggleClass('hid');
	});
});

$(".input-mask").inputmask("+7 (999) 999-99-99");


$(document).ready(function () {
	if ($('.js-test-slider').length > 0) {
		var test_slider = $('.js-test-slider').slick({
			arrows: false,
			touch: false,
			swipe: false,
			touchMove: false,
			accessibility: false,
			infinite: false,
			//fade: true
			adaptiveHeight: true

		});
		var current = $('.head-test-number__current');
		var max = parseInt($('.head-test-number__max').html());

		var calc_type_1 = $('.js-test-slider--calc-type-1');

		test_slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$(this).addClass('test-slider-change');

			if (nextSlide === max) {
				if (calc_type_1.length > 0) {

					var summ = 0;
					for (i = 1; i <= max; ++i) {
						var item = calc_type_1.find('input[name="step-' + i + '"]:checked');
						summ += parseInt(item.val());
					}

					$('#test-result-points__val').html(summ);

					$('#test-results .test-results__item').each(function () {
						var min = parseInt($(this).attr('data-min'));
						var max = parseInt($(this).attr('data-max'));
						if (summ >= min && summ <= max) {
							$(this).addClass('test-results__item--active');
						}

					});

				}
			}
		});
		test_slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$(this).removeClass('test-slider-change');
			current.html(Math.min((currentSlide + 1), max));
		});




		$('body').on('click', '.js-next-slide', function () {
			$(this).closest('.slick-slider').slick('next');
		});


		$('.js-test-slider').on('change', '.custom-radio__inp, .cr-arl__inp', function () {
			$(this).closest('.slick-slider').slick('next');
		});

	}
	/**************************/
	$("#form1").submit(function () {



		$.ajax({
			type: "POST",
			url: "assets/form1.php",
			data: $("#form1").serialize(),
			success: function (html) {}
		});

		$('#spasibo').arcticmodal();
		$('#form1').trigger("reset");
		return false;
	});
	/**************************/
});

$('.form_block .radio').click(function () {
	var selected = false;
	$("input.rad").each(function () {
		if ($(this).prop("checked")) {
			selected = true;
		}
	});
	if (selected) {
		$("#required").prop('required', false);
	} else {
		$("#required").prop('required', true);
	}
});

$('.form_block .radio.item1').click(function () {
	$('.form_block .radio.item2 input').prop('checked', false);
});

$('.form_block .radio.item2').click(function () {
	$('.form_block .radio.item1 input').prop('checked', false);
});