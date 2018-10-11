'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _team = require('./team');

var _team2 = _interopRequireDefault(_team);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signinSegment = new _server.Segment({
  authenticated: false,
  path: '/signin',
  routes: [_team2.default, _email2.default, _password2.default]
});

exports.default = signinSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsic2lnbmluU2VnbWVudCIsIlNlZ21lbnQiLCJhdXRoZW50aWNhdGVkIiwicGF0aCIsInJvdXRlcyIsInRlYW0iLCJlbWFpbCIsInBhc3N3b3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixJQUFJQyxlQUFKLENBQVk7QUFDaENDLGlCQUFlLEtBRGlCO0FBRWhDQyxRQUFNLFNBRjBCO0FBR2hDQyxVQUFRLENBQ05DLGNBRE0sRUFFTkMsZUFGTSxFQUdOQyxrQkFITTtBQUh3QixDQUFaLENBQXRCOztrQkFVZVAsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VnbWVudCB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB0ZWFtIGZyb20gJy4vdGVhbSdcbmltcG9ydCBlbWFpbCBmcm9tICcuL2VtYWlsJ1xuaW1wb3J0IHBhc3N3b3JkIGZyb20gJy4vcGFzc3dvcmQnXG5cbmNvbnN0IHNpZ25pblNlZ21lbnQgPSBuZXcgU2VnbWVudCh7XG4gIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICBwYXRoOiAnL3NpZ25pbicsXG4gIHJvdXRlczogW1xuICAgIHRlYW0sXG4gICAgZW1haWwsXG4gICAgcGFzc3dvcmRcbiAgXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2lnbmluU2VnbWVudFxuIl19