'use strict';

module.exports = {
  // origin: ['http://localhost:8080'],
  origin: '*',
  keepHeadersOnError: true,
  allowMethods: 'GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS',
  allowHeaders: [
    'Accept',
    'Content-Type',
    'Client-Signature',
    'User-Token',
    'x-requested-with',
  ],
};
