'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _cceniagra = require('./cceniagra');

var cceniagra = _interopRequireWildcard(_cceniagra);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = [(0, _maha.task)({
  command: 'cceniagra:setup',
  description: 'Importing eatfresh data',
  processor: cceniagra.setup
})];
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'src/tasks/cceniagra/index.js');
  leaveModule(module);
})();

;