import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class LookupPanel extends React.Component {

  static propTypes = {
    format: PropTypes.function,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    results: PropTypes.object,
    onChange: PropTypes.func,
    onRemovePanel: PropTypes.func
  }

  _handleRemovePanel = this._handleRemovePanel.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    const { format, label, multiple, name, options, results } = this.props
    const value = results[name]
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-filters-panel">
          <div className="maha-filters-body">
            { options.map((option, index) => (
              <div className="maha-filters-item" key={`filter_item_${index}`} onClick={ this._handleClick.bind(this, option.id) }>
                <div className="maha-filters-item-content">
                  { React.createElement(format, { option }) }
                </div>
                <div className="maha-filters-item-icon">
                  { multiple && _.includes(value, option.id) && <i className="fa fa-check" /> }
                  { !multiple && option.id === value && <i className="fa fa-check" /> }
                </div>
              </div>
            ))}
          </div>
          <div className="maha-filters-footer" onClick={ this._handleReset }>
            Reset { label }
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

  _getValue(id) {
    const { multiple, name, results } = this.props
    if(!multiple) return results[name] !== id ? id : null
    if(_.includes(results[name], id)) return _.without(results[name], id)
    return [ ...results[name], id ]
  }

  _handleClick(id) {
    const { name, onChange } = this.props
    onChange(name, this._getValue(id))
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

class Lookup extends React.Component {

  static propTypes = {
    format: PropTypes.func,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    results: PropTypes.object,
    value: PropTypes.number,
    onAddPanel: PropTypes.func,
    onChange: PropTypes.func,
    onRemovePanel: PropTypes.func
  }

  static defaultProps = {
    mutiple: false
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { label } = this.props
    return (
      <div className="maha-filters-item" onClick={ this._handleClick }>
        <div className="maha-filters-item-title">
          { label }
        </div>
        <div className="maha-filters-item-icon">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

  _handleClick() {
    this.props.onAddPanel(<LookupPanel { ...this._getLookupPanel() } />)
  }

  _getLookupPanel() {
    const { format, label, multiple, name, options, results, onChange, onRemovePanel } = this.props
    return { format, label, multiple, name, options, results, onChange, onRemovePanel }
  }


}

export default Lookup
