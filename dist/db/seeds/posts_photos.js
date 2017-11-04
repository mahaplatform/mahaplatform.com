'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var postFixtures = new _maha.Fixtures({
  tableName: 'maha_posts_photos',
  records: [{
    id: 1,
    team_id: 1,
    post_id: 1,
    asset_id: 90,
    delta: 0,
    created_at: '2017-11-03T21:30:00.955Z',
    updated_at: '2017-11-03T21:30:00.955Z'
  }]
});

exports.default = postFixtures;