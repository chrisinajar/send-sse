# Send SSE [![Build Status](https://travis-ci.org/chrisinajar/send-sse.svg?branch=master)](https://travis-ci.org/chrisinajar/send-sse) [![Dependency Status](https://david-dm.org/chrisinajar/send-sse.svg)](https://david-dm.org/chrisinajar/send-sse) [![devDependency Status](https://david-dm.org/chrisinajar/send-sse/dev-status.svg)](https://david-dm.org/chrisinajar/send-sse#info=devDependencies)
Transmit Server-Sent Events over http.

## Installation

`npm install send-sse`

## Usage

```js
var sendSSE = require('send-sse');
var events = require('./events');

http.createServer(function (req, res) {
  sendSSE(res, events.onData);
}).listen(8080);

```

# API
#### `sendSSE(response, onOpen[, onClose])` -> `close`
Create an SSE stream on the **response** object, returning a **close** method to stop the stream.

##### response

*Required*  
Type: `http.ServerResponse`  

Response object from `http` to send the stream down.

##### onOpen

*Required*  
Type: `function (broadcast)`  

Method called when streaming events begins, passes in a **broadcase** method as the first parameter
which can be used to send events on the stream.

##### onClose

*Optional*  
Type: `function (broadcast)`  

Called when the connection is closed, either from client or server, passing in the same **broadcast** method
that **onOpen** receives.

**Note:** If `onClose` is not passed in, and `onOpen` returns a method, this method will be used as the `onClose` handler. This makes [geval](https://npmjs.org/geval) events work seamlessly.

# Contributing

`npm run test`

# License
MIT
