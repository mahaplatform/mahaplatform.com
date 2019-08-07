import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'
import _ from 'lodash'

class SelectPanel extends React.Component {

  static propTypes = {
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.any,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    results: PropTypes.object,
    sort: PropTypes.object,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemovePanel: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleRemovePanel = this._handleRemovePanel.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    const { label } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-collection-filters-panel">
          <div className="maha-collection-filters-body">
            <Search { ...this._getSearch() } />
          </div>
          <div className="maha-collection-filters-footer">
            <button className="ui red fluid button" onClick={ this._handleReset }>
              Reset { label }
            </button>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { label } = this.props
    return {
      title: label,
      color: 'lightgrey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleRemovePanel }
      ]
    }
  }

  _getSearch() {
    const { endpoint, filter, format, label, name, multiple, options, sort, text, value, results } = this.props
    const defaultValue = results[name]
    const onChange = this._handleChange
    return { defaultValue, endpoint, filter, format, label, multiple, options, sort, text, value, onChange }
  }

  _handleChange(value) {
    const { name } = this.props
    this.props.onChange(name, value)
  }

  _handleRemovePanel() {
    this.props.onRemovePanel()
  }

  _handleReset() {
    const { multiple, name, onChange } = this.props
    const value = multiple ? [] : null
    onChange(name, value)
  }

}

class Select extends React.Component {

  static propTypes = {
    filter: PropTypes.object,
    format: PropTypes.func,
    label: PropTypes.string,
    mutiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    results: PropTypes.object,
    values: PropTypes.object,
    onAddPanel: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { label } = this.props
    const count = this._getCount()
    return (
      <div className="maha-collection-filters-item" onClick={ this._handleClick }>
        <div className="maha-collection-filters-item-title">
          { label }
        </div>
        { count > 0 &&
          <div className="maha-collection-filters-item-description">
            <div className="maha-collection-filters-item-count">{ count }</div>
          </div>
        }
        <div className="maha-collection-filters-item-icon">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

  _getCount() {
    const { name, results } = this.props
    const result = results[name]
    if(_.isNil(result)) return 0
    return _.isArray(result) ? result.length : 1
  }

  _handleClick() {
    this.props.onAddPanel(<SelectPanel { ...this.props } />)
  }

}

export default Select
