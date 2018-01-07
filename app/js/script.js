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

// обработчики событий для свайпов влево и вправо для feedback-slider
var initialPoint;
var finalPoint;
var feedbackSlider = document.querySelector('.feedback__list');

if (feedbackSlider != null) {
  feedbackSlider.addEventListener('touchstart', function(event) {
    initialPoint=event.changedTouches[0];
  }, false);

  feedbackSlider.addEventListener('touchend', function(event) {
    var sensitivy = 40;
    finalPoint=event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    if (xAbs > sensitivy) {
      event.preventDefault();
      event.stopPropagation();
      if (finalPoint.pageX < initialPoint.pageX) {
        swipeFeedbackNext();
      }
      else {
        swipeFeedbackPrev()
      }
    };
  }, false);
};


function swipeFeedbackPrev() {
  if (feedbackSliderInputs[0].checked == true) {
    return;
  } else {
    feedbackSliderPrev();
  }
}

function swipeFeedbackNext() {
  if (feedbackSliderInputs[feedbackSliderInputs.length - 1].checked == true) {
    return;
  } else {
    feedbackSliderNext();
  }
}
/* feedback-slider scroll controls handler   end */


/* price-slider scroll controls handler start */
var priceSlider = document.querySelector('.price__list');
var priceSliderInputs = document.getElementsByClassName('price__control');

// обработчики событий для свайпов влево и вправо для price-slider
if (priceSlider != null) {
  priceSlider.addEventListener('touchstart', function(event) {
    initialPoint=event.changedTouches[0];
  }, false);

  priceSlider.addEventListener('touchend', function(event) {
    var sensitivy = 40;
    finalPoint=event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    if (xAbs > sensitivy) {
      event.preventDefault();
      event.stopPropagation();
      if (finalPoint.pageX < initialPoint.pageX) {
        swipePriceNext();
      }
      else {
        swipePricePrev()
      }
    };
  }, false);
};


function swipePricePrev() {
  if (priceSliderInputs[0].checked == true) {
    return;
  } else {
    for (var i = priceSliderInputs.length - 1; i >= 0; i--) {
      if (priceSliderInputs[i].checked == true) {
        if(i == 0) {
          priceSliderInputs[priceSliderInputs.length - 1].checked = true;
          return;
        } else {
          priceSliderInputs[i-1].checked = true;
          return;
        }
      }
    }
  }
}

function swipePriceNext() {
  if (priceSliderInputs[priceSliderInputs.length - 1].checked == true) {
    return;
  } else {
    for (var i = 0; i <= priceSliderInputs.length - 1; i++) {
      if (priceSliderInputs[i].checked == true) {
        if(i == priceSliderInputs.length - 1) {
          priceSliderInputs[0].checked = true;
          return;
        } else {
          priceSliderInputs[i+1].checked = true;
          return;
        }
      }
    }
  }
}
/* price-slider scroll controls handler end */


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


// yandex map start
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
  myMap = new ymaps.Map("map", {
    center: [55.75729150100909,37.612833961195896],
    zoom: 14,
    controls: []
  });

  myPlacemark = new ymaps.Placemark(
    [55.75729150100909,37.612833961195896],
    { 
      hintContent: '',
      balloonContent: ''
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map-marker.svg',
      iconImageSize: [40, 40],
      iconImageOffset: [0, 0]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors
    .disable(['rightMouseButtonMagnifier', 'scrollZoom']);
};

// yandex map end