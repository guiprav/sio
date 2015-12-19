#!/usr/bin/env node
'use strict';

let io = require('socket.io-client');

let url = process.argv[2];

if(!url) {
    console.error("Missing URL.");
    process.exit(-1);
}

let eventNames = process.argv.slice(3);

if(eventNames.length === 0) {
    console.error("Missing event names.");
    process.exit(-1);
}

let server = io.connect(url);

eventNames.forEach(function(eventName) {
    server.on(eventName, function(data) {
        console.log(eventName, JSON.stringify(data));
    });
});

server.on('disconnect', function() {
    process.exit();
});
