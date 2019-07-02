'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);

      xhr.open('GET', LOAD_URL);
      xhr.send();
    }
  };
})();
