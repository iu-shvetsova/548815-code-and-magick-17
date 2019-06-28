'use strict';

(function () {
  var setup = document.querySelector('.setup');

  var playerWizard = setup.querySelector('.setup-player');
  var playerWizardCoatColor = playerWizard.querySelector('.wizard-coat');
  var inputCoatColor = playerWizard.querySelector('input[name=coat-color]');
  var playerWizardEyesColor = playerWizard.querySelector('.wizard-eyes');
  var inputEyesColor = playerWizard.querySelector('input[name=eyes-color]');
  var playerFireballColor = playerWizard.querySelector('.setup-fireball-wrap');
  var inputFireballColor = playerFireballColor.querySelector('input[name=fireball-color]');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var NUMBER_OF_WIZARDS = 4;
  var wizards = [];

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  playerWizardCoatColor.addEventListener('click', function () {
    inputCoatColor.value = getRandomElement(COAT_COLORS);
    playerWizardCoatColor.style.fill = inputCoatColor.value;
  });

  playerWizardEyesColor.addEventListener('click', function () {
    inputEyesColor.value = getRandomElement(EYES_COLORS);
    playerWizardEyesColor.style.fill = inputEyesColor.value;
  });

  playerFireballColor.addEventListener('click', function () {
    inputFireballColor.value = getRandomElement(FIREBALL_COLORS);
    playerFireballColor.style.backgroundColor = inputFireballColor.value;
  });

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
})();
