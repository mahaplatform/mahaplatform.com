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

var _viewer = require('./viewer');

var _viewer2 = _interopRequireDefault(_viewer);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preview = function (_React$Component) {
  (0, _inherits3.default)(Preview, _React$Component);

  function Preview() {
    (0, _classCallCheck3.default)(this, Preview);
    return (0, _possibleConstructorReturn3.default)(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).apply(this, arguments));
  }

  (0, _createClass3.default)(Preview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          asset = _props.asset,
          comments = _props.comments;

      return _react2.default.createElement(
        'div',
        { className: 'maha-asset-preview' },
        _react2.default.createElement(
          'div',
          { className: 'maha-asset-preview-main' },
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-preview-body' },
            _react2.default.createElement(_viewer2.default, { asset: asset })
          ),
          comments && document.body.clientWidth > 768 && _react2.default.createElement(
            'div',
            { className: 'maha-asset-preview-sidebar' },
            _react2.default.createElement(_info2.default, { asset: asset })
          )
        )
      );
    }
  }]);
  return Preview;
}(_react2.default.Component);

Preview.propTypes = {
  asset: _propTypes2.default.object,
  comments: _propTypes2.default.bool
};
Preview.defaultProps = {
  comments: false
};
exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUHJldmlldyIsInByb3BzIiwiYXNzZXQiLCJjb21tZW50cyIsImRvY3VtZW50IiwiYm9keSIsImNsaWVudFdpZHRoIiwiUmVhY3QiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJib29sIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxPOzs7Ozs7Ozs7OzZCQVdLO0FBQUEsbUJBQ3FCLEtBQUtDLEtBRDFCO0FBQUEsVUFDQ0MsS0FERCxVQUNDQSxLQUREO0FBQUEsVUFDUUMsUUFEUixVQUNRQSxRQURSOztBQUVQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUseUJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHlCQUFmO0FBQ0UsMENBQUMsZ0JBQUQsSUFBYSxPQUFRRCxLQUFyQjtBQURGLFdBREY7QUFJSUMsc0JBQVlDLFNBQVNDLElBQVQsQ0FBY0MsV0FBZCxHQUE0QixHQUF4QyxJQUNBO0FBQUE7QUFBQSxjQUFLLFdBQVUsNEJBQWY7QUFDRSwwQ0FBQyxjQUFELElBQU0sT0FBUUosS0FBZDtBQURGO0FBTEo7QUFERixPQURGO0FBY0Q7OztFQTNCbUJLLGdCQUFNQyxTOztBQUF0QlIsTyxDQUVHUyxTLEdBQVk7QUFDakJQLFNBQU9RLG9CQUFVQyxNQURBO0FBRWpCUixZQUFVTyxvQkFBVUU7QUFGSCxDO0FBRmZaLE8sQ0FPR2EsWSxHQUFlO0FBQ3BCVixZQUFVO0FBRFUsQztrQkF3QlRILE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBBc3NldFZpZXdlciBmcm9tICcuL3ZpZXdlcidcbmltcG9ydCBJbmZvIGZyb20gJy4vaW5mbydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhc3NldDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjb21tZW50czogUHJvcFR5cGVzLmJvb2xcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29tbWVudHM6IGZhbHNlXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhc3NldCwgY29tbWVudHMgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXByZXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXByZXZpZXctbWFpblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC1wcmV2aWV3LWJvZHlcIj5cbiAgICAgICAgICAgIDxBc3NldFZpZXdlciBhc3NldD17IGFzc2V0IH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IGNvbW1lbnRzICYmIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPiA3NjggJiZcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC1wcmV2aWV3LXNpZGViYXJcIj5cbiAgICAgICAgICAgICAgPEluZm8gYXNzZXQ9eyBhc3NldCB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJldmlld1xuIl19