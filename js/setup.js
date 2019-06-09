'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var NUMBER_OF_WIZARDS = 4;
var wizards = [];

var setName = function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  return names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)];
};

var setCoatColor = function () {
  var colors = ['rgb(101, 137, 164)', 'rgb(101, 137, 164)', 'rgb(146, 100, 161)', 'rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  return colors[Math.floor(Math.random() * colors.length)];
};

var setEyesColor = function () {
  var colors = ['black', 'red', 'blue', 'yellow', 'green'];

  return colors[Math.floor(Math.random() * colors.length)];
};

var defineWizards = function () {
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards[i] = {
      name: setName(),
      coatColor: setCoatColor(),
      eyesColor: setEyesColor()
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

var drawSimilarList = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

userDialog.querySelector('.setup-similar').classList.remove('hidden');

defineWizards();
drawSimilarList();
