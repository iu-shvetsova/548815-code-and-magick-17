'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_GAP = 50;
var VERTICAL_GAP = 15;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var NAME_HEIGHT = 25;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (elements) {
  var max = 0;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i] > max) {
      max = elements[i];
    }
  }

  return max;
};

var getColumnHeight = function (maxTime, currentTime) {
  return COLUMN_MAX_HEIGHT * currentTime / maxTime;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 50);

  if (names[0] !== 'Вы') {
    var playerIndex;
    for (var i = 1; i < names.length; i++) {
      if (names[i] === 'Вы') {
        playerIndex = i;
      }
    }

    var temp = names[playerIndex];
    names[playerIndex] = names[0];
    names[0] = temp;

    temp = times[playerIndex];
    times[playerIndex] = times[0];
    times[0] = temp;
  }

  var columnColor;
  var columnHeight;

  var maxTime = getMaxElement(times);

  for (i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - VERTICAL_GAP);
    columnHeight = Math.round(getColumnHeight(maxTime, times[i]));
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - VERTICAL_GAP - NAME_HEIGHT - columnHeight);
    if (i === 0) {
      columnColor = 'rgba(255, 0, 0, 1)';
    } else {
      columnColor = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillStyle = columnColor;
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - NAME_HEIGHT, COLUMN_WIDTH, columnHeight * -1);
  }
};
