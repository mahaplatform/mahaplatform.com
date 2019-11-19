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

  static defaultProps = {
    text: 'text',
    value: 'value'
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
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleRemovePanel }
      ]
    }
  }

  _getOptions() {
    const { options } = this.props
    return options ? options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    }) : null
  }

  _getSearch() {
    const { endpoint, filter, format, label, name, multiple, sort, text, value, results } = this.props
    return { 
      defaultValue: results[name],
      endpoint,
      filter,
      format,
      label,
      multiple,
      options: this._getOptions(),
      sort,
      text,
      value,
      onChange: this._handleChange
    }
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
