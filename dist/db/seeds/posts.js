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
  tableName: 'maha_posts',
  records: [{
    id: 1,
    team_id: 1,
    user_id: 79,
    text: '<h2>Welcome to Maha</h2><p>After almost a full year of development, the Maha Platform is finally live! Thank you to everyone who has assisted with brainstorming, design, testing, feedback, and moral support. I\'m looking forward to continuing the development of this platform for the benefit of the whole cooperative extension!</p>',
    created_at: '2017-11-03T21:30:00.955Z'
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

  reactHotLoader.register(postFixtures, 'postFixtures', 'src/db/seeds/posts.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/posts.js');
  leaveModule(module);
})();

;