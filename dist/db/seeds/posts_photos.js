'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = postFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(postFixtures, 'postFixtures', 'src/db/seeds/posts_photos.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/posts_photos.js');
  leaveModule(module);
})();

;