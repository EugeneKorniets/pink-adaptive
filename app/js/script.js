/* menu open/close control and no-js handler   start */
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

if (navMain != null) {
  navMain.classList.remove('main-nav--nojs');
}

if (navToggle != null & navMain != null) {
  
  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });
}
/* menu open/close control and no-js handler   end */



/* feedback-slider scroll controls handler   start */
var feedbackSliderInputs = document.getElementsByClassName('feedback__control');

if (feedbackSliderInputs.length > 1) {
  setInterval (feedbackSliderNext, 6000); // автоскролл фидбек слайдов
}

// регистрация обработчиков событий для переключателей фидбек-слайдов на десктопной версии
var feedbackPrevSlide = document.querySelector('.feedback__prev');
var feedbackNextSlide = document.querySelector('.feedback__next');

if (feedbackPrevSlide != null
  & feedbackNextSlide != null
  & feedbackSliderInputs.length > 1) {
  feedbackNextSlide.addEventListener('click', feedbackSliderNext);
  feedbackPrevSlide.addEventListener('click', feedbackSliderPrev);
}


/* Функции смены слайдов (previous and next)
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
/* feedback-slider scroll controls handler   end */


/* handler for sending form submissions   start */
var competitionForm = document.querySelector('.competition-form__container');
var notificationFormOK = document.querySelector('.competition-form__notification-ok');
var notificationFormError = document.querySelector('.competition-form__notification-error');
var btnCloseOK =  document.querySelector('.competition-form__notification-ok button');
var btnCloseError =  document.querySelector('.competition-form__notification-error button');
var modalOverlay = document.querySelector('.modal-overlay');


if (competitionForm != null) {
  competitionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    modalOverlay.classList.add('modal-overlay--show');
    notificationFormOK.classList.add('competition-form__notification-ok--show');
  });

  btnCloseOK.addEventListener('click', function(event) {
    event.preventDefault();
    modalOverlay.classList.remove('modal-overlay--show');
    notificationFormOK.classList.remove('competition-form__notification-ok--show');
  })
}

/* handler for sending form submissions   end */