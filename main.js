#!/usr/bin/env node
'use strict';

let io = require('socket.io-client');

let url = process.argv[2];

if(!url) {
    console.error("Missing URL.");
    process.exit(-1);
}

let server = io.connect(url);

require('socketio-wildcard')(io.Manager)(server);

server.on('*', function(message) {
    console.log(message.data[0], JSON.stringify(message.data[1]));
});

server.on('disconnect', function() {
    process.exit();
});
