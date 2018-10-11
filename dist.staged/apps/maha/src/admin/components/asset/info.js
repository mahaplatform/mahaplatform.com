'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _comments = require('../comments');

var _comments2 = _interopRequireDefault(_comments);

var _mahaAdmin = require('maha-admin');

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function (_React$Component) {
  (0, _inherits3.default)(Info, _React$Component);

  function Info() {
    (0, _classCallCheck3.default)(this, Info);
    return (0, _possibleConstructorReturn3.default)(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
  }

  (0, _createClass3.default)(Info, [{
    key: 'render',
    value: function render() {
      var asset = this.props.asset;

      return _react2.default.createElement(
        'div',
        { className: 'maha-asset-info' },
        _react2.default.createElement(
          'div',
          { className: 'maha-asset-info-header' },
          _react2.default.createElement(_token2.default, asset)
        ),
        _react2.default.createElement(
          'div',
          { className: 'maha-asset-info-body' },
          _react2.default.createElement(_mahaAdmin.List, this._getList()),
          _react2.default.createElement(_comments2.default, { entity: 'maha_assets/' + asset.id })
        )
      );
    }
  }, {
    key: '_getList',
    value: function _getList() {
      var asset = this.props.asset;

      return {
        items: [{ label: 'Uploaded By', content: asset.user ? asset.user.full_name : 'Unknown' }, { label: 'Uploaded On', content: asset.created_at, format: 'date' }, { label: 'Source', content: asset.source || 'Unknown' }]
      };
    }
  }]);
  return Info;
}(_react2.default.Component);

Info.contextTypes = {};
Info.propTypes = {
  asset: _propTypes2.default.object
};
exports.default = Info;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSW5mbyIsImFzc2V0IiwicHJvcHMiLCJfZ2V0TGlzdCIsImlkIiwiaXRlbXMiLCJsYWJlbCIsImNvbnRlbnQiLCJ1c2VyIiwiZnVsbF9uYW1lIiwiY3JlYXRlZF9hdCIsImZvcm1hdCIsInNvdXJjZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxJOzs7Ozs7Ozs7OzZCQVNLO0FBQUEsVUFDQ0MsS0FERCxHQUNXLEtBQUtDLEtBRGhCLENBQ0NELEtBREQ7O0FBRVAsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSx3QkFBZjtBQUNFLHdDQUFDLGVBQUQsRUFBaUJBLEtBQWpCO0FBREYsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsc0JBQWY7QUFDRSx3Q0FBQyxlQUFELEVBQVcsS0FBS0UsUUFBTCxFQUFYLENBREY7QUFFRSx3Q0FBQyxrQkFBRCxJQUFVLHlCQUF3QkYsTUFBTUcsRUFBeEM7QUFGRjtBQUpGLE9BREY7QUFXRDs7OytCQUVVO0FBQUEsVUFDREgsS0FEQyxHQUNTLEtBQUtDLEtBRGQsQ0FDREQsS0FEQzs7QUFFVCxhQUFPO0FBQ0xJLGVBQU8sQ0FDTCxFQUFFQyxPQUFPLGFBQVQsRUFBd0JDLFNBQVNOLE1BQU1PLElBQU4sR0FBYVAsTUFBTU8sSUFBTixDQUFXQyxTQUF4QixHQUFvQyxTQUFyRSxFQURLLEVBRUwsRUFBRUgsT0FBTyxhQUFULEVBQXdCQyxTQUFTTixNQUFNUyxVQUF2QyxFQUFtREMsUUFBUSxNQUEzRCxFQUZLLEVBR0wsRUFBRUwsT0FBTyxRQUFULEVBQW1CQyxTQUFTTixNQUFNVyxNQUFOLElBQWdCLFNBQTVDLEVBSEs7QUFERixPQUFQO0FBT0Q7OztFQWpDZ0JDLGdCQUFNQyxTOztBQUFuQmQsSSxDQUVHZSxZLEdBQWUsRTtBQUZsQmYsSSxDQUtHZ0IsUyxHQUFZO0FBQ2pCZixTQUFPZ0Isb0JBQVVDO0FBREEsQztrQkFnQ05sQixJIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgQ29tbWVudHMgZnJvbSAnLi4vY29tbWVudHMnXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbWFoYS1hZG1pbidcbmltcG9ydCBBc3NldFRva2VuIGZyb20gJy4vdG9rZW4nXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFzc2V0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtaW5mb1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtaW5mby1oZWFkZXJcIj5cbiAgICAgICAgICA8QXNzZXRUb2tlbiB7IC4uLmFzc2V0IH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC1pbmZvLWJvZHlcIj5cbiAgICAgICAgICA8TGlzdCB7IC4uLnRoaXMuX2dldExpc3QoKSB9IC8+XG4gICAgICAgICAgPENvbW1lbnRzIGVudGl0eT17IGBtYWhhX2Fzc2V0cy8ke2Fzc2V0LmlkfWAgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIF9nZXRMaXN0KCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsYWJlbDogJ1VwbG9hZGVkIEJ5JywgY29udGVudDogYXNzZXQudXNlciA/IGFzc2V0LnVzZXIuZnVsbF9uYW1lIDogJ1Vua25vd24nIH0sXG4gICAgICAgIHsgbGFiZWw6ICdVcGxvYWRlZCBPbicsIGNvbnRlbnQ6IGFzc2V0LmNyZWF0ZWRfYXQsIGZvcm1hdDogJ2RhdGUnIH0sXG4gICAgICAgIHsgbGFiZWw6ICdTb3VyY2UnLCBjb250ZW50OiBhc3NldC5zb3VyY2UgfHwgJ1Vua25vd24nIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmZvXG4iXX0=