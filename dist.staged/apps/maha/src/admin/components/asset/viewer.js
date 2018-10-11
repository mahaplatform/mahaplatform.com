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

var _mahaAdmin = require('maha-admin');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetViewer = function (_React$Component) {
  (0, _inherits3.default)(AssetViewer, _React$Component);

  function AssetViewer() {
    (0, _classCallCheck3.default)(this, AssetViewer);
    return (0, _possibleConstructorReturn3.default)(this, (AssetViewer.__proto__ || Object.getPrototypeOf(AssetViewer)).apply(this, arguments));
  }

  (0, _createClass3.default)(AssetViewer, [{
    key: 'render',
    value: function render() {
      var asset = this.props.asset;

      var viewer = this._getViewer(asset);
      if (asset.status && asset.status !== 'processed') {
        return _react2.default.createElement(
          'div',
          { className: this._getClass() },
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-viewer-body' },
            _react2.default.createElement(_mahaAdmin.Message, this._getProcesssing())
          )
        );
      }
      if (viewer) {
        return _react2.default.createElement(
          'div',
          { className: this._getClass() },
          _react2.default.createElement(
            'div',
            { className: 'maha-asset-viewer-body' },
            _react2.default.createElement('iframe', { allowFullScreen: true, frameBorder: '0', src: viewer })
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: this._getClass() },
        _react2.default.createElement(
          'div',
          { className: 'maha-asset-viewer-body' },
          _react2.default.createElement(_mahaAdmin.Message, this._getMessage())
        )
      );
    }
  }, {
    key: '_getClass',
    value: function _getClass() {
      var type = this._getType();
      var classes = ['maha-asset-viewer'];
      classes.push(type);
      return classes.join(' ');
    }
  }, {
    key: '_getProcesssing',
    value: function _getProcesssing() {
      return {
        icon: 'circle-o-notch fa-spin',
        title: 'Preview unavailable',
        text: 'We\'re currently processing this item. Please check back later.'
      };
    }
  }, {
    key: '_getMessage',
    value: function _getMessage() {
      var asset = this.props.asset;

      return {
        icon: this._getIcon(),
        text: asset.file_name,
        button: {
          label: 'Download File',
          handler: function handler() {}
        }
      };
    }
  }, {
    key: '_getIcon',
    value: function _getIcon(content_type) {
      var type = this._getType();
      if (type === 'image') return 'picture-o';
      if (type === 'audio') return 'volume-up';
      if (type === 'video') return 'video-camera';
      if (type === 'pdf') return 'file-pdf-o';
      if (type === 'excel') return 'file-excel-o';
      if (type === 'word') return 'file-word-o';
      if (type === 'powerpoint') return 'file-powerpoint-o';
      return 'file-text-o';
    }
  }, {
    key: '_getHost',
    value: function _getHost() {
      var hosts = [process.env.DATA_ASSET_CDN_HOST, process.env.DATA_ASSET_HOST];
      return hosts.reduce(function (found, host) {
        if (found) return found;
        return !_lodash2.default.isEmpty(host) ? host : null;
      }, null) || '';
    }
  }, {
    key: '_getViewer',
    value: function _getViewer() {
      var asset = this.props.asset;

      var host = this._getHost();
      var file = encodeURIComponent(host + '/assets/' + asset.id + '/' + asset.file_name);
      var type = this._getType();
      if (type === 'pdf') return '/admin/doc.html?file=' + file;
      if (type === 'word') return '/admin/doc.html?file=' + file;
      if (type === 'powerpoint') return '/admin/doc.html?file=' + file;
      if (type === 'excel') return '/admin/doc.html?file=' + file;
      if (type === 'audio') return '/admin/audio.html?file=' + file;
      if (type === 'video') return '/admin/video.html?file=' + file;
      if (type === 'image') return '/admin/image.html?file=' + file;
      if (type === 'html') return host + asset.path;
      return null;
    }
  }, {
    key: '_getType',
    value: function _getType() {
      var content_type = this.props.asset.content_type;

      if (content_type.match(/image/)) return 'image';
      if (content_type.match(/audio/)) return 'audio';
      if (content_type.match(/video/)) return 'video';
      if (content_type.match(/pdf/)) return 'pdf';
      if (content_type.match(/excel/)) return 'excel';
      if (content_type.match(/spreadsheetml/)) return 'excel';
      if (content_type.match(/msword/)) return 'word';
      if (content_type.match(/wordprocessingml/)) return 'word';
      if (content_type.match(/powerpoint/)) return 'powerpoint';
      if (content_type.match(/presentationml/)) return 'powerpoint';
      if (content_type.match(/html/)) return 'html';
    }
  }]);
  return AssetViewer;
}(_react2.default.Component);

AssetViewer.propTypes = {
  asset: _propTypes2.default.object
};
exports.default = AssetViewer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzZXRWaWV3ZXIiLCJhc3NldCIsInByb3BzIiwidmlld2VyIiwiX2dldFZpZXdlciIsInN0YXR1cyIsIl9nZXRDbGFzcyIsIl9nZXRQcm9jZXNzc2luZyIsIl9nZXRNZXNzYWdlIiwidHlwZSIsIl9nZXRUeXBlIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiaWNvbiIsInRpdGxlIiwidGV4dCIsIl9nZXRJY29uIiwiZmlsZV9uYW1lIiwiYnV0dG9uIiwibGFiZWwiLCJoYW5kbGVyIiwiY29udGVudF90eXBlIiwiaG9zdHMiLCJwcm9jZXNzIiwiZW52IiwiREFUQV9BU1NFVF9DRE5fSE9TVCIsIkRBVEFfQVNTRVRfSE9TVCIsInJlZHVjZSIsImZvdW5kIiwiaG9zdCIsIl8iLCJpc0VtcHR5IiwiX2dldEhvc3QiLCJmaWxlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaWQiLCJwYXRoIiwibWF0Y2giLCJSZWFjdCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFc7Ozs7Ozs7Ozs7NkJBTUs7QUFBQSxVQUNDQyxLQURELEdBQ1csS0FBS0MsS0FEaEIsQ0FDQ0QsS0FERDs7QUFFUCxVQUFNRSxTQUFTLEtBQUtDLFVBQUwsQ0FBZ0JILEtBQWhCLENBQWY7QUFDQSxVQUFHQSxNQUFNSSxNQUFOLElBQWdCSixNQUFNSSxNQUFOLEtBQWlCLFdBQXBDLEVBQWlEO0FBQy9DLGVBQ0U7QUFBQTtBQUFBLFlBQUssV0FBWSxLQUFLQyxTQUFMLEVBQWpCO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSx3QkFBZjtBQUNFLDBDQUFDLGtCQUFELEVBQWMsS0FBS0MsZUFBTCxFQUFkO0FBREY7QUFERixTQURGO0FBT0Q7QUFDRCxVQUFHSixNQUFILEVBQVc7QUFDVCxlQUNFO0FB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dGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnbWFoYS1hZG1pbidcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY2xhc3MgQXNzZXRWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXNzZXQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3Qgdmlld2VyID0gdGhpcy5fZ2V0Vmlld2VyKGFzc2V0KVxuICAgIGlmKGFzc2V0LnN0YXR1cyAmJiBhc3NldC5zdGF0dXMgIT09ICdwcm9jZXNzZWQnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuX2dldENsYXNzKCkgfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzZXQtdmlld2VyLWJvZHlcIj5cbiAgICAgICAgICAgIDxNZXNzYWdlIHsgLi4udGhpcy5fZ2V0UHJvY2Vzc3NpbmcoKSB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICBpZih2aWV3ZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5fZ2V0Q2xhc3MoKSB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NldC12aWV3ZXItYm9keVwiPlxuICAgICAgICAgICAgPGlmcmFtZSBhbGxvd0Z1bGxTY3JlZW4gZnJhbWVCb3JkZXI9XCIwXCIgc3JjPXsgdmlld2VyIH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IHRoaXMuX2dldENsYXNzKCkgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2V0LXZpZXdlci1ib2R5XCI+XG4gICAgICAgICAgPE1lc3NhZ2UgeyAuLi50aGlzLl9nZXRNZXNzYWdlKCkgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIF9nZXRDbGFzcygpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5fZ2V0VHlwZSgpXG4gICAgY29uc3QgY2xhc3NlcyA9IFsnbWFoYS1hc3NldC12aWV3ZXInXVxuICAgIGNsYXNzZXMucHVzaCh0eXBlKVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKVxuICB9XG5cbiAgX2dldFByb2Nlc3NzaW5nKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpY29uOiAnY2lyY2xlLW8tbm90Y2ggZmEtc3BpbicsXG4gICAgICB0aXRsZTogJ1ByZXZpZXcgdW5hdmFpbGFibGUnLFxuICAgICAgdGV4dDogJ1dlXFwncmUgY3VycmVudGx5IHByb2Nlc3NpbmcgdGhpcyBpdGVtLiBQbGVhc2UgY2hlY2sgYmFjayBsYXRlci4nXG4gICAgfVxuICB9XG5cbiAgX2dldE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiB7XG4gICAgICBpY29uOiB0aGlzLl9nZXRJY29uKCksXG4gICAgICB0ZXh0OiBhc3NldC5maWxlX25hbWUsXG4gICAgICBidXR0b246IHtcbiAgICAgICAgbGFiZWw6ICdEb3dubG9hZCBGaWxlJyxcbiAgICAgICAgaGFuZGxlcjogKCkgPT4ge31cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZ2V0SWNvbihjb250ZW50X3R5cGUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5fZ2V0VHlwZSgpXG4gICAgaWYodHlwZSA9PT0gJ2ltYWdlJykgcmV0dXJuICdwaWN0dXJlLW8nXG4gICAgaWYodHlwZSA9PT0gJ2F1ZGlvJykgcmV0dXJuICd2b2x1bWUtdXAnXG4gICAgaWYodHlwZSA9PT0gJ3ZpZGVvJykgcmV0dXJuICd2aWRlby1jYW1lcmEnXG4gICAgaWYodHlwZSA9PT0gJ3BkZicpIHJldHVybiAnZmlsZS1wZGYtbydcbiAgICBpZih0eXBlID09PSAnZXhjZWwnKSByZXR1cm4gJ2ZpbGUtZXhjZWwtbydcbiAgICBpZih0eXBlID09PSAnd29yZCcpIHJldHVybiAnZmlsZS13b3JkLW8nXG4gICAgaWYodHlwZSA9PT0gJ3Bvd2VycG9pbnQnKSByZXR1cm4gJ2ZpbGUtcG93ZXJwb2ludC1vJ1xuICAgIHJldHVybiAnZmlsZS10ZXh0LW8nXG4gIH1cblxuICBfZ2V0SG9zdCgpIHtcbiAgICBjb25zdCBob3N0cyA9IFtcbiAgICAgIHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfQ0ROX0hPU1QsXG4gICAgICBwcm9jZXNzLmVudi5EQVRBX0FTU0VUX0hPU1RcbiAgICBdXG4gICAgcmV0dXJuIGhvc3RzLnJlZHVjZSgoZm91bmQsIGhvc3QpID0+IHtcbiAgICAgIGlmKGZvdW5kKSByZXR1cm4gZm91bmRcbiAgICAgIHJldHVybiAhXy5pc0VtcHR5KGhvc3QpID8gaG9zdCA6IG51bGxcbiAgICB9LCBudWxsKSB8fCAnJ1xuICB9XG5cbiAgX2dldFZpZXdlcigpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2dldEhvc3QoKVxuICAgIGNvbnN0IGZpbGUgPSBlbmNvZGVVUklDb21wb25lbnQoYCR7aG9zdH0vYXNzZXRzLyR7YXNzZXQuaWR9LyR7YXNzZXQuZmlsZV9uYW1lfWApXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuX2dldFR5cGUoKVxuICAgIGlmKHR5cGUgPT09ICdwZGYnKSByZXR1cm4gYC9hZG1pbi9kb2MuaHRtbD9maWxlPSR7ZmlsZX1gXG4gICAgaWYodHlwZSA9PT0gJ3dvcmQnKSByZXR1cm4gYC9hZG1pbi9kb2MuaHRtbD9maWxlPSR7ZmlsZX1gXG4gICAgaWYodHlwZSA9PT0gJ3Bvd2VycG9pbnQnKSByZXR1cm4gYC9hZG1pbi9kb2MuaHRtbD9maWxlPSR7ZmlsZX1gXG4gICAgaWYodHlwZSA9PT0gJ2V4Y2VsJykgcmV0dXJuIGAvYWRtaW4vZG9jLmh0bWw/ZmlsZT0ke2ZpbGV9YFxuICAgIGlmKHR5cGUgPT09ICdhdWRpbycpIHJldHVybiBgL2FkbWluL2F1ZGlvLmh0bWw/ZmlsZT0ke2ZpbGV9YFxuICAgIGlmKHR5cGUgPT09ICd2aWRlbycpIHJldHVybiBgL2FkbWluL3ZpZGVvLmh0bWw/ZmlsZT0ke2ZpbGV9YFxuICAgIGlmKHR5cGUgPT09ICdpbWFnZScpIHJldHVybiBgL2FkbWluL2ltYWdlLmh0bWw/ZmlsZT0ke2ZpbGV9YFxuICAgIGlmKHR5cGUgPT09ICdodG1sJykgcmV0dXJuIGhvc3QgKyBhc3NldC5wYXRoXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIF9nZXRUeXBlKCkge1xuICAgIGNvbnN0IHsgY29udGVudF90eXBlIH0gPSB0aGlzLnByb3BzLmFzc2V0XG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9pbWFnZS8pKSByZXR1cm4gJ2ltYWdlJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvYXVkaW8vKSkgcmV0dXJuICdhdWRpbydcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3ZpZGVvLykpIHJldHVybiAndmlkZW8nXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9wZGYvKSkgcmV0dXJuICdwZGYnXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9leGNlbC8pKSByZXR1cm4gJ2V4Y2VsJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvc3ByZWFkc2hlZXRtbC8pKSByZXR1cm4gJ2V4Y2VsJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvbXN3b3JkLykpIHJldHVybiAnd29yZCdcbiAgICBpZihjb250ZW50X3R5cGUubWF0Y2goL3dvcmRwcm9jZXNzaW5nbWwvKSkgcmV0dXJuICd3b3JkJ1xuICAgIGlmKGNvbnRlbnRfdHlwZS5tYXRjaCgvcG93ZXJwb2ludC8pKSByZXR1cm4gJ3Bvd2VycG9pbnQnXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9wcmVzZW50YXRpb25tbC8pKSByZXR1cm4gJ3Bvd2VycG9pbnQnXG4gICAgaWYoY29udGVudF90eXBlLm1hdGNoKC9odG1sLykpIHJldHVybiAnaHRtbCdcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0Vmlld2VyXG4iXX0=