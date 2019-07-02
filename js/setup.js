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

  var form = document.querySelector('.setup-wizard-form');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var NUMBER_OF_WIZARDS = 4;

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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      var randomWizard = getRandomElement(wizards);
      fragment.appendChild(renderWizard(randomWizard));
    }

    similarListElement.appendChild(fragment);
  };

  window.backend.load(successHandler, errorHandler);

})();
