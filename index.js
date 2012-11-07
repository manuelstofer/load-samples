/*global XMLHttpRequest, require, module, alert*/

'use strict';

var each = require('each');

module.exports = loadSamples;

function loadSamples(context, urls, fn) {
    var missingSamples = urls.length,
        buffers = [];

    each(urls, function (url, index) {

        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            missingSamples--;
            buffers[index] = context.createBuffer(request.response, true);

            if (missingSamples === 0) {
                fn(buffers);
            }
        });

        request.addEventListener('error', function () {
            alert('Bad news: The samples failed load');
        });

        request.send();
    });
}
