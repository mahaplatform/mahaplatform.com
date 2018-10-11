'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _profile = require('../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _profile_serializer = require('../../../serializers/profile_serializer');

var _profile_serializer2 = _interopRequireDefault(_profile_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refresh = {
  destroy: function destroy(req, trx, result, options) {
    return [{ channel: 'user', target: '/admin/account/profiles' }];
  }
};

var profilesResources = new _server.Resources({
  model: _profile2.default,
  path: '/profiles',
  refresh: refresh,
  serializer: _profile_serializer2.default,
  withRelated: ['source']
});

exports.default = profilesResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicmVmcmVzaCIsImRlc3Ryb3kiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwiY2hhbm5lbCIsInRhcmdldCIsInByb2ZpbGVzUmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwibW9kZWwiLCJQcm9maWxlIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJQcm9maWxlU2VyaWFsaXplciIsIndpdGhSZWxhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVO0FBQ2RDLFdBQVMsaUJBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1CQyxPQUFuQjtBQUFBLFdBQStCLENBQ3RDLEVBQUVDLFNBQVMsTUFBWCxFQUFtQkMsUUFBUSx5QkFBM0IsRUFEc0MsQ0FBL0I7QUFBQTtBQURLLENBQWhCOztBQU1BLElBQU1DLG9CQUFvQixJQUFJQyxpQkFBSixDQUFjO0FBQ3RDQyxTQUFPQyxpQkFEK0I7QUFFdENDLFFBQU0sV0FGZ0M7QUFHdENaLGtCQUhzQztBQUl0Q2EsY0FBWUMsNEJBSjBCO0FBS3RDQyxlQUFhLENBQUMsUUFBRDtBQUx5QixDQUFkLENBQTFCOztrQkFRZVAsaUIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uLy4uLy4uL21vZGVscy9wcm9maWxlJ1xuaW1wb3J0IFByb2ZpbGVTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uL3NlcmlhbGl6ZXJzL3Byb2ZpbGVfc2VyaWFsaXplcidcblxuY29uc3QgcmVmcmVzaCA9IHtcbiAgZGVzdHJveTogKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IFtcbiAgICB7IGNoYW5uZWw6ICd1c2VyJywgdGFyZ2V0OiAnL2FkbWluL2FjY291bnQvcHJvZmlsZXMnIH1cbiAgXVxufVxuXG5jb25zdCBwcm9maWxlc1Jlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBtb2RlbDogUHJvZmlsZSxcbiAgcGF0aDogJy9wcm9maWxlcycsXG4gIHJlZnJlc2gsXG4gIHNlcmlhbGl6ZXI6IFByb2ZpbGVTZXJpYWxpemVyLFxuICB3aXRoUmVsYXRlZDogWydzb3VyY2UnXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJvZmlsZXNSZXNvdXJjZXNcbiJdfQ==