'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = require('./components/search_badge/search');

var _search2 = _interopRequireDefault(_search);

var _badge = require('./components/notifications/badge');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var badges = [{ icon: 'bell', sidebar: _badge2.default, route: '/admin/notifications', channel: '/admin/notifications/unread', sound: '/admin/audio/notification.mp3' }, { icon: 'search', sidebar: _search2.default, route: '/admin/search' }];

exports.default = badges;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYmFkZ2VzIiwiaWNvbiIsInNpZGViYXIiLCJOb3RpZmljYXRpb25zIiwicm91dGUiLCJjaGFubmVsIiwic291bmQiLCJTZWFyY2giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsQ0FDYixFQUFFQyxNQUFNLE1BQVIsRUFBZ0JDLFNBQVNDLGVBQXpCLEVBQXdDQyxPQUFPLHNCQUEvQyxFQUF1RUMsU0FBUyw2QkFBaEYsRUFBK0dDLE9BQU8sK0JBQXRILEVBRGEsRUFFYixFQUFFTCxNQUFNLFFBQVIsRUFBa0JDLFNBQVNLLGdCQUEzQixFQUFtQ0gsT0FBTyxlQUExQyxFQUZhLENBQWY7O2tCQUtlSixNIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2hfYmFkZ2Uvc2VhcmNoJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbnMvYmFkZ2UnXG5cbmNvbnN0IGJhZGdlcyA9IFtcbiAgeyBpY29uOiAnYmVsbCcsIHNpZGViYXI6IE5vdGlmaWNhdGlvbnMsIHJvdXRlOiAnL2FkbWluL25vdGlmaWNhdGlvbnMnLCBjaGFubmVsOiAnL2FkbWluL25vdGlmaWNhdGlvbnMvdW5yZWFkJywgc291bmQ6ICcvYWRtaW4vYXVkaW8vbm90aWZpY2F0aW9uLm1wMycgfSxcbiAgeyBpY29uOiAnc2VhcmNoJywgc2lkZWJhcjogU2VhcmNoLCByb3V0ZTogJy9hZG1pbi9zZWFyY2gnIH1cbl1cblxuZXhwb3J0IGRlZmF1bHQgYmFkZ2VzXG4iXX0=