'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mahaAdmin = require('maha-admin');

var _reactTransitionGroup = require('react-transition-group');

var _unassigned = require('./unassigned');

var _unassigned2 = _interopRequireDefault(_unassigned);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Assignment = function (_React$Component) {
  (0, _inherits3.default)(Assignment, _React$Component);

  function Assignment() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Assignment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Assignment.__proto__ || Object.getPrototypeOf(Assignment)).call.apply(_ref, [this].concat(args))), _this), _this.list = null, _this._handleAdd = _this._handleAdd.bind(_this), _this._handleBeginAdd = _this._handleBeginAdd.bind(_this), _this._handleCancel = _this._handleCancel.bind(_this), _this._handleSave = _this._handleSave.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Assignment, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          assigned = _props.assigned,
          assignedFormat = _props.assignedFormat,
          empty = _props.empty,
          footer = _props.footer,
          label = _props.label,
          text = _props.text,
          unassigned = _props.unassigned;

      return _react2.default.createElement(
        _mahaAdmin.ModalPanel,
        this._getModalPanel(),
        _react2.default.createElement(
          'div',
          { className: this._getClass() },
          _react2.default.createElement(
            'div',
            { className: 'maha-assignment-body' },
            assigned.status === 'loading' && _react2.default.createElement(_mahaAdmin.Loader, null),
            assigned.status === 'success' && _react2.default.createElement(
              'div',
              { className: 'maha-assignment-assigned' },
              _react2.default.createElement(
                'div',
                { className: 'maha-assignment-add', onClick: this._handleBeginAdd },
                'Assign a ',
                label,
                '...'
              ),
              assigned.records.length === 0 && _react2.default.createElement(_mahaAdmin.Message, empty),
              assigned.records.length > 0 && _react2.default.createElement(
                'div',
                { className: 'maha-assignment-list', ref: function ref(node) {
                    return _this2.list = node;
                  } },
                _react2.default.createElement(
                  _reactTransitionGroup.TransitionGroup,
                  null,
                  assigned.records.map(function (assignment, index) {
                    return _react2.default.createElement(
                      _reactTransitionGroup.CSSTransition,
                      { classNames: 'expanded', timeout: 1000, exit: false, key: 'assigned_' + assignment.id },
                      _react2.default.createElement(
                        'div',
                        { className: 'maha-assignment-item' },
                        _react2.default.createElement(
                          'div',
                          { className: 'maha-assignment-item-token' },
                          _react2.default.createElement(_mahaAdmin.Format, (0, _extends3.default)({}, assignment, { format: assignedFormat, text: text, value: assignment }))
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'maha-assignment-item-icon', onClick: _this2._handleRemove.bind(_this2, index) },
                          _react2.default.createElement('i', { className: 'fa fa-fw fa-times' })
                        )
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'maha-assignment-unassigned' },
              _react2.default.createElement(
                'div',
                { className: 'maha-assignment-unassigned-header' },
                _react2.default.createElement(_mahaAdmin.Searchbox, this._getSearchbox())
              ),
              _react2.default.createElement(
                'div',
                { className: 'maha-assignment-unassigned-body' },
                unassigned.status === 'loading' && _react2.default.createElement(_mahaAdmin.Loader, null),
                unassigned.status === 'success' && _react2.default.createElement(_unassigned2.default, this._getUnassigned())
              )
            )
          ),
          footer && _react2.default.createElement(
            'div',
            { className: 'maha-assignment-footer' },
            footer
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          assignedEndpoint = _props2.assignedEndpoint,
          defaultValue = _props2.defaultValue,
          unassignedEndpoint = _props2.unassignedEndpoint,
          onFetchAssigned = _props2.onFetchAssigned,
          onFetchUnassigned = _props2.onFetchUnassigned,
          onSet = _props2.onSet;

      onFetchUnassigned(unassignedEndpoint);
      if (defaultValue) return onSet(defaultValue);
      onFetchAssigned(assignedEndpoint);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var assigned = this.props.assigned;
      var modal = this.context.modal;

      if (assigned.records.length > prevProps.assigned.records.length) {
        if (assigned.status === prevProps.assigned.status) {
          this.list.scrollTop = this.list.scrollHeight;
        }
      }
      if (assigned.status !== prevProps.assigned.status && assigned.status === 'saved') {
        modal.close();
      }
    }
  }, {
    key: '_getModalPanel',
    value: function _getModalPanel() {
      var title = this.props.title;

      return {
        title: title,
        leftItems: [{ label: 'Cancel', handler: this._handleCancel }],
        rightItems: [{ label: 'Save', handler: this._handleSave }]
      };
    }
  }, {
    key: '_getClass',
    value: function _getClass() {
      var adding = this.props.adding;

      var classes = ['maha-assignment'];
      if (adding) classes.push('adding');
      return classes.join(' ');
    }
  }, {
    key: '_getSearchbox',
    value: function _getSearchbox() {
      var label = this.props.label;

      return {
        prompt: 'Find a ' + label,
        onChange: this.props.onQuery
      };
    }
  }, {
    key: '_getUnassigned',
    value: function _getUnassigned() {
      var _props3 = this.props,
          text = _props3.text,
          unassigned = _props3.unassigned,
          unassignedFormat = _props3.unassignedFormat,
          value = _props3.value;

      return {
        text: text,
        unassigned: unassigned,
        value: value,
        format: unassignedFormat,
        onChoose: this._handleAdd
      };
    }
  }, {
    key: '_handleAdd',
    value: function _handleAdd(assignment) {
      this.props.onAdd(assignment);
    }
  }, {
    key: '_handleBeginAdd',
    value: function _handleBeginAdd() {
      this.props.onBeginAdd();
    }
  }, {
    key: '_handleCancel',
    value: function _handleCancel() {
      this.context.modal.close();
    }
  }, {
    key: '_handleRemove',
    value: function _handleRemove(index) {
      this.props.onRemove(index);
    }
  }, {
    key: '_handleSave',
    value: function _handleSave() {
      var _props4 = this.props,
          action = _props4.action,
          ids = _props4.ids,
          onSave = _props4.onSave;

      onSave(action, ids);
    }
  }]);
  return Assignment;
}(_react2.default.Component);

Assignment.contextTypes = {
  modal: _propTypes2.default.object
};
Assignment.propTypes = {
  action: _propTypes2.default.string,
  adding: _propTypes2.default.bool,
  assigned: _propTypes2.default.object,
  assignedEndpoint: _propTypes2.default.string,
  assignedFormat: _propTypes2.default.any,
  defaultValue: _propTypes2.default.array,
  endpoint: _propTypes2.default.string,
  empty: _propTypes2.default.object,
  footer: _propTypes2.default.any,
  ids: _propTypes2.default.array,
  item: _propTypes2.default.object,
  label: _propTypes2.default.string,
  method: _propTypes2.default.string,
  q: _propTypes2.default.string,
  title: _propTypes2.default.string,
  text: _propTypes2.default.string,
  unassigned: _propTypes2.default.object,
  unassignedEndpoint: _propTypes2.default.string,
  unassignedFormat: _propTypes2.default.any,
  value: _propTypes2.default.string,
  afterSave: _propTypes2.default.func,
  onAdd: _propTypes2.default.func,
  onBeginAdd: _propTypes2.default.func,
  onFetchAssigned: _propTypes2.default.func,
  onFetchUnassigned: _propTypes2.default.func,
  onQuery: _propTypes2.default.func,
  onRemove: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func
};
Assignment.defaultProps = {
  assignedFormat: _token2.default,
  method: 'PATCH',
  text: 'title',
  unassignedFormat: _token2.default,
  value: 'id'
};
exports.default = Assignment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzaWdubWVudCIsImxpc3QiLCJfaGFuZGxlQWRkIiwiYmluZCIsIl9oYW5kbGVCZWdpbkFkZCIsIl9oYW5kbGVDYW5jZWwiLCJfaGFuZGxlU2F2ZSIsInByb3BzIiwiYXNzaWduZWQiLCJhc3NpZ25lZEZvcm1hdCIsImVtcHR5IiwiZm9vdGVyIiwibGFiZWwiLCJ0ZXh0IiwidW5hc3NpZ25lZCIsIl9nZXRNb2RhbFBhbmVsIiwiX2dldENsYXNzIiwic3RhdHVzIiwicmVjb3JkcyIsImxlbmd0aCIsIm5vZGUiLCJtYXAiLCJhc3NpZ25tZW50IiwiaW5kZXgiLCJpZCIsIl9oYW5kbGVSZW1vdmUiLCJfZ2V0U2VhcmNoYm94IiwiX2dldFVuYXNzaWduZWQiLCJhc3NpZ25lZEVuZHBvaW50IiwiZGVmYXVsdFZhbHVlIiwidW5hc3NpZ25lZEVuZHBvaW50Iiwib25GZXRjaEFzc2lnbmVkIiwib25GZXRjaFVuYXNzaWduZWQiLCJvblNldCIsInByZXZQcm9wcyIsIm1vZGFsIiwiY29udGV4dCIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImNsb3NlIiwidGl0bGUiLCJsZWZ0SXRlbXMiLCJoYW5kbGVyIiwicmlnaHRJdGVtcyIsImFkZGluZyIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsInByb21wdCIsIm9uQ2hhbmdlIiwib25RdWVyeSIsInVuYXNzaWduZWRGb3JtYXQiLCJ2YWx1ZSIsImZvcm1hdCIsIm9uQ2hvb3NlIiwib25BZGQiLCJvbkJlZ2luQWRkIiwib25SZW1vdmUiLCJhY3Rpb24iLCJpZHMiLCJvblNhdmUiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJhbnkiLCJhcnJheSIsImVuZHBvaW50IiwiaXRlbSIsIm1ldGhvZCIsInEiLCJhZnRlclNhdmUiLCJmdW5jIiwib25VcGRhdGUiLCJkZWZhdWx0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LEdBbkJYO0FBb0JqQmpCLFNBQU9ZLG9CQUFVRyxNQXBCQTtBQXFCakJRLGFBQVdYLG9CQUFVWSxJQXJCSjtBQXNCakJyQixTQUFPUyxvQkFBVVksSUF0QkE7QUF1QmpCcEIsY0FBWVEsb0JBQVVZLElBdkJMO0FBd0JqQjdDLG1CQUFpQmlDLG9CQUFVWSxJQXhCVjtBQXlCakI1QyxxQkFBbUJnQyxvQkFBVVksSUF6Qlo7QUEwQmpCMUIsV0FBU2Msb0JBQVVZLElBMUJGO0FBMkJqQm5CLFlBQVVPLG9CQUFVWSxJQTNCSDtBQTRCakJoQixVQUFRSSxvQkFBVVksSUE1QkQ7QUE2QmpCQyxZQUFVYixvQkFBVVk7QUE3QkgsQztBQU5mNUUsVSxDQXNDRzhFLFksR0FBZTtBQUNwQnJFLGtCQUFnQnNFLGVBREk7QUFFcEJOLFVBQVEsT0FGWTtBQUdwQjVELFFBQU0sT0FIYztBQUlwQnNDLG9CQUFrQjRCLGVBSkU7QUFLcEIzQixTQUFPO0FBTGEsQztrQkF3SlRwRCxVIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtYXQsIExvYWRlciwgTWVzc2FnZSwgTW9kYWxQYW5lbCwgU2VhcmNoYm94IH0gZnJvbSAnbWFoYS1hZG1pbidcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCwgQ1NTVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnXG5pbXBvcnQgVW5hc3NpZ25lZCBmcm9tICcuL3VuYXNzaWduZWQnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi90b2tlbidcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgQXNzaWdubWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBtb2RhbDogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhY3Rpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWRkaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhc3NpZ25lZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBhc3NpZ25lZEVuZHBvaW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFzc2lnbmVkRm9ybWF0OiBQcm9wVHlwZXMuYW55LFxuICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLmFycmF5LFxuICAgIGVuZHBvaW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVtcHR5OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGZvb3RlcjogUHJvcFR5cGVzLmFueSxcbiAgICBpZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpdGVtOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1ldGhvZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBxOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdW5hc3NpZ25lZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB1bmFzc2lnbmVkRW5kcG9pbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdW5hc3NpZ25lZEZvcm1hdDogUHJvcFR5cGVzLmFueSxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhZnRlclNhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQWRkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJlZ2luQWRkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZldGNoQXNzaWduZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRmV0Y2hVbmFzc2lnbmVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblF1ZXJ5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblVwZGF0ZTogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYXNzaWduZWRGb3JtYXQ6IFRva2VuLFxuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICB0ZXh0OiAndGl0bGUnLFxuICAgIHVuYXNzaWduZWRGb3JtYXQ6IFRva2VuLFxuICAgIHZhbHVlOiAnaWQnXG4gIH1cblxuICBsaXN0ID0gbnVsbFxuXG4gIF9oYW5kbGVBZGQgPSB0aGlzLl9oYW5kbGVBZGQuYmluZCh0aGlzKVxuICBfaGFuZGxlQmVnaW5BZGQgPSB0aGlzLl9oYW5kbGVCZWdpbkFkZC5iaW5kKHRoaXMpXG4gIF9oYW5kbGVDYW5jZWwgPSB0aGlzLl9oYW5kbGVDYW5jZWwuYmluZCh0aGlzKVxuICBfaGFuZGxlU2F2ZSA9IHRoaXMuX2hhbmRsZVNhdmUuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFzc2lnbmVkLCBhc3NpZ25lZEZvcm1hdCwgZW1wdHksIGZvb3RlciwgbGFiZWwsIHRleHQgLCB1bmFzc2lnbmVkfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsUGFuZWwgeyAuLi50aGlzLl9nZXRNb2RhbFBhbmVsKCkgfSA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5fZ2V0Q2xhc3MoKSB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NpZ25tZW50LWJvZHlcIj5cbiAgICAgICAgICAgIHsgYXNzaWduZWQuc3RhdHVzID09PSAnbG9hZGluZycgJiYgPExvYWRlciAvPiB9XG4gICAgICAgICAgICB7IGFzc2lnbmVkLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NpZ25tZW50LWFzc2lnbmVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2lnbm1lbnQtYWRkXCIgb25DbGljaz17IHRoaXMuX2hhbmRsZUJlZ2luQWRkIH0+XG4gICAgICAgICAgICAgICAgICBBc3NpZ24gYSB7IGxhYmVsIH0uLi5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IGFzc2lnbmVkLnJlY29yZHMubGVuZ3RoID09PSAwICYmIDxNZXNzYWdlIHsgLi4uZW1wdHkgfSAvPiB9XG4gICAgICAgICAgICAgICAgeyBhc3NpZ25lZC5yZWNvcmRzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NpZ25tZW50LWxpc3RcIiByZWY9eyBub2RlID0+IHRoaXMubGlzdCA9IG5vZGV9PlxuICAgICAgICAgICAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgIHsgYXNzaWduZWQucmVjb3Jkcy5tYXAoKGFzc2lnbm1lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvbiBjbGFzc05hbWVzPVwiZXhwYW5kZWRcIiB0aW1lb3V0PXsgMTAwMCB9IGV4aXQ9eyBmYWxzZSB9IGtleT17YGFzc2lnbmVkXyR7YXNzaWdubWVudC5pZH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2lnbm1lbnQtaXRlbVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXNzaWdubWVudC1pdGVtLXRva2VuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybWF0IHsgLi4uYXNzaWdubWVudCB9IGZvcm1hdD17IGFzc2lnbmVkRm9ybWF0IH0gdGV4dD17IHRleHQgfSB2YWx1ZT17IGFzc2lnbm1lbnQgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NpZ25tZW50LWl0ZW0taWNvblwiIG9uQ2xpY2s9eyB0aGlzLl9oYW5kbGVSZW1vdmUuYmluZCh0aGlzLCBpbmRleCkgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXRpbWVzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0NTU1RyYW5zaXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hc3NpZ25tZW50LXVuYXNzaWduZWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2lnbm1lbnQtdW5hc3NpZ25lZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8U2VhcmNoYm94IHsgLi4udGhpcy5fZ2V0U2VhcmNoYm94KCkgfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2lnbm1lbnQtdW5hc3NpZ25lZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgeyB1bmFzc2lnbmVkLnN0YXR1cyA9PT0gJ2xvYWRpbmcnICYmIDxMb2FkZXIgLz4gfVxuICAgICAgICAgICAgICAgIHsgdW5hc3NpZ25lZC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJlxuICAgICAgICAgICAgICAgICAgPFVuYXNzaWduZWQgeyAuLi50aGlzLl9nZXRVbmFzc2lnbmVkKCkgfSAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IGZvb3RlciAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFzc2lnbm1lbnQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIHsgZm9vdGVyIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L01vZGFsUGFuZWw+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBhc3NpZ25lZEVuZHBvaW50LCBkZWZhdWx0VmFsdWUsIHVuYXNzaWduZWRFbmRwb2ludCwgb25GZXRjaEFzc2lnbmVkLCBvbkZldGNoVW5hc3NpZ25lZCwgb25TZXQgfSA9IHRoaXMucHJvcHNcbiAgICBvbkZldGNoVW5hc3NpZ25lZCh1bmFzc2lnbmVkRW5kcG9pbnQpXG4gICAgaWYoZGVmYXVsdFZhbHVlKSByZXR1cm4gb25TZXQoZGVmYXVsdFZhbHVlKVxuICAgIG9uRmV0Y2hBc3NpZ25lZChhc3NpZ25lZEVuZHBvaW50KVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGNvbnN0IHsgYXNzaWduZWQgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IG1vZGFsIH0gPSB0aGlzLmNvbnRleHRcbiAgICBpZihhc3NpZ25lZC5yZWNvcmRzLmxlbmd0aCA+IHByZXZQcm9wcy5hc3NpZ25lZC5yZWNvcmRzLmxlbmd0aCkge1xuICAgICAgaWYoYXNzaWduZWQuc3RhdHVzID09PSBwcmV2UHJvcHMuYXNzaWduZWQuc3RhdHVzKSB7XG4gICAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPSB0aGlzLmxpc3Quc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGFzc2lnbmVkLnN0YXR1cyAhPT0gcHJldlByb3BzLmFzc2lnbmVkLnN0YXR1cyAmJiBhc3NpZ25lZC5zdGF0dXMgPT09ICdzYXZlZCcpIHtcbiAgICAgIG1vZGFsLmNsb3NlKClcbiAgICB9XG4gIH1cblxuICBfZ2V0TW9kYWxQYW5lbCgpIHtcbiAgICBjb25zdCB7IHRpdGxlIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlLFxuICAgICAgbGVmdEl0ZW1zOiBbXG4gICAgICAgIHsgbGFiZWw6ICdDYW5jZWwnLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVDYW5jZWwgfVxuICAgICAgXSxcbiAgICAgIHJpZ2h0SXRlbXM6IFtcbiAgICAgICAgeyBsYWJlbDogJ1NhdmUnLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVTYXZlIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBfZ2V0Q2xhc3MoKSB7XG4gICAgY29uc3QgeyBhZGRpbmcgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjbGFzc2VzID0gWydtYWhhLWFzc2lnbm1lbnQnXVxuICAgIGlmKGFkZGluZykgY2xhc3Nlcy5wdXNoKCdhZGRpbmcnKVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKVxuICB9XG5cbiAgX2dldFNlYXJjaGJveCgpIHtcbiAgICBjb25zdCB7IGxhYmVsIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb21wdDogYEZpbmQgYSAke2xhYmVsfWAsXG4gICAgICBvbkNoYW5nZTogdGhpcy5wcm9wcy5vblF1ZXJ5XG4gICAgfVxuICB9XG5cbiAgX2dldFVuYXNzaWduZWQoKSB7XG4gICAgY29uc3QgeyB0ZXh0LCB1bmFzc2lnbmVkLCB1bmFzc2lnbmVkRm9ybWF0LCB2YWx1ZSB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0LFxuICAgICAgdW5hc3NpZ25lZCxcbiAgICAgIHZhbHVlLFxuICAgICAgZm9ybWF0OiB1bmFzc2lnbmVkRm9ybWF0LFxuICAgICAgb25DaG9vc2U6IHRoaXMuX2hhbmRsZUFkZFxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVBZGQoYXNzaWdubWVudCkge1xuICAgIHRoaXMucHJvcHMub25BZGQoYXNzaWdubWVudClcbiAgfVxuXG4gIF9oYW5kbGVCZWdpbkFkZCgpIHtcbiAgICB0aGlzLnByb3BzLm9uQmVnaW5BZGQoKVxuICB9XG5cbiAgX2hhbmRsZUNhbmNlbCgpIHtcbiAgICB0aGlzLmNvbnRleHQubW9kYWwuY2xvc2UoKVxuICB9XG5cbiAgX2hhbmRsZVJlbW92ZShpbmRleCkge1xuICAgIHRoaXMucHJvcHMub25SZW1vdmUoaW5kZXgpXG4gIH1cblxuICBfaGFuZGxlU2F2ZSgpIHtcbiAgICBjb25zdCB7IGFjdGlvbiwgaWRzLCBvblNhdmUgfSA9IHRoaXMucHJvcHNcbiAgICBvblNhdmUoYWN0aW9uLCBpZHMpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NpZ25tZW50XG4iXX0=