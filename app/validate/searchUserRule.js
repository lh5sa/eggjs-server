'use strict';

module.exports = {
  email: {
    type: 'string?',
    trim: true,
  },
  username: {
    type: 'string?',
    trim: true,
  },
  id: {
    type: 'number',
    min: 1,
  },
};
