'use strict';

module.exports = {
  user_id: {
    type: 'number',
    required: true,
  },
  role_ids: {
    type: 'array',
    itemType: 'number',
    required: true,
  },
};
