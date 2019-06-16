'use strict';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var playerName = setup.querySelector('.setup-user-name');

var playerWizard = setup.querySelector('.setup-player');
var playerWizardCoatColor = playerWizard.querySelector('.wizard-coat');
var playerWizardEyesColor = playerWizard.querySelector('.wizard-eyes');
var playerFireballColor = playerWizard.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var NUMBER_OF_WIZARDS = 4;
var wizards = [];

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var onPopupEscPress = function (evt) {
  if (!(playerName === document.activeElement) && (evt.keyCode === ESC_KEYCODE)) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var getNextColor = function (currentColor, colors) {
  for (var i = 0; i < colors.length - 1; i++) {
    if (currentColor === colors[i]) {
      return colors[i + 1];
    }
  }

  return colors[0];
};

playerWizardCoatColor.addEventListener('click', function () {
  playerWizardCoatColor.style.fill = getNextColor(playerWizardCoatColor.style.fill, COAT_COLORS);
});

playerWizardEyesColor.addEventListener('click', function () {
  playerWizardEyesColor.style.fill = getNextColor(playerWizardEyesColor.style.fill, EYES_COLORS);
});

playerFireballColor.addEventListener('click', function () {
  console.log(playerFireballColor.style.backgroundColor);
  // playerFireballColor.style.backgroundColor = getNextColor(playerFireballColor.style.backgroundColor, FIREBALL_COLORS);
});

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var generateWizards = function () {
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards[i] = {
      name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var drawSimilarWizards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

generateWizards();
drawSimilarWizards();
