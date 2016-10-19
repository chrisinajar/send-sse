var test = require('tape');
var Essey = require('essey');
var http = require('http');
var interval = require('thyming').interval;
var sendSSE = require('./');

test('basic', function (t) {
  var server = http.createServer(function (req, res) {
    sendSSE(res, onOpen);

    function onOpen (sendEvent) {
      return interval(function () {
        sendEvent('indeed!');
      }, 200);
    }
  }).listen(3456);

  var events = Essey('http://127.0.0.1:3456');
  var eventCount = 0;
  events.onData(function (data) {
    t.equal(data.data, 'indeed!', 'gets data');
    if (eventCount++ === 2) {
      events.close();
      server.close();
      t.end();
    }
  });
});
