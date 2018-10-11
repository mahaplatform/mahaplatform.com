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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetIcon = function (_React$Component) {
  (0, _inherits3.default)(AssetIcon, _React$Component);

  function AssetIcon() {
    (0, _classCallCheck3.default)(this, AssetIcon);
    return (0, _possibleConstructorReturn3.default)(this, (AssetIcon.__proto__ || Object.getPrototypeOf(AssetIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(AssetIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'maha-asset-icon' },
        _react2.default.createElement('i', { className: 'fa fa-fw fa-' + this._getIcon() })
      );
    }
  }, {
    key: '_getIcon',
    value: function _getIcon() {
      var content_type = this.props.content_type;

      if (content_type.match(/image/)) return 'file-image-o';
      if (content_type.match(/drawing/)) return 'file-image-o';
      if (content_type.match(/audio/)) return 'file-audio-o';
      if (content_type.match(/video/)) return 'file-video-o';
      if (content_type.match(/pdf/)) return 'file-pdf-o';
      if (content_type.match(/excel/)) return 'file-excel-o';
      if (content_type.match(/spreadsheet/)) return 'file-excel-o';
      if (content_type.match(/msword/)) return 'file-word-o';
      if (content_type.match(/powerpoint/)) return 'file-powerpoint-o';
      if (content_type.match(/presentation/)) return 'file-powerpoint-o';
      if (content_type.match(/wordprocessing/)) return 'file-word-o';
      if (content_type.match(/document/)) return 'file-word-o';
      if (content_type.match(/map/)) return 'map-o';
      if (content_type.match(/zip/)) return 'file-archive-o';
      if (content_type.match(/xml/)) return 'file-code-o';
      if (content_type.match(/html/)) return 'file-code-o';
      return 'file-text-o';
    }
  }]);
  return AssetIcon;
}(_react2.default.Component);

AssetIcon.propTypes = {
  content_type: _propTypes2.default.string
};
exports.default = AssetIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzZXRJY29uIiwiX2dldEljb24iLCJjb250ZW50X3R5cGUiLCJwcm9wcyIsIm1hdGNoIiwiUmVhY3QiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsUzs7Ozs7Ozs7Ozs2QkFNSztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFLDZDQUFHLDRCQUEwQixLQUFLQyxRQUFMLEVBQTdCO0FBREYsT0FERjtBQUtEOzs7K0JBRVU7QUFBQSxVQUNEQyxZQURDLEdBQ2dCLEtBQUtDLEtBRHJCLENBQ0RELFlBREM7O0FBRVQsVUFBR0EsYUFBYUUsS0FBYixDQUFtQixPQUFuQixDQUFILEVBQWdDLE9BQU8sY0FBUDtBQUNoQyxVQUFHRixhQUFhRSxLQUFiLENBQW1CLFNBQW5CLENBQUgsRUFBa0MsT0FBTyxjQUFQO0FBQ2xDLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsT0FBbkIsQ0FBSCxFQUFnQyxPQUFPLGNBQVA7QUFDaEMsVUFBR0YsYUFBYUUsS0FBYixDQUFtQixPQUFuQixDQUFILEVBQWdDLE9BQU8sY0FBUDtBQUNoQyxVQUFHRixhQUFhRSxLQUFiLENBQW1CLEtBQW5CLENBQUgsRUFBOEIsT0FBTyxZQUFQO0FBQzlCLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsT0FBbkIsQ0FBSCxFQUFnQyxPQUFPLGNBQVA7QUFDaEMsVUFBR0YsYUFBYUUsS0FBYixDQUFtQixhQUFuQixDQUFILEVBQXNDLE9BQU8sY0FBUDtBQUN0QyxVQUFHRixhQUFhRSxLQUFiLENBQW1CLFFBQW5CLENBQUgsRUFBaUMsT0FBTyxhQUFQO0FBQ2pDLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsWUFBbkIsQ0FBSCxFQUFxQyxPQUFPLG1CQUFQO0FBQ3JDLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsY0FBbkIsQ0FBSCxFQUF1QyxPQUFPLG1CQUFQO0FBQ3ZDLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsZ0JBQW5CLENBQUgsRUFBeUMsT0FBTyxhQUFQO0FBQ3pDLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsVUFBbkIsQ0FBSCxFQUFtQyxPQUFPLGFBQVA7QUFDbkMsVUFBR0YsYUFBYUUsS0FBYixDQUFtQixLQUFuQixDQUFILEVBQThCLE9BQU8sT0FBUDtBQUM5QixVQUFHRixhQUFhRSxLQUFiLENBQW1CLEtBQW5CLENBQUgsRUFBOEIsT0FBTyxnQkFBUDtBQUM5QixVQUFHRixhQUFhRSxLQUFiLENBQW1CLEtBQW5CLENBQUgsRUFBOEIsT0FBTyxhQUFQO0FBQzlCLFVBQUdGLGFBQWFFLEtBQWIsQ0FBbUIsTUFBbkIsQ0FBSCxFQUErQixPQUFPLGFBQVA7QUFDL0IsYUFBTyxhQUFQO0FBQ0Q7OztFQWpDcUJDLGdCQUFNQyxTOztBQUF4Qk4sUyxDQUVHTyxTLEdBQVk7QUFDakJMLGdCQUFjTSxvQkFBVUM7QUFEUCxDO2tCQW1DTlQsUyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBBc3NldEljb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGVudF90eXBlOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC1pY29uXCI+XG4gICAgICAgIDxpIGNsYXNzTmFtZT17YGZhIGZhLWZ3IGZhLSR7dGhpcy5fZ2V0SWNvbigpfWB9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBfZ2V0SWNvbigpIHtcbiAgICBjb25zdCB7IGNvbnRlbnRfdHlwZSB9ID0gdGhpcy5wcm9wc1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvaW1hZ2UvKSkgcmV0dXJuICdmaWxlLWltYWdlLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9kcmF3aW5nLykpIHJldHVybiAnZmlsZS1pbWFnZS1vJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvYXVkaW8vKSkgcmV0dXJuICdmaWxlLWF1ZGlvLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC92aWRlby8pKSByZXR1cm4gJ2ZpbGUtdmlkZW8tbydcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3BkZi8pKSByZXR1cm4gJ2ZpbGUtcGRmLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9leGNlbC8pKSByZXR1cm4gJ2ZpbGUtZXhjZWwtbydcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3NwcmVhZHNoZWV0LykpIHJldHVybiAnZmlsZS1leGNlbC1vJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvbXN3b3JkLykpIHJldHVybiAnZmlsZS13b3JkLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9wb3dlcnBvaW50LykpIHJldHVybiAnZmlsZS1wb3dlcnBvaW50LW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9wcmVzZW50YXRpb24vKSkgcmV0dXJuICdmaWxlLXBvd2VycG9pbnQtbydcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3dvcmRwcm9jZXNzaW5nLykpIHJldHVybiAnZmlsZS13b3JkLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9kb2N1bWVudC8pKSByZXR1cm4gJ2ZpbGUtd29yZC1vJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvbWFwLykpIHJldHVybiAnbWFwLW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC96aXAvKSkgcmV0dXJuICdmaWxlLWFyY2hpdmUtbydcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3htbC8pKSByZXR1cm4gJ2ZpbGUtY29kZS1vJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvaHRtbC8pKSByZXR1cm4gJ2ZpbGUtY29kZS1vJ1xuICAgIHJldHVybiAnZmlsZS10ZXh0LW8nXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NldEljb25cbiJdfQ==