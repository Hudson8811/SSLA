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



	$('a[href="#buy-plug"]').click(function(e){
		e.preventDefault();

		$.fancybox.open({
			src  : '#buy-plug',
			type : 'inline',
			opts : {
				touch:false

			}
		});
	});



	if ($('.js-test-slider').length > 0) {


		var test_slider = $('.js-test-slider').slick({
			arrows: false,
			touch: false,
			swipe: false,
			touchMove: false,
			accessibility: false,
			infinite: false,
			//fade: true
			//adaptiveHeight: true,

		});
		var current = $('.head-test-number__current');
		var max = parseInt($('.head-test-number__max').html());
		var calc_type_1 = $('.js-test-slider--calc-type-1');
		var calc_type_2 = $('.js-test-slider--calc-type-2');
		test_slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$(this).addClass('test-slider-change');

			if (nextSlide === max) {

				$('.test-slider--main .test-slide:last-child .test-slide__content').slideDown(300);
				$('.js-test-slider-top .hide-this-after-test').slideUp(200);


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

				} else if (calc_type_2.length > 0) {
					var sum = [0, 0, 0, 0, 0];

					for (i = 1; i <= max; ++i) {
						var item = calc_type_2.find('input[name="step-' + i + '"]:checked');
						var data = parseInt(item.data('type'));

						sum[data - 1] += 1;
					}

					var mini = getMinIndex(sum) + 1;
					var maxi = getMaxIndex(sum) + 1;

					var minText = $('#trt2-parameter-' + mini).siblings('.trt2-parameter__name').data('to-span');
					var maxText = $('#trt2-parameter-' + maxi).siblings('.trt2-parameter__name').html();

					$('#otsutstvuet-sklonnost-k').html(minText);
					$('#sklonnost-k').html(maxText);


					$.each(sum, function (index, value) {
						console.log(index, value);
						var id = index + 1;
						var val = declOfNum(value, ['балл', 'балла', 'баллов']);
						$('#trt2-parameter-' + id).html('<span>' + value + '</span> ' + val);
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


function getMaxIndex(array) {
	var max = array[0];
	var index = 0;
	for (var i = 0; i < array.length; i++) {
		if (max < array[i]) {
			max = array[i];
			index = i;
		};
	}

	return index;
}


function getMinIndex(array) {
	var min = array[0];
	var index = 0;
	for (var i = 0; i < array.length; i++) {
		if (min > array[i]) {
			min = array[i];
			index = i;
		}
	}
	return index;
}

function declOfNum(n, text_forms) {
	n = Math.abs(n) % 100;
	var n1 = n % 10;
	if (n > 10 && n < 20) {
		return text_forms[2];
	}
	if (n1 > 1 && n1 < 5) {
		return text_forms[1];
	}
	if (n1 == 1) {
		return text_forms[0];
	}
	return text_forms[2];
}