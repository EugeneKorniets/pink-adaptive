/* menu open/close control and no-js handler   start */
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
	if (navMain.classList.contains('main-nav--closed')) {
		navMain.classList.remove('main-nav--closed');
		navMain.classList.add('main-nav--opened');
	} else {
		navMain.classList.add('main-nav--closed');
		navMain.classList.remove('main-nav--opened');
	}
});
/* menu open/close control and no-js handler   end */

/* feedback-slider scroll controls handler   start */
var feedbackSliderInputs = document.getElementsByClassName('feedback__control');

setInterval (feedbackSliderNext, 8000); // автоскролл фидбек слайдов

/* Функциb смены слайдов (previous and next)
 * запускаем цикл поиска активного слайда в коллекции
 * проверяем активность текущего слайда
 * если слайд последний, активируем первый
 * иначе активируем следующий
*/
function feedbackSliderPrev() {
    for (var i = feedbackSliderInputs.length - 1; i >= 0; i--) {
        if (feedbackSliderInputs[i].checked == true) {
            if(i == 0) {
                feedbackSliderInputs[feedbackSliderInputs.length - 1].checked = true;
                return;
            } else {
                feedbackSliderInputs[i-1].checked = true;
                return;
            }
        }
    }
}

function feedbackSliderNext() {
    for (var i = 0; i <= feedbackSliderInputs.length - 1; i++) {
        if (feedbackSliderInputs[i].checked == true) {
            if(i == feedbackSliderInputs.length - 1) {
                feedbackSliderInputs[0].checked = true;
                return;
            } else {
                feedbackSliderInputs[i+1].checked = true;
                return;
            }
        }
    }
}

// регистрация обработчиков событий для переключателей фидбек-слайдов на десктопной версии

var feedbackPrevSlide = document.querySelector('.feedback__prev');
var feedbackNextSlide = document.querySelector('.feedback__next');

feedbackNextSlide.addEventListener('click', feedbackSliderNext);
feedbackPrevSlide.addEventListener('click', feedbackSliderPrev);
/* feedback-slider scroll controls handler   end */