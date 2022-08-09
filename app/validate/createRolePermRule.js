'use strict';

module.exports = {
  role_id: {
    type: 'number',
    required: true,
  },
  permission_ids: {
    type: 'array',
    itemType: 'number',
    required: true,
  },
};
