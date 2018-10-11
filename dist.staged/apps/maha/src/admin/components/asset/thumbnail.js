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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetThumbnail = function (_React$Component) {
  (0, _inherits3.default)(AssetThumbnail, _React$Component);

  function AssetThumbnail() {
    (0, _classCallCheck3.default)(this, AssetThumbnail);
    return (0, _possibleConstructorReturn3.default)(this, (AssetThumbnail.__proto__ || Object.getPrototypeOf(AssetThumbnail)).apply(this, arguments));
  }

  (0, _createClass3.default)(AssetThumbnail, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          content_type = _props.content_type,
          has_preview = _props.has_preview,
          id = _props.id,
          original_file_name = _props.original_file_name,
          path = _props.path;

      var previewSrc = has_preview ? '/assets/' + id + '/preview.jpg' : path;
      return _react2.default.createElement(
        'div',
        { className: 'maha-asset-thumbnail' },
        content_type.match(/image/) ? _react2.default.createElement(_image2.default, { src: previewSrc, title: original_file_name, transforms: { fit: 'cover', h: 50, w: 50 } }) : _react2.default.createElement(_icon2.default, { content_type: content_type })
      );
    }
  }]);
  return AssetThumbnail;
}(_react2.default.Component);

AssetThumbnail.propTypes = {
  content_type: _propTypes2.default.string,
  file_name: _propTypes2.default.string,
  file_size: _propTypes2.default.number,
  has_preview: _propTypes2.default.bool,
  id: _propTypes2.default.number,
  original_file_name: _propTypes2.default.string,
  path: _propTypes2.default.string,
  preview: _propTypes2.default.bool
};
exports.default = AssetThumbnail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzZXRUaHVtYm5haWwiLCJwcm9wcyIsImNvbnRlbnRfdHlwZSIsImhhc19wcmV2aWV3IiwiaWQiLCJvcmlnaW5hbF9maWxlX25hbWUiLCJwYXRoIiwicHJldmlld1NyYyIsIm1hdGNoIiwiZml0IiwiaCIsInciLCJSZWFjdCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImZpbGVfbmFtZSIsImZpbGVfc2l6ZSIsIm51bWJlciIsImJvb2wiLCJwcmV2aWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxjOzs7Ozs7Ozs7OzZCQWFLO0FBQUEsbUJBQzZELEtBQUtDLEtBRGxFO0FBQUEsVUFDQ0MsWUFERCxVQUNDQSxZQUREO0FBQUEsVUFDZUMsV0FEZixVQUNlQSxXQURmO0FBQUEsVUFDNEJDLEVBRDVCLFVBQzRCQSxFQUQ1QjtBQUFBLFVBQ2dDQyxrQkFEaEMsVUFDZ0NBLGtCQURoQztBQUFBLFVBQ29EQyxJQURwRCxVQUNvREEsSUFEcEQ7O0FBRVAsVUFBTUMsYUFBYUosMkJBQXlCQyxFQUF6QixvQkFBNENFLElBQS9EO0FBQ0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHNCQUFmO0FBQ0lKLHFCQUFhTSxLQUFiLENBQW1CLE9BQW5CLElBQ0EsOEJBQUMsZUFBRCxJQUFPLEtBQU1ELFVBQWIsRUFBMEIsT0FBUUYsa0JBQWxDLEVBQXVELFlBQVksRUFBRUksS0FBSyxPQUFQLEVBQWdCQyxHQUFHLEVBQW5CLEVBQXVCQyxHQUFHLEVBQTFCLEVBQW5FLEdBREEsR0FFQSw4QkFBQyxjQUFELElBQVcsY0FBZVQsWUFBMUI7QUFISixPQURGO0FBUUQ7OztFQXhCMEJVLGdCQUFNQyxTOztBQUE3QmIsYyxDQUVHYyxTLEdBQVk7QUFDakJaLGdCQUFjYSxvQkFBVUMsTUFEUDtBQUVqQkMsYUFBV0Ysb0JBQVVDLE1BRko7QUFHakJFLGFBQVdILG9CQUFVSSxNQUhKO0FBSWpCaEIsZUFBYVksb0JBQVVLLElBSk47QUFLakJoQixNQUFJVyxvQkFBVUksTUFMRztBQU1qQmQsc0JBQW9CVSxvQkFBVUMsTUFOYjtBQU9qQlYsUUFBTVMsb0JBQVVDLE1BUEM7QUFRakJLLFdBQVNOLG9CQUFVSztBQVJGLEM7a0JBMEJOcEIsYyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IEFzc2V0SWNvbiBmcm9tICcuL2ljb24nXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi4vaW1hZ2UnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIEFzc2V0VGh1bWJuYWlsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbnRlbnRfdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWxlX25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmlsZV9zaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhhc19wcmV2aWV3OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvcmlnaW5hbF9maWxlX25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGF0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aWV3OiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29udGVudF90eXBlLCBoYXNfcHJldmlldywgaWQsIG9yaWdpbmFsX2ZpbGVfbmFtZSwgcGF0aCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHByZXZpZXdTcmMgPSBoYXNfcHJldmlldyA/IGAvYXNzZXRzLyR7aWR9L3ByZXZpZXcuanBnYCA6IHBhdGhcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRodW1ibmFpbFwiPlxuICAgICAgICB7IGNvbnRlbnRfdHlwZS5tYXRjaCgvaW1hZ2UvKSA/XG4gICAgICAgICAgPEltYWdlIHNyYz17IHByZXZpZXdTcmMgfSB0aXRsZT17IG9yaWdpbmFsX2ZpbGVfbmFtZSB9IHRyYW5zZm9ybXM9e3sgZml0OiAnY292ZXInLCBoOiA1MCwgdzogNTAgfX0gLz4gOlxuICAgICAgICAgIDxBc3NldEljb24gY29udGVudF90eXBlPXsgY29udGVudF90eXBlIH0gLz5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaHVtYm5haWxcbiJdfQ==