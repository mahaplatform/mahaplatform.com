import PropTypes from 'prop-types'
import React from 'react'
import Search from '../search'

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

  render() {
    const { label } = this.props
    return (
      <div className="maha-filters-panel">
        <div className="maha-filters-header" onClick={ this._handleRemovePanel.bind(this) }>
          <div className="maha-filters-header-icon">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="maha-filters-header-title">
            { label }
          </div>
          <div className="maha-filters-header-icon" />
        </div>
        <div className="maha-filters-body">
          <Search { ...this._getSearch() } />
        </div>
        <div className="maha-filters-footer">
          <button className="ui red fluid button" onClick={ this._handleReset.bind(this) }>
            Reset { label }
          </button>
        </div>
      </div>
    )
  }

  _getSearch() {
    const { endpoint, filter, format, label, name, multiple, options, sort, text, value, results, onChange } = this.props
    const onUpdate = onChange
    return { endpoint, filter, format, label, name, multiple, options, results, sort, text, value, onUpdate }
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

  render() {
    const { label, name, results } = this.props
    const count = results[name] ? results[name].length : 0
    return (
      <div className="maha-filters-item" onClick={ this._handleClick.bind(this) }>
        <div className="maha-filters-item-title">
          { label }
        </div>
        { count > 0 &&
          <div className="maha-filters-item-description">
            <div className="maha-filters-item-count">{ count }</div>
          </div>
        }
        <div className="maha-filters-item-icon">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

  _handleClick() {
    this.props.onAddPanel(<SelectPanel { ...this.props } />)
  }

}

export default Select
