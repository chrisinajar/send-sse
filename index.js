var isFunction = require('is-function');

module.exports = sendSSE;

function sendSSE (res, open, close) {
  var stopped = false;
  res.setHeader('Content-Type', 'text/event-stream');

  var openRes = open(sendEvent);
  // if no close method was given, and the return of the open method is a function
  // then use that return method as the close handler
  if (!isFunction(close) && isFunction(openRes)) {
    close = openRes;
  }

  res.on('close', function () {
    if (isFunction(close)) {
      close(sendEvent);
    }
    stopped = true;
  });

  return end;

  function end () {
    res.end();
    stopped = true;
  }

  function sendEvent (msg) {
    if (stopped) {
      throw new Error('Cannot broadcast SSE events after connection has been closed');
    }
    if (typeof msg !== 'string') {
      msg = JSON.stringify(msg);
    }
    res.write([
      'data: ',
      msg,
      '\n\n'
    ].join(''));
  }
}
