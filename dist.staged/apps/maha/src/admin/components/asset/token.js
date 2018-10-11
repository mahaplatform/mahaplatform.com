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

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetToken = function (_React$Component) {
  (0, _inherits3.default)(AssetToken, _React$Component);

  function AssetToken() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AssetToken);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AssetToken.__proto__ || Object.getPrototypeOf(AssetToken)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = _this._handleClick.bind(_this), _this._handleDownload = _this._handleDownload.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AssetToken, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          content_type = _props.content_type,
          original_file_name = _props.original_file_name,
          file_size = _props.file_size,
          has_preview = _props.has_preview,
          id = _props.id,
          path = _props.path,
          preview = _props.preview,
          source = _props.source,
          source_url = _props.source_url;

      var previewSrc = has_preview ? '/assets/' + id + '/preview.jpg' : path;
      return _react2.default.createElement(
        'div',
        { className: this._getClass(), onClick: this._handleClick },
        _react2.default.createElement(
          'div',
          { className: 'maha-asset-token-details' },
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-token-icon' },
            _react2.default.createElement(_icon2.default, { content_type: content_type }),
            _react2.default.createElement(
              'div',
              { className: 'maha-asset-token-badge' },
              _react2.default.createElement('img', { src: '/admin/images/' + source + '.png' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-token-text' },
            _react2.default.createElement(
              'div',
              { className: 'maha-asset-token-filename' },
              original_file_name
            ),
            _react2.default.createElement(
              'div',
              { className: 'maha-asset-token-filesize' },
              (0, _bytes2.default)(file_size)
            ),
            _react2.default.createElement(
              'div',
              { className: 'maha-asset-token-links' },
              _react2.default.createElement(
                'div',
                { className: 'maha-asset-token-link', onClick: this._handleDownload },
                'Download'
              ),
              source_url && _react2.default.createElement(
                'span',
                null,
                '|'
              ),
              source_url && _react2.default.createElement(
                'div',
                { className: 'maha-asset-token-link', onClick: this._handleEdit.bind(this, source_url) },
                source === 'google' && 'Open in Google Drive',
                source === 'microsoft' && 'Open in Microsoft OneDrive',
                _react2.default.createElement('a', { href: source_url, rel: 'noopener noreferrer', target: '_blank', ref: function ref(node) {
                    return _this2.link = node;
                  } })
              )
            )
          )
        ),
        preview && _react2.default.createElement(
          'div',
          { className: 'maha-asset-token-preview' },
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-token-preview-frame' },
            _react2.default.createElement(_image2.default, { src: previewSrc, title: original_file_name, transforms: { h: 300 } })
          )
        )
      );
    }
  }, {
    key: '_getClass',
    value: function _getClass() {
      var _props2 = this.props,
          file_name = _props2.file_name,
          onClick = _props2.onClick;

      var classes = ['maha-asset-token'];
      classes.push(file_name.split('.').pop().substr(0, 3));
      if (onClick) classes.push('link');
      return classes.join(' ');
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      var onClick = this.props.onClick;

      if (onClick) return onClick();
    }
  }, {
    key: '_handleDownload',
    value: function _handleDownload() {
      var token = this.context.admin.team.token;
      var _props3 = this.props,
          download = _props3.download,
          id = _props3.id;

      if (!download) return;
      window.location.href = '/api/admin/assets/' + id + '/download?token=' + token;
    }
  }, {
    key: '_handleEdit',
    value: function _handleEdit(url, e) {
      this.link.href = url;
      this.link.click();
      e.stopPropagation();
    }
  }]);
  return AssetToken;
}(_react2.default.Component);

AssetToken.contextTypes = {
  admin: _propTypes2.default.object
};
AssetToken.propTypes = {
  content_type: _propTypes2.default.string,
  download: _propTypes2.default.bool,
  file_name: _propTypes2.default.string,
  file_size: _propTypes2.default.number,
  has_preview: _propTypes2.default.bool,
  id: _propTypes2.default.number,
  original_file_name: _propTypes2.default.string,
  path: _propTypes2.default.string,
  preview: _propTypes2.default.bool,
  source: _propTypes2.default.string,
  source_url: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
AssetToken.defaultProps = {
  download: true,
  preview: false
};
exports.default = AssetToken;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzZXRUb2tlbiIsIl9oYW5kbGVDbGljayIsImJpbmQiLCJfaGFuZGxlRG93bmxvYWQiLCJwcm9wcyIsImNvbnRlbnRfdHlwZSIsIm9yaWdpbmFsX2ZpbGVfbmFtZSIsImZpbGVfc2l6ZSIsImhhc19wcmV2aWV3IiwiaWQiLCJwYXRoIiwicHJldmlldyIsInNvdXJjZSIsInNvdXJjZV91cmwiLCJwcmV2aWV3U3JjIiwiX2dldENsYXNzIiwiX2hhbmRsZUVkaXQiLCJsaW5rIiwibm9kZSIsImgiLCJmaWxlX25hbWUiLCJvbkNsaWNrIiwiY2xhc3NlcyIsInB1c2giLCJzcGxpdCIsInBvcCIsInN1YnN0ciIsImpvaW4iLCJ0b2tlbiIsImNvbnRleHQiLCJhZG1pbiIsInRlYW0iLCJkb3dubG9hZCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsImUiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwicHJvcFR5cGVzIiwic3RyaW5nIiwiYm9vbCIsIm51bWJlciIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsVTs7Ozs7Ozs7Ozs7Ozs7NE1BMEJKQyxZLEdBQWUsTUFBS0EsWUFBTCxDQUFrQkMsSUFBbEIsTyxRQUNmQyxlLEdBQWtCLE1BQUtBLGVBQUwsQ0FBcUJELElBQXJCLE87Ozs7OzZCQUVUO0FBQUE7O0FBQUEsbUJBQ3FHLEtBQUtFLEtBRDFHO0FBQUEsVUFDQ0MsWUFERCxVQUNDQSxZQUREO0FBQUEsVUFDZUMsa0JBRGYsVUFDZUEsa0JBRGY7QUFBQSxVQUNtQ0MsU0FEbkMsVUFDbUNBLFNBRG5DO0FBQUEsVUFDOENDLFdBRDlDLFVBQzhDQSxXQUQ5QztBQUFBLFVBQzJEQyxFQUQzRCxVQUMyREEsRUFEM0Q7QUFBQSxVQUMrREMsSUFEL0QsVUFDK0RBLElBRC9EO0FBQUEsVUFDcUVDLE9BRHJFLFVBQ3FFQSxPQURyRTtBQUFBLFVBQzhFQyxNQUQ5RSxVQUM4RUEsTUFEOUU7QUFBQSxVQUNzRkMsVUFEdEYsVUFDc0ZBLFVBRHRGOztBQUVQLFVBQU1DLGFBQWFOLDJCQUF5QkMsRUFBekIsb0JBQTRDQyxJQUEvRDtBQUNBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBWSxLQUFLSyxTQUFMLEVBQWpCLEVBQW9DLFNBQVUsS0FBS2QsWUFBbkQ7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSx1QkFBZjtBQUNFLDBDQUFDLGNBQUQsSUFBVyxjQUFlSSxZQUExQixHQURGO0FBRUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsd0JBQWY7QUFDRSxxREFBSyx3QkFBdUJPLE1BQXZCLFNBQUw7QUFERjtBQUZGLFdBREY7QUFPRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHVCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsMkJBQWY7QUFDSU47QUFESixhQURGO0FBSUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsMkJBQWY7QUFDSSxtQ0FBTUMsU0FBTjtBQURKLGFBSkY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSx3QkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLHVCQUFmLEVBQXVDLFNBQVUsS0FBS0osZUFBdEQ7QUFBQTtBQUFBLGVBREY7QUFJSVUsNEJBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUpsQjtBQUtJQSw0QkFDQTtBQUFBO0FBQUEsa0JBQUssV0FBVSx1QkFBZixFQUF1QyxTQUFVLEtBQUtHLFdBQUwsQ0FBaUJkLElBQWpCLENBQXNCLElBQXRCLEVBQTRCVyxVQUE1QixDQUFqRDtBQUNJRCwyQkFBVyxRQUFYLElBQXVCLHNCQUQzQjtBQUVJQSwyQkFBVyxXQUFYLElBQTBCLDRCQUY5QjtBQUdFLHFEQUFHLE1BQU9DLFVBQVYsRUFBdUIsS0FBSSxxQkFBM0IsRUFBaUQsUUFBTyxRQUF4RCxFQUFpRSxLQUFNO0FBQUEsMkJBQVEsT0FBS0ksSUFBTCxHQUFZQyxJQUFwQjtBQUFBLG1CQUF2RTtBQUhGO0FBTko7QUFQRjtBQVBGLFNBREY7QUE4QklQLG1CQUNBO0FBQUE7QUFBQSxZQUFLLFdBQVUsMEJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGdDQUFmO0FBQ0UsMENBQUMsZUFBRCxJQUFPLEtBQU1HLFVBQWIsRUFBMEIsT0FBUVIsa0JBQWxDLEVBQXVELFlBQVksRUFBRWEsR0FBRyxHQUFMLEVBQW5FO0FBREY7QUFERjtBQS9CSixPQURGO0FBd0NEOzs7Z0NBRVc7QUFBQSxvQkFDcUIsS0FBS2YsS0FEMUI7QUFBQSxVQUNGZ0IsU0FERSxXQUNGQSxTQURFO0FBQUEsVUFDU0MsT0FEVCxXQUNTQSxPQURUOztBQUVWLFVBQU1DLFVBQVUsQ0FBQyxrQkFBRCxDQUFoQjtBQUNBQSxjQUFRQyxJQUFSLENBQWFILFVBQVVJLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEdBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFiO0FBQ0EsVUFBR0wsT0FBSCxFQUFZQyxRQUFRQyxJQUFSLENBQWEsTUFBYjtBQUNaLGFBQU9ELFFBQVFLLElBQVIsQ0FBYSxHQUFiLENBQVA7QUFDRDs7O21DQUVjO0FBQUEsVUFDTE4sT0FESyxHQUNPLEtBQUtqQixLQURaLENBQ0xpQixPQURLOztBQUViLFVBQUdBLE9BQUgsRUFBWSxPQUFPQSxTQUFQO0FBQ2I7OztzQ0FFaUI7QUFBQSxVQUNSTyxLQURRLEdBQ0UsS0FBS0MsT0FBTCxDQUFhQyxLQUFiLENBQW1CQyxJQURyQixDQUNSSCxLQURRO0FBQUEsb0JBRVMsS0FBS3hCLEtBRmQ7QUFBQSxVQUVSNEIsUUFGUSxXQUVSQSxRQUZRO0FBQUEsVUFFRXZCLEVBRkYsV0FFRUEsRUFGRjs7QUFHaEIsVUFBRyxDQUFDdUIsUUFBSixFQUFjO0FBQ2RDLGFBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLDBCQUE0QzFCLEVBQTVDLHdCQUFpRW1CLEtBQWpFO0FBQ0Q7OztnQ0FFV1EsRyxFQUFLQyxDLEVBQUc7QUFDbEIsV0FBS3BCLElBQUwsQ0FBVWtCLElBQVYsR0FBaUJDLEdBQWpCO0FBQ0EsV0FBS25CLElBQUwsQ0FBVXFCLEtBQVY7QUFDQUQsUUFBRUUsZUFBRjtBQUNEOzs7RUFsR3NCQyxnQkFBTUMsUzs7QUFBekJ6QyxVLENBRUcwQyxZLEdBQWU7QUFDcEJaLFNBQU9hLG9CQUFVQztBQURHLEM7QUFGbEI1QyxVLENBTUc2QyxTLEdBQVk7QUFDakJ4QyxnQkFBY3NDLG9CQUFVRyxNQURQO0FBRWpCZCxZQUFVVyxvQkFBVUksSUFGSDtBQUdqQjNCLGFBQVd1QixvQkFBVUcsTUFISjtBQUlqQnZDLGFBQVdvQyxvQkFBVUssTUFKSjtBQUtqQnhDLGVBQWFtQyxvQkFBVUksSUFMTjtBQU1qQnRDLE1BQUlrQyxvQkFBVUssTUFORztBQU9qQjFDLHNCQUFvQnFDLG9CQUFVRyxNQVBiO0FBUWpCcEMsUUFBTWlDLG9CQUFVRyxNQVJDO0FBU2pCbkMsV0FBU2dDLG9CQUFVSSxJQVRGO0FBVWpCbkMsVUFBUStCLG9CQUFVRyxNQVZEO0FBV2pCakMsY0FBWThCLG9CQUFVRyxNQVhMO0FBWWpCekIsV0FBU3NCLG9CQUFVTTtBQVpGLEM7QUFOZmpELFUsQ0FxQkdrRCxZLEdBQWU7QUFDcEJsQixZQUFVLElBRFU7QUFFcEJyQixXQUFTO0FBRlcsQztrQkFpRlRYLFUiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBBc3NldEljb24gZnJvbSAnLi9pY29uJ1xuaW1wb3J0IEltYWdlIGZyb20gJy4uL2ltYWdlJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGJ5dGVzIGZyb20gJ2J5dGVzJ1xuXG5jbGFzcyBBc3NldFRva2VuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGFkbWluOiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbnRlbnRfdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkb3dubG9hZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZmlsZV9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpbGVfc2l6ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBoYXNfcHJldmlldzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb3JpZ2luYWxfZmlsZV9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlldzogUHJvcFR5cGVzLmJvb2wsXG4gICAgc291cmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNvdXJjZV91cmw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZG93bmxvYWQ6IHRydWUsXG4gICAgcHJldmlldzogZmFsc2VcbiAgfVxuXG4gIF9oYW5kbGVDbGljayA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcylcbiAgX2hhbmRsZURvd25sb2FkID0gdGhpcy5faGFuZGxlRG93bmxvYWQuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvbnRlbnRfdHlwZSwgb3JpZ2luYWxfZmlsZV9uYW1lLCBmaWxlX3NpemUsIGhhc19wcmV2aWV3LCBpZCwgcGF0aCwgcHJldmlldywgc291cmNlLCBzb3VyY2VfdXJsIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgcHJldmlld1NyYyA9IGhhc19wcmV2aWV3ID8gYC9hc3NldHMvJHtpZH0vcHJldmlldy5qcGdgIDogcGF0aFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuX2dldENsYXNzKCkgfSBvbkNsaWNrPXsgdGhpcy5faGFuZGxlQ2xpY2sgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRva2VuLWRldGFpbHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtdG9rZW4taWNvblwiPlxuICAgICAgICAgICAgPEFzc2V0SWNvbiBjb250ZW50X3R5cGU9eyBjb250ZW50X3R5cGUgfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRva2VuLWJhZGdlXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPXsgYC9hZG1pbi9pbWFnZXMvJHtzb3VyY2V9LnBuZ2AgfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRva2VuLXRleHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC10b2tlbi1maWxlbmFtZVwiPlxuICAgICAgICAgICAgICB7IG9yaWdpbmFsX2ZpbGVfbmFtZSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC10b2tlbi1maWxlc2l6ZVwiPlxuICAgICAgICAgICAgICB7IGJ5dGVzKGZpbGVfc2l6ZSkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtdG9rZW4tbGlua3NcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRva2VuLWxpbmtcIiBvbkNsaWNrPXsgdGhpcy5faGFuZGxlRG93bmxvYWQgfT5cbiAgICAgICAgICAgICAgICBEb3dubG9hZFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgeyBzb3VyY2VfdXJsICYmIDxzcGFuPnw8L3NwYW4+IH1cbiAgICAgICAgICAgICAgeyBzb3VyY2VfdXJsICYmXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXRva2VuLWxpbmtcIiBvbkNsaWNrPXsgdGhpcy5faGFuZGxlRWRpdC5iaW5kKHRoaXMsIHNvdXJjZV91cmwpIH0+XG4gICAgICAgICAgICAgICAgICB7IHNvdXJjZSA9PT0gJ2dvb2dsZScgJiYgJ09wZW4gaW4gR29vZ2xlIERyaXZlJyB9XG4gICAgICAgICAgICAgICAgICB7IHNvdXJjZSA9PT0gJ21pY3Jvc29mdCcgJiYgJ09wZW4gaW4gTWljcm9zb2Z0IE9uZURyaXZlJyB9XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPXsgc291cmNlX3VybCB9IHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWY9eyBub2RlID0+IHRoaXMubGluayA9IG5vZGUgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgcHJldmlldyAmJlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC10b2tlbi1wcmV2aWV3XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtdG9rZW4tcHJldmlldy1mcmFtZVwiPlxuICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPXsgcHJldmlld1NyYyB9IHRpdGxlPXsgb3JpZ2luYWxfZmlsZV9uYW1lIH0gdHJhbnNmb3Jtcz17eyBoOiAzMDAgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBfZ2V0Q2xhc3MoKSB7XG4gICAgY29uc3QgeyBmaWxlX25hbWUsIG9uQ2xpY2sgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjbGFzc2VzID0gWydtYWhhLWFzc2V0LXRva2VuJ11cbiAgICBjbGFzc2VzLnB1c2goZmlsZV9uYW1lLnNwbGl0KCcuJykucG9wKCkuc3Vic3RyKDAsIDMpKVxuICAgIGlmKG9uQ2xpY2spIGNsYXNzZXMucHVzaCgnbGluaycpXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpXG4gIH1cblxuICBfaGFuZGxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSB0aGlzLnByb3BzXG4gICAgaWYob25DbGljaykgcmV0dXJuIG9uQ2xpY2soKVxuICB9XG5cbiAgX2hhbmRsZURvd25sb2FkKCkge1xuICAgIGNvbnN0IHsgdG9rZW4gfSA9IHRoaXMuY29udGV4dC5hZG1pbi50ZWFtXG4gICAgY29uc3QgeyBkb3dubG9hZCwgaWQgfSA9IHRoaXMucHJvcHNcbiAgICBpZighZG93bmxvYWQpIHJldHVyblxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9hcGkvYWRtaW4vYXNzZXRzLyR7aWR9L2Rvd25sb2FkP3Rva2VuPSR7dG9rZW59YFxuICB9XG5cbiAgX2hhbmRsZUVkaXQodXJsLCBlKSB7XG4gICAgdGhpcy5saW5rLmhyZWYgPSB1cmxcbiAgICB0aGlzLmxpbmsuY2xpY2soKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VG9rZW5cbiJdfQ==